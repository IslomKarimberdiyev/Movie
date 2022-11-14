import React, {useEffect, useState} from "react";

import {useHistory} from "react-router-dom";
import Movie from "../movie/movie";

import Pagination from "react-js-pagination";
import style from './pagination.module.scss';


function PaginationItem({ totalPages, items, currentPage }) {
    const history = useHistory();

    const handlePageClick = (page) => {
        history.push(`?page=${page}`);
    };

    return (
        <>
            <div className={style['movies']}>
                {!!items.length && items.map(movie => (
                    <Movie key={movie.id} id={movie.id}
                           poster={movie.poster_path}
                           title={movie.title}
                           vote_average={movie.vote_average}
                           poster_path={movie.poster_path}
                           release_date={movie.release_date}
                    />
                ))}
            </div>
            <div className={style['pagination']}>
                <Pagination
                    totalItemsCount={totalPages}
                    onChange={handlePageClick}
                    itemsCountPerPage={20}
                    activeLinkClass={style['active']}
                    pageRangeDisplayed={5}
                    activePage={Number(currentPage)}
                    linkClass={style['pagination__number']}
                    linkClassFirst={style['pagination__arrow']}
                    linkClassPrev={style['pagination__arrow']}
                    linkClassNext={style['pagination__arrow']}
                    linkClassLast={style['pagination__arrow']}
                    itemClass={style['pagination__circle']}
                />
            </div>
        </>
    );
}

export default PaginationItem;