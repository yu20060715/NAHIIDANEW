const Database = require('better-sqlite3');

let db;

module.exports = {
  init: () => {
    db = new Database('data/nahida.db');
    db.pragma('journal_mode = WAL');
    
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT,
        lang TEXT DEFAULT 'zh',
        style TEXT DEFAULT 'default'
      );
      CREATE TABLE IF NOT EXISTS reminders (
        id INTEGER PRIMARY KEY,
        user_id TEXT,
        trigger_at DATETIME,
        content TEXT
      );
    `);
  },
  get: () => db
};