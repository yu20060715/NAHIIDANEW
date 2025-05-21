const { readFileSync } = require('fs');
const locales = {};

function loadLocale(lang) {
  try {
    locales[lang] = JSON.parse(
      readFileSync(`./src/i18n/${lang}.json`, 'utf8')
    );
  } catch (err) {
    console.error(`Language ${lang} load failed:`, err);
  }
}

// 初始化預設語系
loadLocale('zh');
loadLocale('en');

module.exports = {
  t: (key, lang = 'zh') => locales[lang]?.[key] || key,
  setLang: (user, lang) => {
    userConfigs.set(user.id, { ...userConfigs.get(user.id), lang });
    return locales[lang]?.system.lang_set || 'Language updated';
  }
};