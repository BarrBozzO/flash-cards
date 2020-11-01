import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Row, Col, Button } from "antd";
import useTypedSelector from "hooks/useTypedSelector";
import useApi from "hooks/useApi";
import Card from "components/Card";
import Preloader from "components/Preloader";

import styles from "./AllSets.module.scss";

function AllSets() {
  const API = useApi();
  const { data: sets, loading } = useTypedSelector((state) => {
    return state.sets;
  });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    API.sets();
  }, []);

  const handleAddSet = async () => {
    const payload = {
      name: "",
      description: "",
    };

    try {
      setIsAdding(true);
      const response = await API.addSet(payload);

      if (response.error) {
        throw new Error(response.error);
      }
    } catch (err) {
      toast(err.toString());
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className={styles["sets"]}>
      <div className={styles["sets-title-container"]}>
        <h1 className={styles["sets-title"]}>All Sets</h1>
        <Button type="primary" onClick={handleAddSet} disabled={isAdding}>
          add set
        </Button>
      </div>
      <Row gutter={16}>
        {loading ? (
          <Preloader size="lg" />
        ) : (
          sets.map((set) => (
            <Col span={4}>
              <Link key={set.id} to={`/sets/${set.id}`}>
                <Card className={styles["sets-grid__item"]}>
                  <div>{set.name}</div>
                </Card>
              </Link>
            </Col>
          ))
        )}
      </Row>
    </div>
  );
}

export default AllSets;
