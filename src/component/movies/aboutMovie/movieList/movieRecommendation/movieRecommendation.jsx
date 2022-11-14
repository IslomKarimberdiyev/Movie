import React, {useEffect, useState} from "react";

import style from './movieRecommendation.module.scss';
import axios from "axios";
import {NavLink, useHistory, useParams} from "react-router-dom";
import currency from "currency.js";
import Preloader from "../../../../preloader/preloader";
import {useTranslation} from "react-i18next";

const MovieRecommendation = () => {
    const { id } = useParams();
    const { t, i18n } =useTranslation();

    const history = useHistory();


    const [recommendation, setRecommendation] = useState([])
    const [isLoading, setLoading] = useState(true);

    const handlePageClick = (id) => {
        history.push(`?movie=${id}`);
        console.log(id)

    };

    useEffect(() => {
        setLoading(true);
        axios.get(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=337f338ffc9eae3e5378cc87107d0a13&language=${i18n.language}&page=1`)
            .then(response => {
                setRecommendation(response.data.results)
            })
            .catch((error) =>{
                console.log(error)
            })
            .finally(() => {
                setLoading(false);
            })
    },[i18n.language])


    return(
        <>
            {recommendation.length === 0 ? (
                <></>
            ): <div className={style['movie__recommendation']}>
                <div className={style['movie__recommendation-title']}>{t('recommendation')}</div>
                {!!isLoading && (
                    <div>
                        <Preloader/>
                    </div>
                )}
                <div className={style['card']}>
                    {!isLoading && !!recommendation.length && recommendation.map(data => {
                        return (
                            <NavLink to={`${data.id}`} id={data.id} onChange={handlePageClick}>
                                <div className={style['recommendation']}>
                                    <div className={style['recommendation__vote']}>{currency(data.vote_average, {precision: 1}).value}</div>
                                    <div className={style['recommendation__image']}>
                                        {
                                            data.poster_path === null ?  (
                                                <img src={`https://i.pinimg.com/736x/ea/8d/11/ea8d11f1ffc6355b8a440106ce61d0f3.jpg`} alt={'img'}/>
                                            ) : <img src={`https://image.tmdb.org/t/p/w185//${data.poster_path}`} alt={'img'}/>

                                        }
                                    </div>
                                    <div className={style['recommendation__content']}>
                                        <span className={style['recommendation__content-title']}>{data.title}</span>
                                        <div className={style['recommendation__content-year']}>
                                            <span>{data.release_date}</span>
                                        </div>
                                    </div>
                                </div>
                            </NavLink>
                        )
                    })
                    }
                </div>
            </div>
            }
            </>
    )
}

export default MovieRecommendation;