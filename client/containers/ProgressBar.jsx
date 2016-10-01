import React, { Component } from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from 'material-ui/Snackbar';
import { pink500 } from 'material-ui/styles/colors';

export default (WrappedComponent) => {
  class ProgressBar extends Component {
    constructor(props) {
      super(props);
      this.finishLoading = this.finishLoading.bind(this);
      this.handleRequestClose = this.handleRequestClose.bind(this);
      this.state = {
        isLoading: true,
        snackbar: {
          open: false,
          message: ''
        }
      };
    }

    finishLoading(message) {
      this.setState({
        isLoading: false,
        snackbar: {
          open: true,
          message: message || 'Loading is completed.'
        }
      });
    }

    handleRequestClose() {
      this.setState({ snackbar: { open: false, message: '' } });
    }

    renderProgressBar() {
      if (this.state.isLoading === true) {
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
