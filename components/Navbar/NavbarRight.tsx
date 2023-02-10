import React, { useCallback } from 'react';
import Image from 'next/image';

import Button from '../../components/Button';
import styles from '../../styles/NavbarRight.module.scss';
import { useUserStore } from '../../store/userStore';
import { router } from 'next/client';
import { useRouter } from 'next/router';

interface Props {
  withoutShareExpBtn?: boolean;
}

const NavbarRight = ({ withoutShareExpBtn }: Props) => {
  const { userDetails } = useUserStore();
  const router = useRouter();
  const onPressProfile = useCallback(() => {
    console.log('router path name', router.pathname);
    if (router.pathname !== '/settings/account-settings') {
      router.push('settings/account-settings');
    }
  }, [router]);

  return (
    <div className={styles.right}>
      {!withoutShareExpBtn && (
        <div className={styles.rightmain}>
          <Button variant="dark-outlined" href="/share-experience">
            Share Experience
          </Button>
          <Button variant="primary" href="">
            <Image src="/vectors/icons/h.svg" width={14} height={14} alt="h" />
            1200
          </Button>
        </div>
      )}
      <Image
        src={userDetails?.image || '/images/user.png'}
        width={46}
        height={46}
        alt="logo"
        className={styles.profileimg}
        onClick={onPressProfile}
      />
    </div>
  );
};

export default NavbarRight;
