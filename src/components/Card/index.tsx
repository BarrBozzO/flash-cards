import React, { FunctionComponent } from "react";
import cn from "classnames";

import styles from "./Card.module.scss";

type Props = {
  className?: string;
  menu?: object;
};

const Card: FunctionComponent<Props> = ({
  children,
  menu = {},
  className = "",
}) => {
  return (
    <div
      className={cn(styles.card, {
        [className]: Boolean(className),
      })}
    >
      {children}
      {menu && <div className={styles["card-menu"]}></div>}
    </div>
  );
};

export default Card;
