import React from 'react';
import { browserHistory } from 'react-router';

/**
 * Auth High Order Component
 *
 * @param {Component} WrappedComponent
 * @return {Component}
 */
export default (WrappedComponent) => {
  /**
   * Redirect to unauthorized page
   */
  const redirectToUnauthorized = () => {
    browserHistory.push('/unauthorized');
  };

  return props => (
    <WrappedComponent
      {...props}
      redirectToUnauthorized={redirectToUnauthorized}
    />
  );
};
