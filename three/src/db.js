import sqlite from 'node:sqlite'
import { DatabaseSync } from 'node:sqlite'

const DB = new DatabaseSync(':memory:')

DB.exec(`
    CREATE TABLE user(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_name TEXT UNIQUE,
        password TEXT
    )
  `);

DB.exec(`
    CREATE TABLE todo(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        task TEXT,
        completed BOOLEAN DEFAULT 0,
        FOREIGN KEY (user_id) REFERENCES user(id) 
        )
    `);

export default DB

