import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/Sidebar.module.scss';
import Logo from '../../public/images/Logo.svg';
import { Router, useRouter } from 'next/router';
import clsx from 'clsx';
import { SidebarExploreIcon } from '../Icons/Icons';
import Menu from '../Menu/Menu';

export default function Sidebar() {
  const menu_data = [
    { label: 'Explore', id: 'explore', icon: <SidebarExploreIcon /> },
    { label: 'hop3 Shop', id: 'shop' },
  ];

  const menu_category_data = [
    { label: 'Featured', id: 'featured' },
    { label: 'Deals', id: 'deals' },
    { label: 'Fun & Leisure', id: 'fun&leisure' },
    { label: 'Tickets & Events', id: 'tickets&events' },
    { label: 'Sightseeing & Tours', id: 'sightseeing&tours' },
    { label: 'Nightlife', id: 'nightlife' },
    { label: 'Food & Drink', id: 'food&drink' },
  ];

  const route = useRouter();
  const [activeMenu, setActiveMenu] = useState('explore');

  const handleMenuClick = (e: any, id: string) => {
    e.preventDefault();

    setActiveMenu(id);
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image src={Logo} alt={''} />
      </div>
      <Menu
        data={menu_data}
        selectedItem={activeMenu}
        action={handleMenuClick}
        key={'menu' + 1}
      />
      <Menu
        title={'Categories'}
        data={menu_category_data}
        action={handleMenuClick}
        selectedItem={activeMenu}
        key={'menu' + 2}
      />
      <div className={styles.textwrapper}>
        <span className={styles.invite}>Invite friends and earn 100</span>
        <p className={styles.help}>Need some help?</p>
      </div>
    </div>
  );
}
