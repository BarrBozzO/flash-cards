import React, { useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { actionCreators } from "store/actions";
import useTypedSelector from "hooks/useTypedSelector";
import DBContext from "db/index";
import { Set } from "data/entities";
import Card from "components/Card";
import Button from "components/Button";

import styles from "./AllSets.module.scss";

function AllSets() {
  const DB = useContext(DBContext);
  const sets = useTypedSelector((state) => state.sets.sets);
  const dispatch = useDispatch();

  const dispatchAddSet = (data: Set[] | Set) => {
    dispatch(actionCreators.addSet(data));
  };

  useEffect(() => {
    dispatch(actionCreators.getSetsStart());
    DB.get("sets")
      .then((sets: Set[]) => {
        dispatch(actionCreators.getSetsSuccess(sets));
      })
      .catch((err) => {
        dispatch(actionCreators.getSetsError(err));
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
