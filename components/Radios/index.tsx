import clsx from 'clsx';
import styles from '../../styles/Radios.module.scss';
import InputLabel from '../InputLabel';

interface Option {
  label: string;
}

interface Props {
  id: string;
  label: string;
  required?: boolean;
  data: Option[];
}

const Radios = ({ id, label, required, data }: Props) => {
  return (
    <div className={styles.radios}>
      <InputLabel id={id} label={label} required={required} />

      <div className={styles.options}>
        {data.map((el, idx) => {
          return (
            <div key={'radio-options' + idx} className={clsx(styles.option)}>
              <label className={styles.container}>
                {el.label}
                <input type="radio" name={id} value={el.label} />
                <span className={styles.checkmark}></span>
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Radios;
