import Button from './Button';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import React from 'react';

const Header = ({ title, onAdd, showAdd }) => {
  const location = useLocation();

  return (
    <header className="header">
      <h1>{title}</h1>
      {location.pathname === '/' && (
        <Button
          color={showAdd ? 'red' : 'green'}
          text={showAdd ? 'Close' : 'Add'}
          onClick={onAdd}
        />
      )}
    </header>
  );
};

Header.defaultProps = {
  title: 'Task Tracker',
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  showAdd: PropTypes.bool.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default Header;
