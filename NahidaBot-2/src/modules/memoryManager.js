const Database = require('better-sqlite3');
const path = require('path');

class MemoryBridge {
  constructor() {
    this.db = new Database(path.join(__dirname, '../../data/userData.db'));
    this._initDatabase();
  }

  _initDatabase() {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT,
        preferred_nickname TEXT,
        last_interaction TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS reminders (
        user_id TEXT,
        reminder_time TIMESTAMP,
        message TEXT
      );
    `);
  }

  getUser(userId) {
    const stmt = this.db.prepare('SELECT * FROM users WHERE id = ?');
    return stmt.get(userId);
  }

  updateNickname(userId, nickname) {
    const stmt = this.db.prepare(`
      INSERT INTO users (id, preferred_nickname) 
      VALUES (?, ?)
      ON CONFLICT(id) DO UPDATE SET preferred_nickname = excluded.preferred_nickname
    `);
    stmt.run(userId, nickname);
  }
}

module.exports = new MemoryBridge();