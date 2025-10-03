#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use rusqlite::{params, OpenFlags};
use serde::{Deserialize, Serialize};
use std::sync::Arc;
use tauri::State;
use r2d2::Pool;
use r2d2_sqlite::SqliteConnectionManager;

#[derive(Serialize, Deserialize, Debug)]
struct Message {
    id: i64,
    session_id: i64,
    sender: String,
    content: String,
    created_at: String,
}

struct DbPool(Arc<Pool<SqliteConnectionManager>>);

// Start a new chat session
#[tauri::command]
fn start_chat(state: State<DbPool>) -> Result<i64, String> {
    let conn = state.0.get().map_err(|e| e.to_string())?;
    conn.execute("INSERT INTO sessions DEFAULT VALUES", [])
        .map_err(|e| e.to_string())?;
    Ok(conn.last_insert_rowid())
}

// Send a message (user + bot response)
#[tauri::command]
fn send_message(session_id: i64, content: String, state: State<DbPool>) -> Result<(), String> {
    let conn = state.0.get().map_err(|e| e.to_string())?;

    // Insert user message
    conn.execute(
        "INSERT INTO messages (session_id, sender, content) VALUES (?1, ?2, ?3)",
        params![session_id, "User", content],
    )
    .map_err(|e| e.to_string())?;

    // Generate bot response
    let bot_response = format!("You said: {}", content);
    conn.execute(
        "INSERT INTO messages (session_id, sender, content) VALUES (?1, ?2, ?3)",
        params![session_id, "Bot", bot_response],
    )
    .map_err(|e| e.to_string())?;

    Ok(())
}

// Fetch all messages
#[tauri::command]
fn get_messages(session_id: i64, state: State<DbPool>) -> Result<Vec<Message>, String> {
    let conn = state.0.get().map_err(|e| e.to_string())?;
    let mut stmt = conn.prepare(
        "SELECT id, session_id, sender, content, created_at 
         FROM messages 
         WHERE session_id = ?1 
         ORDER BY id",
    ).map_err(|e| e.to_string())?;

    let messages_iter = stmt.query_map(params![session_id], |row| {
        Ok(Message {
            id: row.get(0)?,
            session_id: row.get(1)?,
            sender: row.get(2)?,
            content: row.get(3)?,
            created_at: row.get(4)?,
        })
    }).map_err(|e| e.to_string())?;

    Ok(messages_iter.filter_map(Result::ok).collect())
}

fn main() {
    // Use a simple relative path for the database
    let db_path = "chat_storage.db";

    let manager = SqliteConnectionManager::file(db_path)
        .with_flags(
            OpenFlags::SQLITE_OPEN_READ_WRITE
                | OpenFlags::SQLITE_OPEN_CREATE
                | OpenFlags::SQLITE_OPEN_FULL_MUTEX,
        );

    let pool = Pool::new(manager).expect("Failed to create connection pool");

    // Initialize DB schema
    {
        let conn = pool.get().expect("Failed to get connection");
        if let Err(e) = conn.execute_batch(
            "
            CREATE TABLE IF NOT EXISTS sessions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );
            CREATE TABLE IF NOT EXISTS messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                session_id INTEGER,
                sender TEXT,
                content TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY(session_id) REFERENCES sessions(id)
            );
            ",
        ) {
            eprintln!("DB initialization failed: {:?}", e);
        }
    }

    // Start Tauri
    tauri::Builder::default()
        .manage(DbPool(Arc::new(pool)))
        .invoke_handler(tauri::generate_handler![
            start_chat,
            send_message,
            get_messages
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri app");
}
