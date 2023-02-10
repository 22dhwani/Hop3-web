import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/Sidebar.module.scss';
import Logo from '../../public/images/Logo.svg';
import { Router, useRouter } from 'next/router';
import clsx from 'clsx';
import {
  AddIcon,
  DealIcon,
  EventsIcon,
  FeaturedIcon,
  FoodsIcon,
  GlobeIcon,
  Hop3Icon,
  ShopIcon,
  SidebarExploreIcon,
} from '../Icons/Icons';
import Menu from '../Menu/Menu';
import Hamburger from '../Hamburger';
import Button from '../Button';

export default function Sidebar(props: any) {
  const { toggleSidebar, isSideBarActive } = props;
  const menu_data = [
    { label: 'Explore', id: 'explore', icon: <SidebarExploreIcon /> },
    { label: 'hop3 Shop', id: 'shop', icon: <ShopIcon /> },
  ];
  const mobile_data = [{ label: 'Globe', id: 'globe', icon: <GlobeIcon /> }];

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
      <div className={styles.menulist}>
        {/* for both mobile and laptop */}
        <Menu
          data={menu_data}
          selectedItem={activeMenu}
          action={handleMenuClick}
          key={'menu' + 1}
          isActive={isSideBarActive}
        />
        {/* for both mobile and  */}
        <Button variant="primary" className={styles.add}>
          <AddIcon />
        </Button>
        <Menu
          className={styles.mobilebar}
          data={mobile_data}
          action={handleMenuClick}
          selectedItem={activeMenu}
          key={'menu' + 2}
          isActive={isSideBarActive}
        />
        <Button variant="grey" className={styles.balance}>
          <strong className="text-sm">
            <Image src="/vectors/icons/h.svg" width={14} height={14} alt="h" />
            1200
          </strong>
        </Button>
        {/* for both mobile and laptop */}
        <Menu
          className={styles.categories}
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
    </div>
  );
}
