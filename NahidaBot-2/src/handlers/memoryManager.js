const fs = require('fs').promises;
const path = require('path');
const useSql = process.env.USE_SQLITE==='true';
let db;
if (useSql) {
  const Database = require('better-sqlite3');
  db = new Database(process.env.DATABASE_PATH||'memory.db');
  db.prepare(`CREATE TABLE IF NOT EXISTS memory(userId TEXT, guildId TEXT, data TEXT, PRIMARY KEY(userId,guildId))`).run();
}
module.exports = {
  async loadMemory(uid, gid) {
    if (useSql) {
      const r=db.prepare('SELECT data FROM memory WHERE userId=? AND guildId=?').get(uid,gid);
      return r?JSON.parse(r.data):{history:[],lastInteraction:null};
    }
    const file=path.join(__dirname,'../memory/userMemory',`${gid}_${uid}.json`);
    try{const c=await fs.readFile(file,'utf8');return JSON.parse(c);}catch{return{history:[],lastInteraction:null};}
  },
  async saveMemory(uid,gid,data){
    if(useSql){
      const s=JSON.stringify(data);
      db.prepare(`INSERT INTO ...`).run(uid,gid,s);
      return;
    }
    const dir=path.join(__dirname,'../memory/userMemory');
    await fs.mkdir(dir,{recursive:true});
    await fs.writeFile(path.join(dir,`${gid}_${uid}.json`),JSON.stringify(data,null,2));
  }
};