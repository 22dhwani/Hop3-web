import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/Sidebar.module.scss';
import Logo from '../../public/images/Logo.svg';
import Earth from '../../public/images/Earth.svg';
import Shop from '../../public/images/Shop.svg';
import User from '../../public/images/User.svg';
import EarthBlack from '../../public/images/EarthBlack.svg';
import ShopBlack from '../../public/images/ShopBlack.svg';
import UserBlack from '../../public/images/UserBlack.svg';
import UpArrow from '../../public/images/UpArrow.svg';
import { useRouter } from 'next/router';
import clsx from 'clsx';

export default function Sidebar() {
  const route = useRouter();
  const [isActive, setIsActive] = useState({
    explore: false,
    shop: false,
    creator: false,
  });
  const [isHover, setIsHover] = useState({
    explore: false,
    shop: false,
    creator: false,
  });
  useEffect(() => {
    if (route?.pathname?.includes('creator')) {
      handleChangActive('creator', true);
    } else if (route?.pathname?.includes('shop')) {
      handleChangActive('shop', true);
    }
  }, [route?.pathname]);
  const handleChangeHover = (key: string, val: boolean) => {
    setIsHover(previousIsHover => {
      return {
        ...previousIsHover,

        [key]: val,
      };
    });
  };
  const handleChangActive = (key: string, val: boolean) => {
    setIsActive(previousIsHover => {
      return {
        ...previousIsHover,

        [key]: val,
      };
    });
  };

  const { creator, explore, shop } = isHover;
  return (
    <div className={styles.sidebar}>
      <div className={styles.container}>
        <Image src={Logo} alt={''} />
        <div>
          <ul className={styles.menu}>
            <li
              onMouseOut={() => {
                handleChangeHover('explore', false);
              }}
              onMouseOver={() => {
                handleChangeHover('explore', true);
              }}
              className={clsx(styles.item, {
                [styles.isActive]: isActive.explore,
              })}>
              {' '}
              <Image
                className={styles.icon}
                src={explore ? EarthBlack : Earth}
                alt={''}
              />{' '}
              <p className={styles.text}>Explore</p>{' '}
              {explore && (
                <Image className={styles.arowicon} src={UpArrow} alt={''} />
              )}{' '}
            </li>
            <li
              onClick={() => route.push('/shop')}
              onMouseOut={() => {
                handleChangeHover('shop', false);
              }}
              onMouseOver={() => {
                handleChangeHover('shop', true);
              }}
              className={clsx(styles.item, {
                [styles.isActive]: isActive.shop,
              })}>
              {' '}
              <Image
                className={styles.icon}
                src={shop ? ShopBlack : Shop}
                alt={''}
              />{' '}
              <p className={styles.text}>hop3 Shop</p>{' '}
              {shop && (
                <Image className={styles.arowicon} src={UpArrow} alt={''} />
              )}{' '}
            </li>
            <li
              onClick={() => route.push('/creator-studio')}
              onMouseOut={() => {
                handleChangeHover('creator', false);
              }}
              onMouseOver={() => {
                handleChangeHover('creator', true);
              }}
              className={clsx(styles.item, {
                [styles.isActive]: isActive.creator,
              })}>
              {' '}
              <Image
                className={styles.icon}
                src={creator ? UserBlack : User}
                alt={''}
              />{' '}
              <p className={styles.text}>Creator Studio</p>
              {creator && (
                <Image className={styles.arowicon} src={UpArrow} alt={''} />
              )}{' '}
            </li>
          </ul>
        </div>
        <div className={styles.buttonwrapper}>
          <button className={styles.menubutton}>Share Experience</button>
        </div>
        <div className={styles.textwrapper}>
          <span className={styles.invite}>Invite friends and earn 100</span>
          <p className={styles.help}>Need some help?</p>
        </div>
      </div>
    </div>
  );
}
