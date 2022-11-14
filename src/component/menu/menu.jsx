import React from "react";

import {NavLink} from "react-router-dom";

import style from "./menu.module.scss";
import {useTranslation} from "react-i18next";

function Menu(props) {
    const {t, i18n} = useTranslation();

    const items = [
        {
            title: t('popular'),
            to: '/popular'
        },
        {
            title: t('latest'),
            to:'/latest'
        },
        {
            title: t('upcoming'),
            to:'/upcoming'
        }
    ]
    return(
        <div className={style['menu']}>
            {items.map(item => (
                <NavLink to={item.to} className={style['menu__item']} activeClassName={style['menu__item--active']}>{item.title}</NavLink>
            ))}
        </div>
    )
}

export default Menu;