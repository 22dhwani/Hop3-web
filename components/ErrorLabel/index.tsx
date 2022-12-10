import React from 'react';
import styles from '../../styles/ErrorLabel.module.scss';

interface Props {
  id: string;
  label: string;
}

const ErrorLabel = ({ id, label }: Props) => {
  return (
    <label className={styles.errorLabel} htmlFor={id}>
      {label}
    </label>
  );
};

export default ErrorLabel;
