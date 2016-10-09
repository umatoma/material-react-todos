import React, { Component } from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from 'material-ui/Snackbar';
import { pink500 } from 'material-ui/styles/colors';

export default (WrappedComponent, option) => {
  const progressOption = Object.assign({
    showProgress: true
  }, option);

  const initialState = {
    isLoading: true,
    snackbar: { open: false, message: '' }
  };

  class ProgressBar extends Component {
    constructor(props) {
      super(props);
      this.startLoading = this.startLoading.bind(this);
      this.finishLoading = this.finishLoading.bind(this);
      this.handleRequestClose = this.handleRequestClose.bind(this);
      this.state = Object.assign({}, initialState);
    }

    startLoading() {
      this.setState(Object.assign({}, initialState));
    }

    finishLoading(message) {
      this.setState({
        isLoading: false,
        snackbar: { open: !!message, message: message || '' }
      });
    }

    handleRequestClose() {
      this.setState({ snackbar: initialState.snackbar });
    }

    renderProgressBar() {
      const { isLoading } = this.state;
      const { showProgress } = progressOption;
      if (showProgress && isLoading) {
        return <LinearProgress mode="indeterminate" color={pink500} />;
      }
      return null;
    }

    render() {
      return (
        <div>
          {this.renderProgressBar()}
          <WrappedComponent
            {...this.props}
            isLoading={this.state.isLoading}
            startLoading={this.startLoading}
            finishLoading={this.finishLoading}
          />
          <Snackbar
            open={this.state.snackbar.open}
            message={this.state.snackbar.message}
            onRequestClose={this.handleRequestClose}
            autoHideDuration={3000}
          />
        </div>
      );
    }
  }

  return ProgressBar;
};
