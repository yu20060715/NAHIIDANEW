const assert = require('assert');
const FlirtGenerator = require('../src/modules/flirtGenerator');

describe('撒嬌生成器測試', () => {
  it('應生成帶有emoji的句子', () => {
    const result = FlirtGenerator.getRandomFlirt();
    assert.ok(result.length > 0);
    assert.ok(/[\u{1F600}-\u{1F64F}]/u.test(result));
  });
});