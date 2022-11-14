import React, {useEffect, useState} from "react";
import axios from "axios";

import Preloader from "../../../../preloader/preloader";
import {NavLink, useParams} from "react-router-dom";

import style from './billedCast.module.scss';
import {useTranslation} from "react-i18next";

const BilledCast = () => {
    const { id } = useParams();
    const {t, i18n} = useTranslation();


    const [cast, setCast] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [isVisible, setVisible] = useState(false)



    useEffect(() => {
        setLoading(true);
        axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=337f338ffc9eae3e5378cc87107d0a13&language=${i18n.language}`)
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

    let castList = cast;

    if (!isVisible) {
        castList = cast.slice(0, 7)
    }


    const showAll = () => {
    setVisible(!isVisible)
    }



    return (    
        <div className={style['billedCast']}>
            <div className={style['billedCast__header']}>
                <div className={style['billedCast__header-title']}>{t('topBilledCast')}</div>
                <div className={style['billedCast__header-button']} onClick={showAll}>{t('showMore')}</div>
            </div>
            {!!isLoading && (
                <div>
                    <Preloader/>
                </div>
            )}
            <div className={style['billedCast__card']}>
                {!isLoading && !!castList.length && castList.map(data => {
                    return (
                        <NavLink to={`person/${data.id}`} id={data.id} className={style['billedCast__card-container']}>
                            <div className={style['billedCast__card-img']}>
                                {
                                    data.profile_path === null ?  (
                                        <img src={'https://media.istockphoto.com/vectors/avatar-flat-icon-on-black-background-black-style-vector-illustration-vector-id1161086164?k=20&m=1161086164&s=170667a&w=0&h=x_w1-m_iLtVMAtae9ysSGLDglPFhq-qt3OCu5Ur3boQ='} alt={`${data.name} image`}/>
                                    ) : <img src={`https://image.tmdb.org/t/p/w185//${data.profile_path}`} alt={`${data.name} image`}/>

                                }
                            </div>
                            <div className={style['billedCast__card-name']}>{data.name}</div>
                            <div className={style['billedCast__card-character']}>{data.character}</div>
                        </NavLink>
                    )
                })}
            </div>
        </div>
    )
}

export default BilledCast;