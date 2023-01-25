import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/Sidebar.module.scss';
import Logo from '../../public/images/Logo.svg';
import { Router, useRouter } from 'next/router';
import clsx from 'clsx';
import {
  Hop3Icon,
  SidebarExploreIcon,
  ArrowRedirectIcon,
} from '../Icons/Icons';
import Menu from '../Menu/Menu';
import Hamburger from '../Hamburger';

export default function Sidebar(props: any) {
  const { toggleSidebar, isSideBarActive } = props;
  const menu_data = [
    { label: 'Explore', id: 'explore', icon: <SidebarExploreIcon /> },
    { label: 'hop3 Shop', id: 'shop', icon: <SidebarExploreIcon /> },
  ];

  const menu_category_data = [
    { label: 'Featured', id: 'featured', icon: <SidebarExploreIcon /> },
    { label: 'Deals', id: 'deals', icon: <SidebarExploreIcon /> },
    { label: 'Fun & Leisure', id: 'fun&leisure', icon: <SidebarExploreIcon /> },
    {
      label: 'Tickets & Events',
      id: 'tickets&events',
      icon: <SidebarExploreIcon />,
    },
    {
      label: 'Sightseeing & Tours',
      id: 'sightseeing&tours',
      icon: <SidebarExploreIcon />,
    },
    { label: 'Nightlife', id: 'nightlife', icon: <SidebarExploreIcon /> },
    { label: 'Food & Drink', id: 'food&drink', icon: <SidebarExploreIcon /> },
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
        <p className={styles.invite}>Invite friends and earn 100</p>
        <div className={styles.help}>
          <p>Need some help?</p>
          <ArrowRedirectIcon />
        </div>
      </div>
    </div>
  );
}
