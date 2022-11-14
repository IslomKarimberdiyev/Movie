import React from "react";
import style from './language.module.scss';
import {useTranslation} from "react-i18next";
import cx from 'classnames';


function Language() {
    const { i18n } = useTranslation();


    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };



    return(
        <div className={style['language']}>
            <div className={cx(style['language__item'], i18n.language === 'ru-RU' && style['language__item--active'])} onClick={() => changeLanguage("ru-RU")}>Ru</div>
            <div className={cx(style['language__item'], i18n.language === 'en-US' && style['language__item--active'])} onClick={() => changeLanguage("en-US")}>En</div>
        </div>

    )
}

export default Language;