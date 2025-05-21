module.exports = {
  execute: async (user, name) => {
    db.prepare(`
      INSERT OR REPLACE INTO users 
      (id, custom_name) VALUES (?, ?)
    `).run(user.id, name);
    
    return `知道啦～以後就叫人家${name}囉～(⁄ ⁄•⁄ω⁄•⁄ ⁄)`;
  }
};