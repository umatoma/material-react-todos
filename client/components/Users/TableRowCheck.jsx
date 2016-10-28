import React, { PropTypes } from 'react';
import Checkbox from 'material-ui/Checkbox';

class TableRowCheck extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    isHead: PropTypes.bool,
    checked: PropTypes.bool.isRequired,
    onCheck: PropTypes.func.isRequired
  };

  shouldComponentUpdate(nextProps) {
    return this.props.checked !== nextProps.checked;
  }

  render() {
    const { isHead, checked, children, onCheck } = this.props;
    const rowClass = checked ? 'x-table-users__row--selected' : null;
    if (isHead) {
      return (
        <tr>
          <th>
            <Checkbox checked={checked} onCheck={onCheck} />
          </th>
          {children}
        </tr>
      );
    }

    return (
      <tr className={rowClass}>
        <td>
          <Checkbox checked={checked} onCheck={onCheck} />
        </td>
        {children}
      </tr>
    );
  }
}

export default TableRowCheck;
