import React, {
  FunctionComponent,
  useEffect,
  useContext,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import { actionCreators } from "store/actions";
import { match } from "react-router";
import { Set, Term } from "data/entities";
import Table, { TableRow } from "components/Table";
import Button from "components/Button";
import useTypedSelector from "hooks/useTypedSelector";
import DBContext from "db/index";
import AddTermForm from "./AddTermForm";
import { ReactComponent as DeleteIcon } from "assets/icons/delete.svg";

import styles from "./SetTerms.module.scss";

type MatchParams = {
  id: string;
};

type Props = {
  match: match<MatchParams>;
};

const Terms: FunctionComponent<Props> = ({ match }) => {
  const setId = match.params.id;
  const set: Set | undefined = useTypedSelector((state) => {
    return state.sets.sets.find((set: Set) => set.id === setId);
  });
  const dispatch = useDispatch();
  const DB = useContext(DBContext);

  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    dispatch(actionCreators.getSetsStart());
    DB.get("sets")
      .then((sets: Set[]) => {
        dispatch(actionCreators.getSetsSuccess(sets));
      })
      .catch((err) => {
        dispatch(actionCreators.getSetsError(err));
      });
  }, [setId]);

  if (typeof set === "undefined") {
    return (
      <div>
        <h1>Set Not Found</h1>
      </div>
    );
  }

  const handleAddTerm = (e: React.MouseEvent) => {
    setIsAdding(true);
  };

  const onCreateTerm = (term: Term) => {
    dispatch(actionCreators.addTerm(term, setId));
    setIsAdding(false);
  };

  const handleDeleteTerm = (id: string) => {
    dispatch(actionCreators.removeTerm(id));
  };

  return (
    <div className={styles["set"]}>
      <h1>{set.name}</h1>

      <div className={styles["set__add-term"]}>
        <Button disabled={isAdding} onClick={handleAddTerm}>
          Add Term
        </Button>
      </div>

      <Table className={styles["set-terms"]}>
        {isAdding && (
          <TableRow>
            <AddTermForm
              onCreate={onCreateTerm}
              onCancel={() => setIsAdding(false)}
            />
          </TableRow>
        )}

        {set.terms.map((term: Term) => {
          return (
            <TableRow className={styles["set-term"]}>
              <div className={styles["set-term__value"]}>{term.value}</div>
              <div className={styles["set-term__description"]}>
                {term.description}
              </div>
              <div className={styles["set-term__delete"]}>
                <DeleteIcon onClick={() => handleDeleteTerm(term.id)} />
              </div>
            </TableRow>
          );
        })}
      </Table>
    </div>
  );
};

export default Terms;
