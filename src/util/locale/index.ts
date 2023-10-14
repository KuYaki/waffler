import { createI18n }      from 'vue-i18n'

import enUS                from '@/data/locale/en-US.json'
import ruRU                from '@/data/locale/ru-RU.json'

type MessageSchemaEN = typeof enUS
type MessageSchemaRU = typeof ruRU

type EN = "EN"
type RU = "RU"

type localeType = EN | RU

const setDefaultLocale = ():localeType => {
    let locale:localeType = 'EN'

    if ( localStorage['language'] ) {
        locale = localStorage['language']
    }
    else {
        const browserLang = window.navigator.language

        if( browserLang == 'ru-RU' || browserLang == 'ru' ){
            locale = 'RU'
        }
    }

    return locale
}

const i18n = createI18n<[MessageSchemaEN | MessageSchemaRU], localeType>({
    locale: setDefaultLocale() ,
    legacy: true,
    messages: {
        'EN': enUS,
        'RU': ruRU
    }
});

export const t = (res: string) => {
    const { t } = i18n.global
    return t(res)
}


export const getLocale = () => {
    return i18n.global.locale
}

export const setLocale = (locale: string) => {
    i18n.global.locale = locale as localeType;
    localStorage.setItem('language', locale)
}

export default i18n;