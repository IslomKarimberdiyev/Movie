import React, {useEffect, useState} from "react";
import axios from "axios";

import {NavLink, useParams} from "react-router-dom";

import Preloader from "../../../../preloader/preloader";

import style from './person.module.scss';
import PersonImage from "./personImage/personImage";
import MovieCredits from "./movieCredits/movieCredits";
import {useTranslation} from "react-i18next";
const Person = () => {
    const { id } = useParams();

    const {t, i18n} = useTranslation();

    const [person, setPerson] =useState([]);
    const [isLoading, setLoading] = useState(true);


    useEffect(() => {
        setLoading(true);
        axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=337f338ffc9eae3e5378cc87107d0a13&language=${i18n.language}`)
            .then(response => {
                setPerson(response.data)
            })
            .catch((error) =>{
                console.log(error)
            })
            .finally(() => {
                setLoading(false);
            })
    },[i18n.language])
    return(
        <div className={style['container']}>
            {!!isLoading && (
                <div>
                    <Preloader/>
                </div>
            )}
            {!isLoading && !person.length && (
                <div id={person.id} className={style['person']}>
                    <div className={style['person__img']}>
                        {
                            person.profile_path === null ?  (
                                <img src={'https://media.istockphoto.com/vectors/avatar-flat-icon-on-black-background-black-style-vector-illustration-vector-id1161086164?k=20&m=1161086164&s=170667a&w=0&h=x_w1-m_iLtVMAtae9ysSGLDglPFhq-qt3OCu5Ur3boQ='} alt={`${person.name} image`}/>
                            ) : <img src={`https://image.tmdb.org/t/p/w185//${person.profile_path}`} alt={`${person.name} image`}/>

                        }
                    </div>
                    <div className={style['person__information']}>
                        <div className={style['person__information-name']}>{person.name}</div>
                        {person.birthday === null ? (
                            <></>
                        ) : <div className={style['person__information-item']}>
                                <span>{t('birthday')} :</span>
                                <div className={style['item__text']}>{person.birthday}</div>
                            </div>
                        }
                        {person.place_of_birth === null ? (
                            <></>
                        ) : <div className={style['person__information-item']}>
                                <span>{t('placeOfBirth')} :</span>
                                <div className={style['item__text']}>{person.place_of_birth}</div>
                            </div>
                        }
                        {person.biography === "" ? (
                            <></>
                        ) :  <div className={style['person__information-item']}>
                                <span>{t('biography')} :</span>
                                <div className={style['item__text']}>{person.biography}</div>
                             </div>
                        }
                        <PersonImage/>
                    </div>
                </div>
            )}
            <MovieCredits/>
        </div>
    )
}

export default Person;