// src/modules/database.js
const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.resolve(__dirname, '../../data/nahida.db');

// 導出已初始化的單例實例
const db = new Database(dbPath);
db.pragma('journal_mode = WAL');

// 創建表結構
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    custom_name TEXT,
    lang TEXT DEFAULT 'zh',
    style TEXT DEFAULT 'default'
  )
`);

module.exports = db;