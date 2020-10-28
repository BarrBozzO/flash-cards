import React, { FunctionComponent } from "react";
import cn from "classnames";

import styles from "./Button.module.scss";

type Props = {
  onClick?: React.EventHandler<React.MouseEvent>;
  className?: string;
  alternative?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

const Button: FunctionComponent<Props> = ({
  onClick,
  className = "",
  alternative = false,
  children,
  disabled = false,
  type,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (disabled) {
      return;
    }

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={cn(styles["button"], {
        [styles["button--alternative"]]: alternative,
        [styles["button--disabled"]]: disabled,
        [className]: Boolean(className),
      })}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
