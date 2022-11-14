import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";

import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import ImageViewer from "react-simple-image-viewer";

import style from './movieImages.module.scss';

const MovieImages = () => {
    const { id } = useParams();
    const {t} = useTranslation();

    const [images, setImages] = useState([]);
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);

    const openImageViewer = useCallback((index) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
    }, []);

    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };


    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${id}/images?api_key=337f338ffc9eae3e5378cc87107d0a13&language=null`)
            .then(response => {
                setImages(response.data.backdrops.map(item => `${item.file_path}`))

            })
            .catch((error) =>{
                console.log(error)
            })
    },[])

    return (
        <div className={style['image']}>
            <div className={style['image__title']}>{t('images')}</div>
            <div className={style['image__card']}>
                {!images.length ? (
                    <></>
                ) :  <div className={style['image__card-item']}>
                    {images.map((src, index) => (
                        <img
                            className={style['item__images']}
                            src={`https://image.tmdb.org/t/p/w185/${src}`}
                            onClick={ () => openImageViewer(index) }
                            key={ index }
                            alt=""
                        />
                    ))}

                    {isViewerOpen && (
                        <ImageViewer
                            src={ images.map((image) => `https://image.tmdb.org/t/p/original/${image}`) }
                            currentIndex={ currentImage }
                            disableScroll={ false }
                            closeOnClickOutside={ true }
                            onClose={ closeImageViewer }
                        />
                    )}
                </div>
                }
            </div>
        </div>
    )
}

export default MovieImages;