import React from 'react';
import classes from '../../styles/HeaderProfileNotification.module.scss';
import CircularProgess from '../CircularProgess';
import MoneyIcon from '../../public/images/Money.svg';
import Image from 'next/image';
import { useUserStore } from '../../store/userStore';

const HeaderProfileNotification = () => {
  const { userDetails } = useUserStore();
  return (
    <div className={classes.headerNotificationContainer}>
      {!userDetails?.is_profile_complete ? (
        <p className={classes.headerNotificationTitle}>
          {`Earn `}
          <Image src={MoneyIcon} alt={'money sign'} height={12} width={12} />
          <b> 200</b> by completing your account settings
        </p>
      ) : (
        <p className={classes.headerNotificationTitle}>
          {`You've earn `}
          <Image src={MoneyIcon} alt={'money sign'} height={12} width={12} />
          <b> 200</b>
        </p>
      )}

      <CircularProgess value={userDetails?.is_profile_complete ? 100 : 75} />
      <p className={classes.headerNotificationPercentage}>
        {userDetails?.is_profile_complete ? '100%' : '75%'}
      </p>
    </div>
  );
};

export default HeaderProfileNotification;
