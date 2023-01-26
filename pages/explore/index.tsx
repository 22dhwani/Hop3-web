import React from 'react';
import Posts from '../../components/Posts/Posts';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import MainLayout from '../../layouts/MainLayout';
export default function Explore() {
  return (
    <div>
      <MainLayout activeLink="/explore">
        {/* <TopBanner/> */}
        <Posts />
      </MainLayout>
    </div>
  );
}
