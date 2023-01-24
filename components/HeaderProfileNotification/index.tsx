import React from 'react';
import classes from '../../styles/HeaderProfileNotification.module.scss';
import CircularProgess from '../CircularProgess';
import MoneyIcon from '../../public/images/Money.svg';
import Image from 'next/image';

const HeaderProfileNotification = () => {
  return (
    <div className={classes.headerNotificationContainer}>
      <p className={classes.headerNotificationTitle}>
        Earn <Image src={MoneyIcon} alt={'money sign'} height={12} width={12} />
        <b> 200</b> by completing your account settings
      </p>
      <CircularProgess value={75} />
      <p className={classes.headerNotificationPercentage}>75%</p>
    </div>
  );
};

export default HeaderProfileNotification;
