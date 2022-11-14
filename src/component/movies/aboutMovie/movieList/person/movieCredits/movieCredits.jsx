import React, {useEffect, useState} from "react";
import axios from "axios";

import {NavLink, useHistory, useParams} from "react-router-dom";
import Preloader from "../../../../../preloader/preloader";
import currency from "currency.js";
import {useTranslation} from "react-i18next";
import i18next from '../../../../../../languge/i18n'
import style from './movieCredits.module.scss';

const MovieCredits = () => {
    const { id } = useParams();
    const { t, i18n } =useTranslation();
    const history = useHistory();


    const [cast, setCast] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const handlePageClick = (id) => {
        history.push(`?movie=${id}`);
    };

    const changeLanguage = (lng) => {
        i18next.changeLanguage(lng);
    };


    useEffect(() => {
        setLoading(true);
        axios.get(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=337f338ffc9eae3e5378cc87107d0a13&language=${i18n.language}`)
            .then(response => {
                setCast(response.data.cast)
            })
            .catch((error) =>{
                console.log(error)
            })
            .finally(() => {
                setLoading(false);
            })
    },[i18n.language])

    return (
        <div className={style['credits']}>
            <div className={style['credits__title']}>{t('credits__title')}</div>
            {!!isLoading && (
                <div>
                    <Preloader/>
                </div>
            )}
            <div className={style['credits__card']}>
                {!isLoading && !!cast.length && cast.map(data => {
                    return (
                        <NavLink to={`/${data.id}`} id={data.id} onChange={handlePageClick}>
                            <div className={style['card']}>
                                <div className={style['card__vote']}>{currency(data.vote_average, {precision: 1}).value}</div>
                                <div className={style['card__image']}>
                                    {
                                        data.poster_path === null ?  (
                                            <img src={`https://i.pinimg.com/736x/ea/8d/11/ea8d11f1ffc6355b8a440106ce61d0f3.jpg`} alt={`${data.title}`}/>
                                        ) : <img src={`https://image.tmdb.org/t/p/w185//${data.poster_path}`} alt={'img'}/>

                                    }
                                </div>
                                <div className={style['card__content']}>
                                    <span className={style['card__content-title']}>{data.title}</span>
                                    <div className={style['card__content-year']}>
                                        <span>{data.release_date}</span>
                                    </div>
                                </div>
                            </div>
                        </NavLink>
                    )
                })}
            </div>
        </div>
    )
}

export default MovieCredits;