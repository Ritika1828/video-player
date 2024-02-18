import React from 'react'
import PropTypes from 'prop-types';

function Layout({ children }) {
  return (
    <div className="video-w-full video-h-full ">{children}</div>
  )
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired

};

export default Layout