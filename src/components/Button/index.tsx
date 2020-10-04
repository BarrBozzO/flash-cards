import React, { FunctionComponent } from "react";
import cn from "classnames";

import styles from "./Button.module.scss";

type Props = {
  onClick: React.EventHandler<React.MouseEvent>;
  className?: string;
  alternative?: boolean;
  disabled?: boolean;
};

const Button: FunctionComponent<Props> = ({
  onClick,
  className = "",
  alternative = false,
  children,
  disabled = false,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (disabled) {
      return;
    }

    onClick(e);
  };

  return (
    <div
      onClick={handleClick}
      className={cn(styles["button"], {
        [styles["button--alternative"]]: alternative,
        [styles["button--disabled"]]: disabled,
        [className]: Boolean(className),
      })}
    >
      {children}
    </div>
  );
};

export default Button;
