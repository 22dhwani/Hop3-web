import clsx from "clsx";

import styles from "../../styles/Input.module.scss";
import InputLabel from "../InputLabel";
import ErrorLabel from "../ErrorLabel";

interface Props {
  className?: string;
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  textarea?: boolean;
  [x: string]: any;
}

const Input = ({
  required,
  className,
  label,
  id,
  textarea,
  error,
  ...rest
}: Props) => {
  return (
    <div className={clsx(styles.inputControl, styles.className)}>
      <InputLabel id={id} required={required} label={label} />
      {textarea ? <textarea id={id} {...rest} /> : <input id={id} {...rest} />}
      {error && <ErrorLabel id={id} label={error} /> }
    </div>
  );
};

export default Input;
