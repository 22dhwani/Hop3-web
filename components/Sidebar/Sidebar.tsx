import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/Sidebar.module.scss';
import Logo from '../../public/images/Logo.svg';
import { Router, useRouter } from 'next/router';
import clsx from 'clsx';
import {
  DealIcon,
  EventsIcon,
  FeaturedIcon,
  FoodsIcon,
  Hop3Icon,
  ShopIcon,
  SidebarExploreIcon,
} from '../Icons/Icons';
import Menu from '../Menu/Menu';
import Hamburger from '../Hamburger';

export default function Sidebar(props: any) {
  const { toggleSidebar, isSideBarActive } = props;
  const menu_data = [
    { label: 'Explore', id: 'explore', icon: <SidebarExploreIcon /> },
    { label: 'hop3 Shop', id: 'shop', icon: <ShopIcon /> },
  ];

  const menu_category_data = [
    { label: 'Featured', id: 'featured', icon: <FeaturedIcon /> },
    { label: 'Deals', id: 'deals', icon: <DealIcon /> },
    { label: 'Fun & Leisure', id: 'fun&leisure', icon: <EventsIcon /> },
    {
      label: 'Tickets & Events',
      id: 'tickets&events',
      icon: <FoodsIcon />,
    },
    {
      label: 'Sightseeing & Tours',
      id: 'sightseeing&tours',
      icon: <FeaturedIcon />,
    },
    { label: 'Nightlife', id: 'nightlife', icon: <FoodsIcon /> },
    { label: 'Food & Drink', id: 'food&drink', icon: <FeaturedIcon /> },
  ];

  const route = useRouter();
  const [activeMenu, setActiveMenu] = useState('explore');

  const handleMenuClick = (e: any, id: string) => {
    e.preventDefault();

    setActiveMenu(id);
  };

  return (
    <div className={clsx(styles.container, isSideBarActive && styles.active)}>
      <div className={styles.logo}>
        {isSideBarActive ? (
          <>
            <Image src={Logo} alt={''} />{' '}
            <Hamburger breakpoint={992} onClick={toggleSidebar} />
          </>
        ) : (
          <>
            <Hamburger breakpoint={992} onClick={toggleSidebar} />
          </>
        )}
      </div>
      <Menu
        data={menu_data}
        selectedItem={activeMenu}
        action={handleMenuClick}
        key={'menu' + 1}
        isActive={isSideBarActive}
      />
      <Menu
        title={'Categories'}
        data={menu_category_data}
        action={handleMenuClick}
        selectedItem={activeMenu}
        key={'menu' + 2}
        isActive={isSideBarActive}
      />
      <div className={styles.textwrapper}>
        <span className={styles.invite}>Invite friends and earn 100</span>
        <p className={styles.help}>Need some help?</p>
      </div>
    </div>
  );
}
