import React from "react";
import { useDispatch } from "react-redux";
import useTypedSelector from "hooks/useTypedSelector";
import cx from "classnames";
import { toggleTheme } from "store/actions/actionCreators";
import { ReactComponent as SunIcon } from "assets/icons/day-mode.svg";
import { ReactComponent as MoonIcon } from "assets/icons/night-mode.svg";
import { Switch } from "antd";

import "antd/dist/antd.css";
import styles from "./Theme.module.scss";

function Theme(props: any) {
  const theme = useTypedSelector((state) => state.general.theme);

  return (
    <div className={cx(styles["theme"], styles[`theme--${theme}`])}>
      {props.children}
    </div>
  );
}

export function Toggler() {
  const dispatch = useDispatch();
  const theme = useTypedSelector((state) => state.general.theme);

  return (
    <div className={styles["toggle"]}>
      <SunIcon className={styles["toggle-icon"]} />
      <Switch
        checked={theme === "dark"}
        onChange={() => dispatch(toggleTheme())}
      />
      <MoonIcon className={styles["toggle-icon"]} />
    </div>
  );
}

export default Theme;
