import React, {useEffect, useState} from "react";
import axios from "axios";

import Preloader from "../preloader/preloader";
import {useTranslation} from "react-i18next";

import style from './latest.module.scss';
import {useLocation} from "react-router-dom";
import PaginationItem from "../movies/pagination/pagination";

const Latest = () => {
    const {i18n} = useTranslation();
    const { search } = useLocation();
    const query = new URLSearchParams(search);


    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState({})
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=337f338ffc9eae3e5378cc87107d0a13&language=${i18n.language}&page=${query.get('page') || 1}`)
            .then(response => {
                setMovies(response.data.results);
                setPage(response.data.total_results);

            })
            .catch((error) => {
                console.error(error)
            })
            .finally(() => {
                setLoading(false);
            })
    }, [query.get('page'),i18n.language]);


    return (
        <div className={style['container']}>
            {!!isLoading && (
                <div>
                    <Preloader/>
                </div>
            )}
            {!isLoading && !!movies.length && (
                <>
                    <PaginationItem  items={movies} currentPage={query.get('page') || 1} totalPages={page}/>
                </>
            )}
        </div>
    )
}

export default Latest;