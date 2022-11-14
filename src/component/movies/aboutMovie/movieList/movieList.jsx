import React, {useTransition} from "react";
import currency from "currency.js";

import MovieRecommendation from "./movieRecommendation/movieRecommendation";
import BilledCast from "./billedCast/billedCast";
import MovieImages from "./movieImages/movieImages";

import style from "./movieList.module.scss"
import {useTranslation} from "react-i18next";

function MovieList(props) {
    const {t} = useTranslation();

    const {
        release_date: data,
        title: title,
        poster_path: image,
        vote_average: vote,
        overview: overview,
        budget: budget,
        revenue: revenue,
        genres: genres,
    } = props



    return(
        <div className={style['movies-single']}>
            <div className={style['movie']}>
                <div className={style['movie__image']}>
                    <div className={style['movie__vote']}>{currency(vote, {precision: 1}).value}</div>
                    <img src={`https://image.tmdb.org/t/p/original/${image}`} alt={'image'}/>
                </div>
                <div className={style['movie__information']}>
                    <div className={style['movie__information-title']}>
                        <span className={style['title__text']}>{t('title')} :</span>
                        <div className={style['movie__information-subtitle']}>{title}</div>
                    </div>
                    { overview === "" ? (
                        <></>
                    ):  <div className={style['movie__information-overview']}>
                            <span className={style['title__text']}>{t('overview')} :</span>
                            <div className={style['movie__information-description']}>{overview}</div>
                        </div>
                    }
                    <div className={style['movie__information-item']}>
                        <span className={style['title__text']}>{t('releaseDate')} :</span>
                        <div className={style['item__text']}>{data}</div>
                    </div>
                    { budget === 0 ? (
                            <></>
                        ):
                        <>
                            <div className={style['movie__information-item']}>
                                <span className={style['title__text']}>{t('budget')} :</span>
                                <div className={style['item__text']}>{currency(budget, { separator: ' ', decimal: ' ', }).format()}</div>

                            </div>
                        </>
                    }
                    { revenue === 0 ? (
                            <></>
                        ):
                        <>
                            <div className={style['movie__information-item']}>
                                <span className={style['title__text']}>{t('revenue')} :</span>
                                <div className={style['item__text']}>{currency(revenue, { separator: ' ', decimal: ' ', }).format()}</div>
                            </div>
                        </>
                    }

                    <div className={style['movie__information-genres']}>
                        {genres.map(genre => (
                            <div className={style['item__genres']}>{genre.name}</div>
                        ))}
                    </div>
                    <BilledCast/>
                    <MovieImages/>
                </div>
            </div>
            <MovieRecommendation/>
        </div>
    );
}

export default MovieList;
