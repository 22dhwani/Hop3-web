import clsx from "clsx";

import styles from "../../styles/Overlay.module.scss";

interface Props {
  closeDrawer: () => void;
  isSideBarActive: boolean;
}

const Overlay = ({ closeDrawer, isSideBarActive }: Props) => {
  return (
    <div
      className={clsx(styles.overlay, isSideBarActive && styles.active)}
      onClick={closeDrawer}
    />
  );
};

export default Overlay;
