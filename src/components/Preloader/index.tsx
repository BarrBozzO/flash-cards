import React from 'react';
import cx from "classnames";
import { ReactComponent as Loader } from "assets/icons/loader.svg";

import styles from './Preloader.module.scss';

type PropsType = {
    size?: 'sm' | 'md' | 'lg'
};

function Preloader({ size = 'sm' }: PropsType) {
    return (
        <div className={styles['preloader-container']}>
            <Loader className={cx(styles['preloader'], {
                [styles['preloader--small']]: size === 'sm',
                [styles['preloader--medium']]: size === 'md',
                [styles['preloader--large']]: size === 'lg',
            })} />
        </div>
    )
}

export default Preloader
