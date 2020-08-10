import React, { useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { StoreData } from "store/types";
import { actionCreators } from "store/actions";
import DBContext from "db/index";
import { Set } from "data/entities";
import Card from "components/Card";
import Button from "components/Button";

import styles from "./AllSets.module.scss";

function AllSets() {
  const DB = useContext(DBContext);
  const sets = useSelector((state: StoreData) => state.sets.sets);
  const dispatch = useDispatch();

  const dispatchAddSet = (data: Set[] | Set) => {
    dispatch(actionCreators.addSet(data));
  };

  useEffect(() => {
    DB.get("sets").then((sets: Set[]) => {
      dispatchAddSet(sets);
    });
  }, []);

  const handleAddSet = () => {
    dispatchAddSet({
      id: "#1",
      name: "awd",
      description: "awdda",
      terms: [],
    });
  };

  return (
    <div className={styles["sets"]}>
      <h1 className={styles["sets-title"]}>All Sets</h1>
      <div>
        <Button onClick={handleAddSet}>add set</Button>
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
