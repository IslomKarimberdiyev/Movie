import React, {useEffect, useState} from "react";
import axios from "axios";

import style from './aboutMovie.module.scss';
import Preloader from "../../preloader/preloader";
import MovieList from "./movieList/movieList";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

const AboutMovie = (props) => {
    const { id } = useParams();
    const {t, i18n} = useTranslation();


    const [about, setAbout] = useState([])
    const [isLoading, setLoading] = useState(true);


    useEffect(() => {
        setLoading(true);
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=337f338ffc9eae3e5378cc87107d0a13&language=${i18n.language}`)
            .then(response => {
                setAbout(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            })
    },[id, i18n.language]);

    return (
        <div className={style['container']}>
            {!!isLoading && (
                <div>
                    <Preloader/>
                </div>
            )}
            {!isLoading && <MovieList data={about} key={about.id} {...about}/>}
        </div>
    )
}

export default AboutMovie;
