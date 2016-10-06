/* eslint-disable react/no-unused-prop-types */
import React, { PropTypes } from 'react';

const getClassNames = (props) => {
  const extraClasses = [];

  if (props.className) {
    extraClasses.push(props.className);
  }

  return ['row'].concat(extraClasses).join(' ');
};

const Row = props => (
  <div className={getClassNames(props)}>{props.children}</div>
);

Row.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

export default Row;
