import React from 'react';
import TextField from 'material-ui/TextField';

class AddTodo extends React.Component {
  static propTypes = {
    onSubmit: React.PropTypes.func.isRequired
  };

  static getInitialState() {
    return { text: '' };
  }

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = AddTodo.getInitialState();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state)
      .then(() => { this.setState(AddTodo.getInitialState()); })
      .catch((err) => { console.log(err); });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          floatingLabelText="Todo"
          fullWidth
          onChange={(e) => { this.setState({ text: e.target.value }); }}
          value={this.state.text}
        />
      </form>
    );
  }
}

export default AddTodo;
