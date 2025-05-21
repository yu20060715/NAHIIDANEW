const fs = require('fs');
const path = require('path');
const flirtData = require(path.join(__dirname, '../../config/flirt.json'));

class FlirtGenerator {
  static getRandomFlirt() {
    const totalWeight = flirtData.sentences.reduce((sum, s) => sum + s.weight, 0);
    let random = Math.random() * totalWeight;
    
    const selected = flirtData.sentences.find(s => {
      random -= s.weight;
      return random <= 0;
    });

    const emojis = flirtData.emojis[selected.emotion];
    const emojiChain = emojis.sort(() => 0.5 - Math.random()).slice(0, 2).join('');
    
    return this._addParticle(selected.text) + ' ' + emojiChain;
  }

  static _addParticle(text) {
    const particles = ['啦', '嘛', '唷', '喔～', '呢'];
    return text.replace(/[!。]?$/, particles[Math.floor(Math.random() * particles.length)]);
  }
}

module.exports = FlirtGenerator;