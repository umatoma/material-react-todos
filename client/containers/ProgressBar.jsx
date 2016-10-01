import React, { Component } from 'react';
import LinearProgress from 'material-ui/LinearProgress';

export default (WrappedComponent) => {
  class ProgressBar extends Component {
    constructor(props) {
      super(props);
      this.state = { isLoading: true };
    }

    renderProgressBar() {
      if (this.state.isLoading === true) {
        return <LinearProgress mode="indeterminate" />;
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
            finishLoading={() => this.setState({ isLoading: false })}
          />
        </div>
      );
    }
  }

  return ProgressBar;
};
