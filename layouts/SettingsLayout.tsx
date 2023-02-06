/* eslint-disable prettier/prettier */
import { useCallback, useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Button from '../components/Button';
import Navbar from '../components/Navbar';
import Overlay from '../components/Overlay';
import styles from '../styles/SettingsLayout.module.scss';
import { FIREBASE_AUTH } from '../components/firebase';

const navItems = [
  { label: 'Account Settings', href: '/settings/account-settings' },
  { label: 'Wallets', href: '/wallets' },
  { label: 'Contact Us', href: '/user-settings/contact-us' },
  { label: 'Terms of Service', href: '/user-settings/tos' },
  { label: 'Privacy Policy', href: '/user-settings/privacy-policy' },
];

interface Props {
  className?: string;
  activeLink: string;
  children: React.ReactNode;
}

const SettingsLayout = ({ className, activeLink, children }: Props) => {
  const { back, replace } = useRouter();

  const [isSideBarActive, setIsSideBarActive] = useState(false);

  const onPressLogout = useCallback(async () => {
    try {
      await FIREBASE_AUTH.signOut();
    } catch (e) {
      console.log('Error in logout', e);
      await replace('/login');
    }
  }, [replace]);

  const openDrawer = () => {
    setIsSideBarActive(true);
  };

  const closeDrawer = () => {
    setIsSideBarActive(false);
  };

  const onPressBack = useCallback(() => {
    back();
  }, [back]);

  return (
    <>
      <Overlay isSideBarActive={isSideBarActive} closeDrawer={closeDrawer} />
      <Navbar openDrawer={openDrawer} />

      <div className={styles.mainContentWrap}>
        <div className={styles.mainContent}>
          <div className={styles.userSettings}>
            <div className={styles.topBar}>
              <div className={styles.back} onClick={onPressBack}>
                <Image
                  src="/vectors/icons/back.svg"
                  width={30}
                  height={30}
                  alt="back"
                />
                Back
              </div>
            </div>

            <div className={styles.settingsMain}>
              <div
                className={clsx(styles.nav, isSideBarActive && styles.active)}>
                <Image
                  className={styles.close}
                  src="/vectors/icons/close.svg"
                  alt="close"
                  width={20}
                  height={20}
                  onClick={closeDrawer}
                />

                {navItems.map((el, idx) => (
                  <Link
                    href={el.href}
                    className={clsx(
                      styles.navItem,
                      el.href === activeLink && styles.active,
                    )}
                    key={'nav-item' + idx}>
                    {el.label}
                  </Link>
                ))}

                <Button variant="dark-outlined" onClick={onPressLogout}>
                  Log out
                </Button>

                <div className={styles.shareExpBtn}>
                  <Button href="/share-experience" variant="dark-outlined">
                    Share Experience
                  </Button>
                </div>
              </div>
              <div className={clsx(styles.content, className)}>{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsLayout;
