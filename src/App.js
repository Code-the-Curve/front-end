import React, { useState, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import SideBar from './components/molecules/SideBar';
import Content from './components/pages/Content';
import LoadingPage from './components/pages/LoadingPage';
import './App.css';

const App = () => {
  const [isOpen, setOpen] = useState(true);
  const toggle = () => setOpen(!isOpen);

  return (
    <BrowserRouter>
      <div className="App wrapper">
        <Suspense loader={<LoadingPage />}>
          <SideBar toggle={toggle} isOpen={isOpen} />
          <Content toggle={toggle} isOpen={isOpen} />
        </Suspense>
      </div>
    </BrowserRouter>
  );
};

export default hot(module)(App);
