import Image from 'next/image';
import Link from 'next/link';

import styles from '../../styles/Navbar.module.scss';
import Hamburger from '../Hamburger';
import NavbarRight from './NavbarRight';

interface Props {
  openDrawer?: () => void;
  withoutShareExpBtn?: boolean;
}

const Navbar = ({ withoutShareExpBtn, openDrawer }: Props) => {
  return (
    <div className={styles.navbar}>
      <div className={styles.navbarMain}>
        <Link href="/" className={styles.left}>
          <Image src="/vectors/logo.svg" width={128} height={50} alt="logo" />
        </Link>
        <NavbarRight withoutShareExpBtn={withoutShareExpBtn} />
        <Hamburger onClick={openDrawer} />
      </div>
    </div>
  );
};

export default Navbar;
