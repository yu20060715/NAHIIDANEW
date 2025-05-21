const { retry } = require('../utils/retry');

async function mihoyoSign() {
  return retry(async () => {
    const response = await fetch('https://api.mihoyo.com/sign', {
      headers: { 'Cookie': process.env.MIHOYO_COOKIE }
    });
    if (!response.ok) throw new Error('簽到API失敗');
    return response.json();
  }, { 
    retries: 3,
    onRetry: (error, attempt) => 
      console.log(`第${attempt}次重試簽到...`)
  });
}