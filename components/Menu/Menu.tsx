/* eslint-disable prettier/prettier */
import clsx from 'clsx';
import styles from '../../styles/Menu.module.scss';

interface Option {
  label: string;
  required?: boolean;
  id: string;
  icon?: JSX.Element | null;
}

interface Meun {
  data: Option[];
  selectedItem: string;
  title?: string;
  action?: (...args: Array<any>) => void;
  isActive?: boolean;
  className?: string;
}

interface MenuItem {
  id: string;
  label: string;
  name?: string;
  required?: boolean;
  selectedItem: string;
  action?: (...args: Array<any>) => void;
  icon?: JSX.Element | null;
  data?: Option[];
  className?: string;
}

const Menu = ({
  data,
  title,
  selectedItem,
  action,
  isActive,
  className,
}: Meun) => {
  return (
    <div
      className={`${clsx(
        styles.container,
        isActive && styles.active,
      )} ${className}`}>
      <div className={styles.title}>{title}</div>{' '}
      {data.map((item, idx) => {
        return (
          <MenuItem
            id={item.id}
            label={item.label}
            required={item.required}
            data={data}
            key={idx}
            icon={item.icon}
            action={action}
            selectedItem={selectedItem}
          />
        );
      })}
    </div>
  );
};

const MenuItem = ({
  id,
  label,
  required,
  data,
  icon,
  action,
  selectedItem,
  className,
}: MenuItem) => {
  return (
    <div
      className={`${clsx(
        styles.item,
        selectedItem === id && styles.selected,
      )} ${className}`}
      id={id}
      onClick={e => {
        if (action) {
          action(e, id);
        }
      }}>
      <div>{icon}</div>
      <span className={styles.text}>{label}</span>
    </div>
  );
};
export default Menu;
