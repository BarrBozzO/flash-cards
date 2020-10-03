import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useTypedSelector from "hooks/useTypedSelector";
import useApi from "hooks/useApi";
import Card from "components/Card";
import Button from "components/Button";

import styles from "./AllSets.module.scss";

function AllSets() {
  const API = useApi();
  const sets = useTypedSelector((state) => state.sets.data);
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
      // nothing
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className={styles["sets"]}>
      <h1 className={styles["sets-title"]}>All Sets</h1>
      <div>
        <Button onClick={handleAddSet} disabled={isAdding}>
          add set
        </Button>
        <div className={styles["sets-grid"]}>
          {sets.map((set) => (
            <Link key={set.id} to={`/sets/${set.id}`}>
              <Card className={styles["sets-grid__item"]}>
                <div>{set.name}</div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllSets;
