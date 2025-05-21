async function retry(fn, { retries = 3, delay = 1000 } = {}) {
  try {
    return await fn();
  } catch (err) {
    if (retries <= 0) throw err;
    await new Promise(resolve => setTimeout(resolve, delay));
    return retry(fn, { retries: retries - 1, delay: delay * 2 });
  }
}