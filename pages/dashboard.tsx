import React from 'react';
import Dashboard from '../components/Dashboard/Dashboard';
// import Sidebar from '../components/Sidebar/Sidebar';
import MainLayout from '../layouts/MainLayout';

export default function CreatorStudio() {
  return (
    <MainLayout activeLink="/dashboard">
      <Dashboard />
    </MainLayout>
  );
}
