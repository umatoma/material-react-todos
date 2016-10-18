import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import { pink500 } from 'material-ui/styles/colors';

const progressWrapperStyle = {
  position: 'relative',
  width: '100vw',
  height: '100vh',
  textAlign: 'center'
};
const progressStyle = {
  position: 'absolute',
  top: '50%',
  marginTop: '-50px'
};

const FullProgress = () => (
  <div style={progressWrapperStyle}>
    <CircularProgress size={100} thickness={5} color={pink500} style={progressStyle} />
  </div>
);

export default FullProgress;
