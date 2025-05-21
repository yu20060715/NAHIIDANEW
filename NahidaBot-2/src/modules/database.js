const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.resolve(__dirname, '../../data/nahida.db');

// 强制创建data目录的防御性代码
const fs = require('fs');
if (!fs.existsSync(path.dirname(dbPath))) {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
}

const db = new Database(dbPath);

console.log('【數據庫】文件路徑:', dbPath);
console.log('【數據庫】表結構:', 
  db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all()
);

// 完整的表结构创建语句
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    custom_name TEXT,
    lang TEXT DEFAULT 'zh',
    style TEXT DEFAULT 'default',
    last_active DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  
  CREATE TABLE IF NOT EXISTS reminders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT,
    content TEXT,
    trigger_at DATETIME
  );
`);

// 添加测试数据
try {
  db.prepare(`
    INSERT INTO users (id, custom_name) 
    VALUES ('test_user_123', '测试用户')
    ON CONFLICT(id) DO NOTHING
  `).run();
} catch (e) { /* 忽略重复插入错误 */ }

module.exports = db;