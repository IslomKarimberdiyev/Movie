import React, {useState} from "react";
import style from './search.module.scss';
import {useHistory} from "react-router-dom";

function Search() {
    const history = useHistory()

    const onChange = (value) => {
        history.push(value ? `/search/${value}` : '/popular');
    }

    return(
        <div className={style['search']}>
            <input type={"search"}
                   className={style['search__input']}
                   placeholder={'Search'}
                   onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}

export default Search;
