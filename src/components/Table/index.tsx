import React, { FunctionComponent } from "react";
import cn from "classnames";

import styles from "./Table.module.scss";

type TableProps = {
  className?: string;
};

const Table: FunctionComponent<TableProps> = ({ children, className = "" }) => {
  return (
    <div
      className={cn(styles["table"], {
        [className]: Boolean(className),
      })}
    >
      {children}
    </div>
  );
};

type RowTypes = {
  className?: string;
};

export const TableRow: FunctionComponent<RowTypes> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={cn(styles["table-row"], {
        [className]: Boolean(className),
      })}
    >
      {children}
    </div>
  );
};

export default Table;
