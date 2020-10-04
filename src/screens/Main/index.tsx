import React from "react";
import { Link } from "react-router-dom";

import styles from "./Main.module.scss";

function Main() {
  return (
    <div className={styles["main"]}>
      <h1 className={styles["main-title"]}>Flash Cards App</h1>
      <div>
        <Link to="/sets">Go to sets</Link>
      </div>
    </div>
  );
}

export default Main;
