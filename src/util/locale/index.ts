import { createI18n }      from 'vue-i18n'

import enUS                from '@/data/locale/en-US.json'
import ruRU                from '@/data/locale/ru-RU.json'

type MessageSchemaEN = typeof enUS
type MessageSchemaRU = typeof ruRU

type EN = "EN"
type RU = "RU"

type localeType = EN | RU

const i18n = createI18n<[MessageSchemaEN | MessageSchemaRU], localeType>({
    locale: 'EN',
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

export const getLocale = () => (
    i18n.global.locale
)

export const setLocale = (locale: string) => {
    i18n.global.locale = locale as localeType;
}

export default i18n;