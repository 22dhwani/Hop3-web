import React from 'react';
import styles from '../../styles/Exceptions.module.scss';

interface Props {
  id: string;
  label: string;
}

interface EmptyStateProps {
  message: string;
}
export const ErrorLabel = ({ id, label }: Props) => {
  return (
    <label className={styles.errorLabel} htmlFor={id}>
      {label}
    </label>
  );
};

export const EmptyState = (props: EmptyStateProps) => {
  const { message } = props;

  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyState__content}>{message}</div>
    </div>
  );
};
