// src-tauri/src/main.rs

#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{command, generate_handler, Builder};

#[command]
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

fn main() {
    Builder::default()
        .invoke_handler(generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
