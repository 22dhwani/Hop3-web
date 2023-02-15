import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import Posts from '../Posts/Posts';
import styles from '../../styles/Explore.module.scss';
import Image from 'next/image';
import ExploreCover from '../../public/images/explorecover2.png';
import Button from '../Button';

const Explore = () => {
  return (
    <MainLayout activeLink="/explore">
      {/* <TopBanner/> */}
      <div className={styles.explore}>
        <div className={styles.header}>
          <div
            className={`${styles.topbar} flex !flex-row overflow-x-scroll mb-4 gap-4`}>
            <Button variant="primary" className="!min-w-max !text-sm max-w-max">
              Featured
            </Button>
            <Button variant="grey" className="!min-w-max !text-sm max-w-max">
              Deals
            </Button>
            <Button variant="grey" className="!min-w-max !text-sm max-w-max">
              Fun & Leisure
            </Button>
            <Button variant="grey" className="!min-w-max !text-sm max-w-max">
              Tickets & Events
            </Button>
            <Button variant="grey" className="!min-w-max !text-sm max-w-max">
              Sightseeing & Tours
            </Button>
            <Button variant="grey" className="!min-w-max !text-sm max-w-max">
              NightLife
            </Button>
            <Button variant="grey" className="!min-w-max !text-sm max-w-max">
              Foods & Drinks
            </Button>
          </div>
          <Image src={ExploreCover} alt={''} className={styles.logocover} />
        </div>
        <Posts />
      </div>
    </MainLayout>
  );
};

export default Explore;
