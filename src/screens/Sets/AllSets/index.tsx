import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { actionCreators } from "store/actions";
import useTypedSelector from "hooks/useTypedSelector";
import useApi from "hooks/useApi";
import { Set } from "data/entities";
import Card from "components/Card";
import Button from "components/Button";

import styles from "./AllSets.module.scss";

function AllSets() {
  const API = useApi();
  const sets = useTypedSelector((state) => state.sets.data);
  const dispatch = useDispatch();

  const dispatchAddSet = (data: Set[] | Set) => {
    dispatch(actionCreators.addSet(data));
  };

  useEffect(() => {
    API.sets();
    // .then((sets: Set[]) => {
    //     dispatch(actionCreators.getSetsSuccess(sets));
    //   })
    // .catch((err: Error) => {
    //   dispatch(actionCreators.getSetsError(err));
    // });
  }, []);

  const handleAddSet = () => {
    const payload = {
      name: "awd",
      description: "awdda",
      terms: [],
    };
    API.addSet(payload)
      .then((data: Set) => {
        console.log(data);
      })
      .catch(() => {});
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
