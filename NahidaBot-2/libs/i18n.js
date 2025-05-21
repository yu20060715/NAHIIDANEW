import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import path from 'path';

let locale = 'zh';
await i18next.use(Backend).init({
  lng: locale,
  fallbackLng: 'zh',
  backend: { loadPath: path.join(process.cwd(), 'data', 'i18n', '{{lng}}.json') }
});

export function t(k, o) { return i18next.t(k, o); }
export function setLocale(lng) { locale = lng; i18next.changeLanguage(lng); }
