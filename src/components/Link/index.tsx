import React from 'react';
import cx from 'classnames';
import { Link as RouterLink, LinkProps } from "react-router-dom";

import styles from './Link.module.scss';

function Link({ className,  ...otherProps}: LinkProps) {
    return (
        <RouterLink className={cx(className, styles['link'])} {...otherProps} />
    )
}

export default Link;
