import { initReactI18next } from 'react-i18next'
import i18n, { i18n as i18nInterface } from 'i18next'

import axiosClient from '../utils/axios'
import { LanguageEndpointInterface } from './types'
export const DEFAULT_LOCALE = localStorage.getItem('language') || 'ja'

export const loadLanguageAsync = async (language: string, i18n: i18nInterface) => {
  localStorage.setItem('language', language)
  if (i18n.hasResourceBundle(language, 'default')) {
    return i18n.changeLanguage(language)
  }

  const languageEndpoints = Object.assign({}, process.env.LANGUAGES) as LanguageEndpointInterface

  return await axiosClient.get(languageEndpoints[language.toUpperCase()], '', {
      transformRequest: [ function (data: any, headers: any) {
        delete headers.common
        return data
      } ],
    })
    .then((response) => {
      if (response.statusText === 'OK') {
        i18n.addResourceBundle(language, 'default', response.data)
        return setI18nLanguage(language, i18n)
      }
    })
    .catch(() => {
      const data = loadLocalLanguage(language, i18n)
      data.then((value) => {
        i18n.addResourceBundle(language, 'default', value.default)
        return setI18nLanguage(language, i18n)
      })
    })
}

export const setI18nLanguage = function (language: string, i18n: i18nInterface) {
  i18n.changeLanguage(language)
}

export const loadLocalLanguage = async (language: string, i18n: i18nInterface) => {
  return await import(`./${language}.json`)
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    ns: ['default'],
    resources: {},
    lng: DEFAULT_LOCALE,
    keySeparator: '.', // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  })

export default i18n
