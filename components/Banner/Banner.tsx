import clsx from 'clsx';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '../../styles/Button.module.scss';

interface Props {
  variant: 'static' | 'slider';
  //   lg?: boolean;
  //   className?: string;
  //   children: React.ReactNode;
  //   disabled?: boolean;
  //   href?: string;
  //   [x: string]: any;
}
export const Banner = (props: Props) => {
  return (
    <div className={styles.banner}>
      <Image
        src="/uc?export=view&id=11eCNzMI0bkqnQVePpMa3xDe3iPAnNYAW"
        alt="banner"
        width={1920}
        height={1080}
      />
    </div>
  );
};
