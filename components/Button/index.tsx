import clsx from "clsx";
import { useRouter } from "next/router";

import styles from "../../styles/Button.module.scss";

interface Props {
  variant: "purple" | "grey" | "dark-outlined" | "green" | "dark";
  children: React.ReactNode;
  disabled?: boolean;
  href?: string;
  onClick?: (e:any) => void
  [x: string]: any;
}

const Button = ({
  variant,
  disabled,
  children,
  href,
  onClick,
  ...rest
}: Props) => {
  const { push } = useRouter();

  return (
    <button
      disabled={disabled}
      className={clsx(
        styles.btn,
        variant === "dark-outlined" && styles.darkOutlined,
        variant === "purple" && styles.purple,
        variant === "grey" && styles.grey,
        variant === "green" && styles.green,
        variant === "dark" && styles.dark
      )}
      {...rest}
      onClick={(e) => {
        if (onClick) onClick(e);
        if (href) push(href);
      }}
    >
      {children}
    </button>
  );
};

export default Button;
