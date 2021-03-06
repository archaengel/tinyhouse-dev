import React, { useState, useEffect } from 'react';
import { Input, Layout } from 'antd';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { MenuItems } from './components';
import { Viewer } from '../../lib/types';
import { displayErrorMessage } from '../../lib/utils';

import logo from './assets/tinyhouse-logo.png';

const { Header } = Layout;
const { Search } = Input;

interface Props {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

export const AppHeader = ({ viewer, setViewer }: Props) => {
  const history = useHistory();
  const location = useLocation();
  const [search, setSearch] = useState('');

  useEffect(() => {
    const { pathname } = location;
    const pathnameSubStrings = pathname.split('/');

    if (!pathname.includes('/listings')) {
      setSearch('');
      return;
    }

    if (pathname.includes('/listings') && pathnameSubStrings.length === 3) {
      setSearch(pathnameSubStrings[2]);
      return;
    }
  }, [location]);

  const onSearch = (value: string) => {
    const trimmedValue = value.trim();

    if (trimmedValue) {
      return history.push(`/listings/${trimmedValue}`);
    }

    return displayErrorMessage('Please enter a valid search!');
  };

  return (
    <Header className="app-header">
      <div className="app-header__logo-search-section">
        <div className="app-header__logo">
          <Link to="/">
            <img src={logo} alt="App logo" />
          </Link>
        </div>
        <div className="app-header__search-input">
          <Search
            placeholder="Search 'San Francisco'"
            enterButton
            onChange={(evt) => setSearch(evt.target.value)}
            value={search}
            onSearch={onSearch}
          />
        </div>
      </div>
      <div className="app-header__menu-section">
        <MenuItems viewer={viewer} setViewer={setViewer} />
      </div>
    </Header>
  );
};
