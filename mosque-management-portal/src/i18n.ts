import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from '@/locales/en.json';
import msTranslations from '@/locales/ms.json';
import LanguageDetector from 'i18next-browser-languagedetector';
import {ENGLISH} from "@/constants/localeConstants";

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: enTranslations },
            ms: { translation: msTranslations },
        },
        lng: ENGLISH,
        fallbackLng: ENGLISH,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;