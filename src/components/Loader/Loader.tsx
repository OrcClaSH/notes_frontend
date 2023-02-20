import { FC } from 'react';

import st from './Loader.module.scss';

const Loader: FC = () => {
    return (
        <span className={st.loader}></span>
    )
};

export default Loader;
