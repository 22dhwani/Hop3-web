import React from 'react';
import Posts from '../components/Posts/Posts';
import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';
export default function dashboard() {
  return (
    <div>
      <Sidebar />
      <Header />
      {/* <TopBanner/> */}
      <Posts />
    </div>
  );
}
