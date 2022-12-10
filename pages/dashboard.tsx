import React from 'react';
import Dashboard from '../components/Dashboard/Dashboard';
import Sidebar from '../components/Sidebar/Sidebar';

export default function dashboard() {
  return (
    <div>
      <Sidebar />
      <Dashboard />
    </div>
  );
}
