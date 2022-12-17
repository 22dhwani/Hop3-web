import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

import styles from '../styles/RedeemModal.module.scss';

interface Props {
  show: boolean;
  toggleShow: (toSet?: string) => void;
}

const RedeemModal = ({ show, toggleShow }: Props) => {
  return (
    <>
      <div
        className={clsx(styles.overlay, show && styles.active)}
        onClick={() => toggleShow()}
      />
      <div className={clsx(styles.modal, show && styles.active)}>
        <Image
          className={styles.close}
          src="/vectors/icons/close.svg"
          width={28}
          height={28}
          alt="close"
          onClick={() => toggleShow()}
        />

        <div className={styles.body}>
          <h1 className={styles.title}>Redeem</h1>
        </div>
      </div>
    </>
  );
};

export default RedeemModal;
