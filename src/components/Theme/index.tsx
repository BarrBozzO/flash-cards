import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";

import styles from "./Theme.module.scss";

function Theme(props: any) {
    const dispatch = useDispatch();
    // const theme = useSelector(state => state.theme);
    const theme = 'dark';
    
    return (
        <div className={cx(styles['theme'], styles[`theme--${theme}`])}>
          {props.children}  
        </div>
    )
}

export default Theme;
