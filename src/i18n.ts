import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import enJSON from '@/locales/en.json'
import thJSON from '@/locales/th.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { ...enJSON },
      th: { ...thJSON },
    }, // Where we're gonna put translations' files
    lng: 'th', // Set the initial language of the App
  })