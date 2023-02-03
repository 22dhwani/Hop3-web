/* eslint-disable prettier/prettier */
import clsx from 'clsx';

import styles from '../../styles/Input.module.scss';
import InputLabel from '../InputLabel';

interface Props {
  className?: string;
  id: string;
  label: string;
  required?: boolean;
  textarea?: boolean;
  errorText?: string;
  [x: string]: any;
}

const Input = ({
  required,
  className,
  label,
  id,
  textarea,
  errorText,
  ...rest
}: Props) => {
  return (
    <div className={clsx(styles.inputControl, styles.className)}>
      <InputLabel id={id} required={required} label={label} />
      {textarea ? (
        <textarea id={id} {...rest} />
      ) : (
        <input id={id} className={className} {...rest} />
      )}
      {errorText && <p className={styles.errorText}>{errorText}</p>}
    </div>
  );
};

export default Input;
