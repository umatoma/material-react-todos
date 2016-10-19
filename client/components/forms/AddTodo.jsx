import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';

class AddTodo extends React.Component {
  static propTypes = {
    style: PropTypes.shape(),
    form: PropTypes.shape({
      error: PropTypes.any,
      text: PropTypes.string.isRequired
    }),
    onUpdate: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.props.onUpdate({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.props.form);
  }

  render() {
    return (
      <form style={this.props.style} onSubmit={this.handleSubmit}>
        <TextField
          fullWidth
          floatingLabelText="Todo"
          errorText={this.props.form.error}
          onChange={this.handleChange}
          value={this.props.form.text}
        />
      </form>
    );
  }
}

export default AddTodo;
