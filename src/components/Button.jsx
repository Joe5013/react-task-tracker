import PropTypes from 'prop-types';
import React from 'react';

const Button = ({ color, text, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: color }}
      className="btn"
    >
      {text}
    </button>
  );
};

Button.defaultProps = {
  color: 'steelblue',
};

Button.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Button;
