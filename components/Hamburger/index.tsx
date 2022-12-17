import clsx from 'clsx';
import styles from '../../styles/Hamburger.module.scss';

interface Props {
  breakpoint?: number;
  [x: string]: any;
}

const Hamburger = ({ breakpoint, ...rest }: Props) => {
  return (
    <div
      className={clsx(styles.hamburger, breakpoint === 992 && styles.lg)}
      {...rest}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Hamburger;
