import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './P-Sidebar';
import Header from './P-Header';
import '../styles/P-Layout.css';

const Layout = () => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="content-container">
        <Header />
        <main className="main-content">
          <Outlet /> {/* This will render the current page content */}
        </main>
      </div>
    </div>
  );
};

export default Layout;
