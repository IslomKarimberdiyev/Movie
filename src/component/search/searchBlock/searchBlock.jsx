import React, {useEffect, useState} from "react";
import style from './searchBlock.module.scss';
import {useTranslation} from "react-i18next";
import axios from "axios";
import Preloader from "../../preloader/preloader";
import {NavLink, useParams} from "react-router-dom";
import currency from "currency.js";

function SearchBlock () {
    const { query } = useParams();


    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(true);
    const {i18n} = useTranslation();

    useEffect(() => {
        setLoading(true)
        axios.get(`https://api.themoviedb.org/3/search/multi?api_key=337f338ffc9eae3e5378cc87107d0a13&language=${i18n.language}&query=${query}&page=1&include_adult=false`)
            .then(response => {
                setData(response.data.results)
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setLoading(false);
            })
    },[i18n.language, query])


    return(
        <div className={style['search__container']}>
            {!!isLoading && (
                <div>
                    <Preloader/>
                </div>
            )}
            <div className={style['card']}>
            {!isLoading && !!data.length && data.map(data => {
                if(!data.poster_path){
                    return <></>
                }

                return(
                    <NavLink to={`/${data.id}`} id={data.id}>
                        <div className={style['search']}>
                            <div className={style['search__vote']}>{currency(data.vote_average, {precision: 1}).value}</div>
                            <div className={style['search__image']}>
                                {
                                    data.poster_path === null ? (
                                        <img src={'https://www.kinonews.ru/insimgs/2022/newsimg/newsimg107266.jpg'} alt={'img'}/>
                                    ) : <img src={`https://image.tmdb.org/t/p/w185//${data.poster_path}`} alt={'img'}/>

                                }
                            </div>
                            <div className={style['search__content']}>
                                <div className={style['search__content-title']}>
                                    {
                                        data.title === undefined ? (
                                            <span>{data.original_name}</span>
                                        ) : <span>{data.title}</span>
                                }
                                </div>
                                <div className={style['search__content-year']}>
                                    <div>{
                                        data.release_date === undefined ? (
                                            <span>{data.first_air_date}</span>
                                        ) : <span>{data.release_date}</span>
                                        }</div>
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

export default SearchBlock;