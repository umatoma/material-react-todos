import React, { PropTypes } from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import update from 'react-addons-update';
import { ListContainer } from '../../containers/List';

describe('<List />', () => {
  const muiTheme = getMuiTheme();
  const muiContext = () => ({
    context: { muiTheme },
    childContextTypes: { muiTheme: PropTypes.object }
  });
  const mountWithContext = node => mount(node, muiContext());
  const defaultProps = {
    listId: 'sample_list',
    list: {
      isFetching: false,
      error: null,
      name: 'Sample List',
      todos: []
    },
    addTodoForm: {
      text: ''
    },
    apiGetList: () => {},
    apiPostTodo: () => {},
    apiPutTodo: () => {},
    apiDeleteTodo: () => {},
    initAddTodoForm: () => {},
    updateAddTodoForm: () => {}
  };

  context('TODOリスト読み込み中', () => {
    it('読み込み中はプログレスバーが表示される', () => {
      const props = update(defaultProps, {
        list: { $merge: { isFetching: true } }
      });
      const wrapper = shallow(<ListContainer {...props} />);
      expect(wrapper.find('LinearProgress')).to.have.length(1);
    });
  });

  context('TODOリスト読み込み済み', () => {
    it('ステータスコードが401であったら権限なしページが表示される', () => {
      const error = new Error('Unauthorized');
      error.status = 401;
      const props = update(defaultProps, {
        list: { $merge: { isFetching: false, error } }
      });
      const wrapper = mountWithContext(<ListContainer {...props} />);
      expect(wrapper.find('CardTitle')).to.have.length(1);
      expect(wrapper.find('CardTitle').text()).to.equal('Unauthorized');
    });

    it('読み込みが正常に完了したらTODOリストが表示される', () => {
      const todos = [
        { id: 1, text: 'List 1', completed: false },
        { id: 2, text: 'List 2', completed: true }
      ];
      const props = update(defaultProps, {
        list: { $merge: { todos } }
      });
      const wrapper = shallow(<ListContainer {...props} />);
      expect(wrapper.find('Todos')).to.have.length(2);
      expect(wrapper.find('Todos[type="DOING"]').prop('todos')).to.deep.equal([
        { id: 1, text: 'List 1', completed: false }
      ]);
      expect(wrapper.find('Todos[type="COMPLETED"]').prop('todos')).to.deep.equal([
        { id: 2, text: 'List 2', completed: true }
      ]);
    });
  });
});
