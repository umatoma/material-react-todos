/* eslint-disable react/no-unused-prop-types */
import React, { PropTypes } from 'react';

const classMap = {
  xs: 'col-xs',
  sm: 'col-sm',
  md: 'col-md',
  lg: 'col-lg',
  xsOffset: 'col-xs-offset',
  smOffset: 'col-sm-offset',
  mdOffset: 'col-md-offset',
  lgOffset: 'col-lg-offset'
};

const getClassNames = (props) => {
  const extraClasses = [];

  if (props.className) {
    extraClasses.push(props.className);
  }

  return Object.keys(props)
    .filter(key => classMap[key])
    .map(key => `${classMap[key]}-${props[key]}`)
    .concat(extraClasses)
    .join(' ');
};

const defaultStyle = {
  marginBottom: '8px'
};

const Col = props => (
  <div
    className={getClassNames(props)}
    style={Object.assign({}, defaultStyle, props.style)}
  >
    {props.children}
  </div>
);

Col.propTypes = {
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  xsOffset: PropTypes.number,
  smOffset: PropTypes.number,
  mdOffset: PropTypes.number,
  lgOffset: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.string),
  children: PropTypes.node
};

export default Col;
