import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import Button from '../components/Button';
import NavbarRight from '../components/Navbar/NavbarRight';
import Hamburger from '../components/Hamburger';

import styles from '../styles/MainLayout.module.scss';
import { useState } from 'react';
import Overlay from '../components/Overlay';

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

  const openDrawer = () => {
    setIsSideBarActive(true);
  };

  const closeDrawer = () => {
    setIsSideBarActive(false);
  };

  return (
    <>
      <Overlay isSideBarActive={isSideBarActive} closeDrawer={closeDrawer} />

      <div className={styles.mainLayout}>
        <div className={clsx(styles.sideBar, isSideBarActive && styles.active)}>
          <Image
            className={styles.close}
            src="/vectors/icons/close.svg"
            alt="close"
            width={20}
            height={20}
            onClick={closeDrawer}
          />
          <div>
            <Link className={styles.logo} href="/">
              <Image
                src="/vectors/logo.svg"
                width={128}
                height={50}
                alt="logo"
              />
            </Link>

            <div className={styles.nav}>
              {navLinks.map((el, idx) => {
                return (
                  <Link
                    href={el.href}
                    className={clsx(
                      styles.navLink,
                      activeLink === el.href && styles.active,
                    )}
                    key={'nav-link' + idx}>
                    <Image width={30} height={30} alt={el.text} src={el.img} />
                    <div className={styles.text}>{el.text}</div>
                  </Link>
                );
              })}

              <div className={styles.btnContainer}>
                <Button variant="green" href="/share-experience">
                  Share Experience
                </Button>
              </div>
            </div>
          </div>

          <div className={styles.spaced}>
            <div className={styles.invite}>
              Invite friends and earn
              <Image
                src="/vectors/icons/h.svg"
                width={12}
                height={12}
                alt="h"
              />{' '}
              100
            </div>

            <div className="fs-18 mt-10">Need some help?</div>
          </div>
        </div>

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
              />
            </Link>
            <Hamburger breakpoint={992} onClick={openDrawer} />
          </div>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
