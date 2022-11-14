import i18n from "i18next";
import {  initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    resources: {
        "en-US": {
            translation: {
                "key": "en-US",
                "credits__title": "KNOWN BY",
                "birthday": "Birthday",
                "images": "Images",
                "recommendation": "Recommendation",
                "placeOfBirth": "Place of birth",
                "biography": "Biography",
                "photos": "Photos",
                "popular": "Popular",
                "topRated": "Top Rated",
                "upcoming": "Upcoming",
                "title": "Title",
                "overview": "Overview",
                "releaseDate": "Release date",
                "budget": "Budget",
                "revenue": "Revenue",
                "topBilledCast": "Top Billed Cast",
                "showMore": "Show more",
                "latest": "Latest",
            }
        },
        "ru-RU": {
            translation: {
                "key": "hello world",
                "credits__title": "ИЗВЕСТЕН ПО",
                "birthday": "Дата рождения",
                "images": "Картинки",
                "recommendation": "Рекомендация",
                "placeOfBirth": "Место Рождения",
                "biography": "биография",
                "photos": "Фото",
                "popular": "Популярный",
                "topRated": "Самые популярные",
                "upcoming": "Предстоящие",
                "title": "Название",
                "overview": "Описание",
                "releaseDate": "Дата выхода",
                "budget": "Бюджет",
                "revenue": "Доход",
                "topBilledCast": "Лучший Актерский Состав",
                "showMore": "Показать больше",
                "latest": "Последнее",
            }
        }
    },
    fallbackLng: "en-US",
    lng: localStorage.getItem("lng") || "en-US",
    debug: false,

    keySeparator: false, // we use content as keys

    interpolation: {
        escapeValue: false, // not needed for react!!
        formatSeparator: ","
    },

    react: {
        wait: true
    }
});

i18n.on('languageChanged', function(lng) {
    localStorage.setItem("lng", lng)
})

export default i18n;