import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import Posts from '../Posts/Posts';
import styles from '../../styles/Explore.module.scss';
import Image from 'next/image';
import ExploreCover from '../../public/images/explorecover2.png';

const Explore = () => {
  return (
    <MainLayout activeLink="/explore">
      {/* <TopBanner/> */}
      <div className={styles.explore}>
        <div className={styles.header}>
          <Image src={ExploreCover} alt={''} className={styles.logocover} />
        </div>
        <Posts />
      </div>
    </MainLayout>
  );
};

export default Explore;
