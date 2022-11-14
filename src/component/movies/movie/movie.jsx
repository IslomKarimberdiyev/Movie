import React from "react";

import {NavLink} from "react-router-dom";

import style from "./movie.module.scss";
import currency from "currency.js";

function Movie({ poster_path, release_date, title, id, vote_average }) {
    return (
        <NavLink to={`/${id}`} className={style['card']} id={id}>
            <div className={style['card__image-vote']}>{currency(vote_average, {precision: 1}).value}</div>
            <div className={style['card__image']}>
                {
                    poster_path === 'N/A' ?  (
                        <img src={`https://via.placeholder.com/100%x400?text=${title}`} alt={'img'}/>
                    ) : <img src={`https://image.tmdb.org/t/p/w185//${poster_path}`} alt={'img'}/>

                }
            </div>
            <div className={style['card__content']}>
                <span className={style['card__content-title']}>{title}</span>
                <div className={style['card__content-year']}>
                    <span>{release_date}</span>
                </div>
            </div>
        </NavLink>
    )
}

export default Movie;