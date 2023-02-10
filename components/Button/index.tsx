import clsx from 'clsx';
import { useRouter } from 'next/router';

import styles from '../../styles/Button.module.scss';
import Loader from '../Loader/Loader';

interface Props {
  variant:
    | 'purple'
    | 'grey'
    | 'dark-outlined'
    | 'default'
    | 'dark'
    | 'underline-text'
    | 'primary'
    | 'transparent';
  lg?: boolean;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
  href?: string;
  [x: string]: any;
  isLoading?: boolean;
}

const Button = ({
  variant,
  lg,
  className,
  disabled,
  children,
  href,
  onClick,
  isLoading,
  ...rest
}: Props) => {
  const { push } = useRouter();

  return (
    <button
      disabled={disabled || isLoading}
      className={clsx(
        styles.btn,
        className,
        { [styles.lg]: lg },
        variant === 'dark-outlined' && styles.darkOutlined,
        variant === 'purple' && styles.purple,
        variant === 'grey' && styles.grey,
        variant === 'default' && styles.default,
        variant === 'dark' && styles.dark,
        variant === 'underline-text' && styles.underlineText,
        variant === 'primary' && styles.primary,
        variant === 'transparent' && styles.transparent,
        disabled && styles.grey,
      )}
      {...rest}
      onClick={e => {
        if (onClick) {
          onClick(e);
        }
        if (href) {
          push(href);
        }
      }}>
      {isLoading ? <Loader /> : children}
    </button>
  );
};

export default Button;
