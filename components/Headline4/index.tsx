import clsx from 'clsx';

import styles from '../../styles/Headline4.module.scss';

interface Props {
  text: string;
  color?: string;
  className?: string;
}

const Headline4 = ({ text, color, className }: Props) => {
  return (
    <div
      className={clsx(styles.headline4, className, color && { color: color })}>
      {text}
    </div>
  );
};

export default Headline4;
