import React from 'react';
import { useDispatch } from "react-redux";
import useTypedSelector from "hooks/useTypedSelector";
import cx from "classnames";
import { toggleTheme } from "store/actions/actionCreators";

import styles from "./Theme.module.scss";

function Theme(props: any) {
    const theme = useTypedSelector(state => state.general.theme);
    
    return (
        <div className={cx(styles['theme'], styles[`theme--${theme}`])}>
          {props.children}  
        </div>
    )
}

export function Toggler() {
  const dispatch = useDispatch();

  return (
    <div onClick={() => dispatch(toggleTheme())}>
      {'toggle theme'}
    </div>
  );
}

export default Theme;
