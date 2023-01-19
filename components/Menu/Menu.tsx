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
  title?: string;
}

interface MenuItem {
  id: string;
  label: string;
  name?: string;
  required?: boolean;
  icon?: JSX.Element | null;
  data?: Option[];
}

const Menu = ({ data, title }: Meun) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      {data.map((item, idx) => {
        return (
          <MenuItem
            id={item.id}
            label={item.label}
            required={item.required}
            data={data}
            key={idx}
            icon={item.icon}
          />
        );
      })}
    </div>
  );
};

const MenuItem = ({ id, label, required, data, icon }: MenuItem) => {
  return (
    <div className={styles.item}>
      <div>{icon}</div>
      <span>{label}</span>
    </div>
  );
};
export default Menu;
