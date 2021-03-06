import React, { FunctionComponent, useState, useEffect } from "react";
import useApi from "hooks/useApi";
import { match } from "react-router";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Set, Term } from "data/entities";
import Table, { TableRow } from "components/Table";
import Button from "components/Button";
import Preloader from "components/Preloader";
import useTypedSelector from "hooks/useTypedSelector";
import TermForm from "./TermForm";
import UpdateSetForm from "./UpdateSetForm";
import { ReactComponent as DeleteIcon } from "assets/icons/delete.svg";
import { ReactComponent as EditIcon } from "assets/icons/edit.svg";

import styles from "./SetTerms.module.scss";

type MatchParams = {
  id: string;
};

type Props = {
  match: match<MatchParams>;
};

const Terms: FunctionComponent<Props> = ({ match }) => {
  const API = useApi();
  const history = useHistory();
  const setId = match.params.id;
  const [set, terms, loading]: [Set | undefined, Term[], Boolean] = useTypedSelector((state) => {
    return [
      state.set.data,
      state.terms.data,
      state.set.loading || state.terms.loading || setId !== state.set.data.id
    ];
  });
  const [isAdding, setIsAdding] = useState(false);
  const [isDeletingTerm, setIsDeletingTerm] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingTerm, setIsEditingTerm] = useState<string | null>(null);

  useEffect(() => {
    API.getSet({ id: setId });
    API.terms({
      filters: {
        set_id: setId,
      }
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
      value: term.value,
      description: term.description,
      set_id: setId,
    };

    try {
      const response = await API.addTerm(payload);

      if (response.error) {
        throw new Error(response.error);
      }
    } catch (err) {
      toast(err.toString());
    } finally {
      setIsAdding(false);
    }
  };

  const onUpdateTerm = async (term: Term) => {
    const payload = {
      ...term
    };

    try {
      const response = await API.updateTerm(payload);

      if (response.error) {
        throw new Error(response.error);
      }

      setIsEditingTerm(null);
    } catch (err) {
      toast(err.toString());
    }
  };

  const handleDeleteTerm = async (id: string) => {
    try {
      setIsDeletingTerm(id);
      const response = await API.deleteTerm({
        id,
      });

      if (response.error) {
        throw new Error(response.error);
      }
    } catch (err) {
      toast(err.toString());
    } finally {
      setIsDeletingTerm(null);
    }
  };

  const handleDeleteSet = async () => {
    try {
      history.push('/sets');
      const isDeleted = await API.deleteSet({ id: setId });
    } catch (err) {
      toast(err.toString());
    }
  };

  const onUpdateSet = async (values: { name: string; description: string }) => {
    const payload = {
      ...values,
      id: setId,
    };

    try {
      const response = await API.updateSet(payload);

      if (response.error) {
        throw new Error(response.error);
      }

      setIsEditing(false);
    } catch (err) {
      toast(err.toString());
    }
  };

  const renderTermsTable = () => {
    if (loading) {
      return (
        <Preloader size="lg" />
      );
    }

    if (!terms.length && !isAdding) {
      return <div>Nothing Found!</div>;
    }

    return (
      <Table className={styles["set-terms"]}>
        {isAdding && (
          <TableRow>
            <TermForm
              onSubmit={onCreateTerm}
              onCancel={() => setIsAdding(false)}
            />
          </TableRow>
        )}

        {terms.map((term: Term) => {
          return (
            <TableRow key={term.id} className={styles["set-term"]}>
              {isEditingTerm === term.id ? (
                <TermForm
                  term={term}
                  onSubmit={onUpdateTerm}
                  onCancel={() => setIsEditingTerm(null)}
                />
              ) : (
                <>
                  <div className={styles["set-term__value"]}>{term.value}</div>
                  <div className={styles["set-term__description"]}>
                    {term.description}
                  </div>
                  <div className={styles["set-term__edit"]}>
                    <EditIcon onClick={() => setIsEditingTerm(term.id)} />
                  </div>
                  <div className={styles["set-term__delete"]}>
                    <DeleteIcon
                      onClick={
                        isDeletingTerm === term.id
                          ? undefined
                          : () => handleDeleteTerm(term.id)
                      }
                    />
                  </div>
                </>
              )}
            </TableRow>
          );
        })}
      </Table>
    );
  };

  return (
    <div className={styles["set"]}>
      {isEditing ? (
        <UpdateSetForm
          set={set}
          onUpdate={onUpdateSet}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <h1>{set.name}</h1>
          <div>{set.description}</div>
          <Button
            className={styles["set__edit-btn"]}
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
          <Button
            className={styles["set__delete-btn"]}
            onClick={handleDeleteSet}
          >
            Delete
          </Button>
        </>
      )}

      <div>
        <Link to="/sets">Back to sets</Link>
      </div>

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
