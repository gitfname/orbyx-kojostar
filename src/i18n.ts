
import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import BackEnd from "i18next-http-backend"
import LanguageDetector from "i18next-browser-languagedetector"



i18n
.use(BackEnd)
.use(LanguageDetector)
.use(initReactI18next)
.init({
    fallbackLng: "fa",
    returnObjects: true,
    interpolation: {
        escapeValue: false
    },
    backend: {
        loadPath: import.meta.env.BASE_URL+"/assets/locals/{{lng}}/{{ns}}.json"
    },
    detection: {
        order: ['cookie', 'localStorage'],
        caches: ['cookie', 'localStorage']
    }
})

export default i18n
