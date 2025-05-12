import sqlite from 'node:sqlite'
import { DatabaseSync } from 'node:sqlite'

const DB = new DatabaseSync(':memory:')

DB.exec(`
    CREATE TABLE user(
        id INTEGER PRIMARY KEY AUTOINCREAMENT,
        use_name TEXT UNIQUE,
        password TEXT
    )
  `);

DB.exec(`
    CREATE TABLE todo(
        id INTEGER PRIMARY KEY AUTOINCREAMENT,
        use_id INTEGER,
        task TEXT,
        completed BOOLEAN DEFAULT 0,
        FOREIGN KEY (user_id) REFERENCES users(id) 
        )
    `);

export default DB

