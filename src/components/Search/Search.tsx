import { FC } from "react";

import st from './Search.module.scss';

import { ReactComponent as SearchLogo } from '@/assets/img/search.svg';

interface ISearchProps {
    placeholder: string;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
};

const Search: FC<ISearchProps> = ({ placeholder, value, setValue }) => {

    return (
        <div className={st.search}>
            <SearchLogo className={st.search__icon} />
            <input
                className={st.search__input}
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
            />
        </div>
    )
};

export default Search;
