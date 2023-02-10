import React from 'react';

import styles from '../../styles/InputLabel.module.scss';

interface Props {
  id: string;
  label: string;
  required?: boolean;
  className?: string;
}

const InputLabel = ({ id, label, required, className }: Props) => {
  return (
    <label className={` ${className} ${styles.label} `} htmlFor={id}>
      {label}
      {required && <span className="text-red">*</span>}
    </label>
  );
};

export default InputLabel;
