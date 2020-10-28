import React from "react";
import { useDispatch } from "react-redux";
import useTypedSelector from "hooks/useTypedSelector";
import cx from "classnames";
import { toggleTheme } from "store/actions/actionCreators";
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
    <div>
      {"sun"}
      <Switch
        checked={theme === "dark"}
        onChange={() => dispatch(toggleTheme())}
      />
      {"moon"}
    </div>
  );
}

export default Theme;
