const db = require('./database');

module.exports = {
  getUserConfig: (userId) => 
    db.prepare('SELECT * FROM users WHERE id = ?').get(userId),
  
  updateStyle: (userId, style) => {
    db.prepare('UPDATE users SET style = ? WHERE id = ?')
     .run(style, userId);
  }
};