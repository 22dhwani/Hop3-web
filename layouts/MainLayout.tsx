import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import Button from '../components/Button';
import NavbarRight from '../components/Navbar/NavbarRight';
import Hamburger from '../components/Hamburger';

import styles from '../styles/MainLayout.module.scss';
import { useState } from 'react';
import Overlay from '../components/Overlay';
import Sidebar from '../components/Sidebar/Sidebar';

interface Props {
  activeLink: string;
  children: React.ReactNode;
}

const navLinks = [
  { href: '/explore', img: '/vectors/icons/explore.svg', text: 'Explore' },
  { href: '/shop', img: '/vectors/icons/shop.svg', text: 'hop3 Shop' },
  { href: '/explore', img: '/vectors/icons/user.svg', text: 'Creator Studio' },
];

const MainLayout = ({ activeLink, children }: Props) => {
  const [isSideBarActive, setIsSideBarActive] = useState(false);

  const toggleDrawer = () => {
    setIsSideBarActive(!isSideBarActive);
  };
  return (
    <>
      {/* <Overlay isSideBarActive={isSideBarActive} closeDrawer={closeDrawer} /> */}

      <div className={styles.mainLayout}>
        <Sidebar
          toggleSidebar={toggleDrawer}
          isSideBarActive={isSideBarActive}
        />

        <div className={styles.mainContent}>
          <div className={styles.nav}>
            <NavbarRight />
          </div>
          <div className={styles.navMin}>
            <Link className={styles.logo} href="/">
              <Image
                src="/vectors/logo.svg"
                width={128}
                height={50}
                alt="logo"
                className={styles.logoimage}
              />
            </Link>
          </div>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
