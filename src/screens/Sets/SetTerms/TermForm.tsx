import React, { useState, FunctionComponent } from "react";
import { v4 } from "uuid";
import { ReactComponent as TickIcon } from "assets/icons/tick.svg";
import { ReactComponent as CancelIcon } from "assets/icons/cancel.svg";
import { Term } from "data/entities";

import styles from "./TermForm.module.scss";

type Props = {
  term?: Term;
  onSubmit: (term: Term) => void;
  onCancel: () => void;
};

const TermForm: FunctionComponent<Props> = ({
  term = {},
  onSubmit,
  onCancel,
}) => {
  const [values, setValues] = useState<Term>({
    id: v4(),
    value: "",
    description: "",
    ...term,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onSubmit(values);
  };

  return (
    <div className={styles["add-term"]}>
      <div className={styles["add-term__input"]}>
        <input
          type="text"
          name="value"
          value={values.value}
          required
          placeholder="term"
          onChange={handleInputChange}
        />
      </div>
      <div className={styles["add-term__input"]}>
        <input
          type="text"
          name="description"
          value={values.description}
          required
          placeholder="description"
          onChange={handleInputChange}
        />
      </div>
      <div className={styles["add-term__controls"]}>
        <TickIcon
          onClick={handleSubmit}
          className={styles["add-term__controls-item"]}
        />
        <CancelIcon
          onClick={onCancel}
          className={styles["add-term__controls-item"]}
        />
      </div>
    </div>
  );
};

export default TermForm;
