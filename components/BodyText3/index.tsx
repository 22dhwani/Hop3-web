import clsx from 'clsx';

import styles from '../../styles/BodyText3.module.scss';

interface Props {
  text: string;
  color?: string;
  className?: string;
}

const BodyText3 = ({ text, color, className }: Props) => {
  return (
    <div
      className={clsx(styles.bodyText3, className, color && { color: color })}>
      {text}
    </div>
  );
};

export default BodyText3;
