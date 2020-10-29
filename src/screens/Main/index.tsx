import React from "react";
import Link from "components/Link";
import { Row, Col } from "antd";

import styles from "./Main.module.scss";

function Main() {
  return (
    <Row>
      <Col offset={6} span={12}>
        <div className={styles["top-text"]}>
          Become your most
          <br />
          unstoppable self
        </div>
        <div className={styles["sub-text"]}>
          Master any subject, one success at a time.
        </div>
        <div className={styles["link-container"]}>
          <Link to="/sets">Go to sets</Link>
        </div>
      </Col>
    </Row>
  );
}

export default Main;
