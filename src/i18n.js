import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationAz from "./locales/az.json";
import translationEn from "./locales/en.json";
import translationRu from "./locales/ru.json";

i18n
    .use(initReactI18next)
    .init({
        resources: {
            az: {
                translation: translationAz,
            },
            en: {
                translation: translationEn,
            },
            ru: {
                translation: translationRu,
            },
        },
        lng: "az",
        fallbackLng: "az",
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
