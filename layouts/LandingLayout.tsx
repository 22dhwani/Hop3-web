import Link from 'next/link';
import Image from 'next/image';

import Button from '../components/Button';
import styles from '../styles/LandingLayout.module.scss';
import Section from '../components/Section';
import { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { FIREBASE_AUTH } from '../components/firebase';

interface Props {
  children: React.ReactNode;
}

const LandingLayout = ({ children }: Props) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const router = useRouter();

  const onPressLaunchApp = useCallback(async () => {
    if (FIREBASE_AUTH.currentUser) {
      await router.replace('/explore');
    } else {
      await router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    const handler = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handler);

    return () => {
      window.removeEventListener('scroll', handler);
    };
  }, []);

  return (
    <>
      <div className={styles.landingLayout}>
        <Section className={clsx(styles.navbar, isScrolled && styles.scrolled)}>
          <Link className={styles.logo} href="/">
            <Image
              className={styles.logo}
              src="/vectors/logo.svg"
              width={128}
              height={50}
              alt="logo"
            />
          </Link>
          <div className={styles.menu}>
            <Link href="https://doc.hop3.app/">How to earn</Link>
            <Button
              variant="dark-outlined"
              className={styles.btn}
              onClick={onPressLaunchApp}>
              Launch app{' '}
              <Image
                src="/vectors/icons/beta.svg"
                alt="beta"
                width={36}
                height={18}
              />
            </Button>
          </div>
        </Section>
        <div className={styles.mainContent}>{children}</div>
      </div>
    </>
  );
};

export default LandingLayout;
