import React from 'react';
import Image from 'next/image';

import Button from '../../components/Button';
import styles from '../../styles/NavbarRight.module.scss';

interface Props {
  withoutShareExpBtn?: boolean;
}

const NavbarRight = ({ withoutShareExpBtn }: Props) => {
  return (
    <div className={styles.right}>
      {!withoutShareExpBtn && (
        <Button variant="dark-outlined" href="/share-experience">
          Share Experience
        </Button>
      )}
      <Image src="/images/user.png" width={46} height={46} alt="logo" />
    </div>
  );
};

export default NavbarRight;
