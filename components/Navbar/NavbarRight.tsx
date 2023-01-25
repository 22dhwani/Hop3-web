import React from 'react';
import Image from 'next/image';

import Button from '../../components/Button';
import styles from '../../styles/NavbarRight.module.scss';
import { useUserStore } from '../../store/userStore';

interface Props {
  withoutShareExpBtn?: boolean;
}

const NavbarRight = ({ withoutShareExpBtn }: Props) => {
  const { userDetails } = useUserStore();
  return (
    <div className={styles.right}>
      {!withoutShareExpBtn && (
        <Button variant="dark-outlined" href="/share-experience">
          Share Experience
        </Button>
      )}
      <Image
        src={userDetails?.image || '/images/user.png'}
        width={46}
        height={46}
        alt="logo"
        className={styles.profileimg}
      />
    </div>
  );
};

export default NavbarRight;
