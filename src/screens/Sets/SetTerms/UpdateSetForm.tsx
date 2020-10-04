import React, { useState, FunctionComponent } from "react";
import { Set } from "data/entities";
import { ReactComponent as TickIcon } from "assets/icons/tick.svg";
import { ReactComponent as CancelIcon } from "assets/icons/cancel.svg";

import styles from "./UpdateSetForm.module.scss";

type Props = {
  set: Set;
  onUpdate: (values: FormValues) => void;
  onCancel: () => void;
};

type FormValues = {
  name: string;
  description: string;
};

const UpdateSet: FunctionComponent<Props> = ({ set, onUpdate, onCancel }) => {
  const [values, setValues] = useState<FormValues>({
    name: set.name || "",
    description: set.description || "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onUpdate(values);
  };

  return (
    <div className={styles["update-set"]}>
      <div className={styles["update-set__input"]}>
        <input
          type="text"
          name="name"
          value={values.name}
          required
          placeholder="Title"
          onChange={handleInputChange}
        />
      </div>
      <div className={styles["update-set__input"]}>
        <input
          type="text"
          name="description"
          value={values.description}
          required
          placeholder="description"
          onChange={handleInputChange}
        />
      </div>
      <div className={styles["update-set__controls"]}>
        <TickIcon
          onClick={handleSubmit}
          className={styles["update-set__controls-item"]}
        />
        <CancelIcon
          onClick={onCancel}
          className={styles["update-set__controls-item"]}
        />
      </div>
    </div>
  );
};

export default UpdateSet;
