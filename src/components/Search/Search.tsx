import { FC } from "react";

import st from './Search.module.scss';

import { ReactComponent as SearchLogo } from '../../assets/img/search.svg';

interface ISearchProps {
    placeholder: string;
};

const Search: FC<ISearchProps> = ({ placeholder }) => {

    return (
        <div className={st.search}>
            <SearchLogo className={st.search__icon} />
            <input
                className={st.search__input}
                type="text"
                placeholder={placeholder}
            />
        </div>
    )
};

export default Search;
