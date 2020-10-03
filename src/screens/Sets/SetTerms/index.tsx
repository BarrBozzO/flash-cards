import React, { FunctionComponent, useState, useEffect } from "react";
import useApi from "hooks/useApi";
import { match } from "react-router";
import { Set, Term } from "data/entities";
import Table, { TableRow } from "components/Table";
import Button from "components/Button";
import useTypedSelector from "hooks/useTypedSelector";
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
  const API = useApi();
  const setId = match.params.id;
  const [set, terms]: [Set | undefined, Term[]] = useTypedSelector((state) => {
    return [
      state.sets.data.find((set: Set) => set.id === setId),
      state.terms.data,
    ];
  });
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  useEffect(() => {
    API.getSet({ id: setId });
    API.terms({
      set_id: setId,
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

  const onCreateTerm = async (term: Term) => {
    const payload = {
      ...term,
      set_id: setId,
    };

    try {
      setIsAdding(true);
      const response = await API.addTerm(payload);

      if (response.error) {
        throw new Error(response.error);
      }
    } catch (err) {
      // nothing
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteTerm = async (id: string) => {
    try {
      setIsDeleting(id);
      const response = await API.deleteTerm({
        id,
      });

      if (response.error) {
        throw new Error(response.error);
      }
    } catch (err) {
      // nothing
    } finally {
      setIsDeleting(null);
    }
  };

  const renderTermsTable = () => {
    if (!terms.length && !isAdding) {
      return <div>Nothing Found!</div>;
    }

    return (
      <Table className={styles["set-terms"]}>
        {isAdding && (
          <TableRow>
            <AddTermForm
              onCreate={onCreateTerm}
              onCancel={() => setIsAdding(false)}
            />
          </TableRow>
        )}

        {terms.map((term: Term) => {
          return (
            <TableRow key={term.id} className={styles["set-term"]}>
              <div className={styles["set-term__value"]}>{term.value}</div>
              <div className={styles["set-term__description"]}>
                {term.description}
              </div>
              <div className={styles["set-term__delete"]}>
                <DeleteIcon
                  onClick={
                    isDeleting === term.id
                      ? undefined
                      : () => handleDeleteTerm(term.id)
                  }
                />
              </div>
            </TableRow>
          );
        })}
      </Table>
    );
  };

  return (
    <div className={styles["set"]}>
      <h1>{set.name}</h1>

      <div className={styles["set__add-term"]}>
        <Button disabled={isAdding} onClick={handleAddTerm}>
          Add Term
        </Button>
      </div>

      {renderTermsTable()}
    </div>
  );
};

export default Terms;
