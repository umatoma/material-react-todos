import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import TextField from 'material-ui/TextField';

class AddTodo extends React.Component {
  static propTypes = {
    style: PropTypes.shape(),
    form: ImmutablePropTypes.mapContains({
      error: PropTypes.instanceOf(Error),
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

  shouldComponentUpdate(nextProps) {
    return this.props.form !== nextProps.form;
  }

  handleChange(e) {
    e.preventDefault();
    this.props.onUpdate({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { text } = this.props.form.toObject();
    this.props.onSubmit({ text });
  }

  render() {
    return (
      <form style={this.props.style} onSubmit={this.handleSubmit}>
        <TextField
          name="text"
          fullWidth
          floatingLabelText="Todo"
          errorText={this.props.form.get('error')}
          onChange={this.handleChange}
          value={this.props.form.get('text')}
        />
      </form>
    );
  }
}

export default AddTodo;
