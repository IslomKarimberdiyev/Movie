import React from "react";
import style from './preloader.module.scss';

function Preloader() {
    return(
        <div className={style['preloader']}>
            <div className={style['preloader__container']}>
                <div className={style['preloader__container-item']}></div>
                <div className={style['preloader__container-item']}></div>
                <div className={style['preloader__container-item']}></div>
                <div className={style['preloader__container-item']}></div>
            </div>
        </div>
    )
}

export default Preloader;