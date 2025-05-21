import Database from 'better-sqlite3';
const db = new Database(process.env.DB_PATH);
db.exec(`CREATE TABLE IF NOT EXISTS settings (
  userId TEXT PRIMARY KEY,
  name TEXT,
  style TEXT
)`);
export function getSettings(id) { return db.prepare('SELECT * FROM settings WHERE userId=?').get(id); }
export function setSettings(id, name, style) {
  db.prepare('INSERT OR REPLACE INTO settings (userId,name,style) VALUES (?,?,?)').run(id,name,style);
}
