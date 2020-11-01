import React, { FunctionComponent } from "react";
import cn from "classnames";
import { Button } from "antd";

import styles from "./Button.module.scss";

type Props = {
  onClick?: React.EventHandler<React.MouseEvent>;
  className?: string;
  alternative?: boolean;
  disabled?: boolean;
  // type?: "button" | "submit" | "reset";
};

const CustomButton: FunctionComponent<Props> = ({
  onClick,
  className = "",
  alternative = false,
  children,
  disabled = false,
  // type,
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
    <Button
      onClick={handleClick}
      className={cn(styles["button"], {
        [styles["button--alternative"]]: alternative,
        [styles["button--disabled"]]: disabled,
        [className]: Boolean(className),
      })}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
