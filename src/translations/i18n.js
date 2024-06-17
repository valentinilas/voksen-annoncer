import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import global_en from '../translations/en/global.json'
import global_da from '../translations/da/global.json'

i18n
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        interpolation: { escapeValue: false },
        lng: 'da',
        fallbackLng: "en",
        resources: {
            en: {
                translation: global_en
            },
            da: {
                translation: global_da
            }
        }
    });

export default i18n;