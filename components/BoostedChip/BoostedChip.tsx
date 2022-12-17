import React from 'react';
import styles from '../../styles/BoostedChip.module.scss';
import Image from 'next/image';
import bolt from '../../public/images/bolt-rounded.svg';

const BoostedChip = () => {
  return (
    <div className={styles.boostedChip}>
      <div className={styles.boostedChipWrapper}>
        <Image src={bolt} className={styles.boostedChipImage} alt={''} />
        <p className={styles.boostedChipTitle}>{'Boosted'}</p>
      </div>
    </div>
  );
};
export default BoostedChip;
