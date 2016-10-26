import React, { PropTypes } from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Todos from '../../../components/List/Todos';

describe('<Todos />', () => {
  const sandbox = sinon.sandbox.create();
  const muiTheme = getMuiTheme();
  const muiContext = () => ({
    context: { muiTheme },
    childContextTypes: { muiTheme: PropTypes.object }
  });
  const shallowWithContext = node => shallow(node, muiContext());
  const defaultProps = {
    todos: [],
    type: null,
    onTouchTapCompleteMenu: () => {},
    onTouchTapDeleteMenu: () => {}
  };

  afterEach(() => {
    sandbox.restore();
  });

  context('Doing', () => {
    it('進行中のTODO一覧が表示される', () => {
      const props = Object.assign({}, defaultProps, {
        type: 'DOING',
        todos: [
          { id: 1, text: 'hoge' },
          { id: 2, text: 'fuga' }
        ]
      });
      const wrapper = shallow(<Todos {...props} />);
      expect(wrapper.find('CardTitle').first().prop('title')).to.equal('Doing');
      expect(wrapper.find('ListItem')).to.have.length(2);

      expect(wrapper.find('ListItem').at(0).key()).to.equal('1');
      expect(wrapper.find('ListItem').at(0).prop('primaryText')).to.equal('hoge');

      expect(wrapper.find('ListItem').at(1).key()).to.equal('2');
      expect(wrapper.find('ListItem').at(1).prop('primaryText')).to.equal('fuga');
    });

    it('CompleteボタンをクリックしたらCallbackを受け取れる', () => {
      const props = Object.assign({}, defaultProps, {
        type: 'DOING',
        todos: [
          { id: 1, text: 'hoge' }
        ]
      });
      const spyComplete = sinon.spy(props, 'onTouchTapCompleteMenu');

      const wrapper = shallowWithContext(<Todos {...props} />);
      const listItem = wrapper.find('ListItem').at(0).shallow(muiContext());
      const menuItem = listItem.find('MenuItem[primaryText="Complete"]');

      expect(spyComplete.callCount).to.equal(0);

      menuItem.simulate('touchTap');

      expect(spyComplete.callCount).to.equal(1);
      expect(spyComplete.firstCall.args[0]).to.deep.equal({ id: 1, text: 'hoge' });
    });

    it('DeleteボタンをクリックしたらCallbackを受け取れる', () => {
      const props = Object.assign({}, defaultProps, {
        type: 'DOING',
        todos: [
          { id: 1, text: 'hoge' }
        ]
      });
      const spyDelete = sinon.spy(props, 'onTouchTapDeleteMenu');

      const wrapper = shallowWithContext(<Todos {...props} />);
      const listItem = wrapper.find('ListItem').at(0).shallow(muiContext());
      const menuItem = listItem.find('MenuItem[primaryText="Delete"]');

      expect(spyDelete.callCount).to.equal(0);

      menuItem.simulate('touchTap');

      expect(spyDelete.callCount).to.equal(1);
      expect(spyDelete.firstCall.args[0]).to.deep.equal({ id: 1, text: 'hoge' });
    });
  });

  context('Completed', () => {
    it('完了済みのTODO一覧が表示される', () => {
      const props = Object.assign({}, defaultProps, {
        type: 'COMPLETED',
        todos: [
          { id: 1, text: 'hoge' },
          { id: 2, text: 'fuga' }
        ]
      });
      const wrapper = shallow(<Todos {...props} />);
      expect(wrapper.find('CardTitle').first().prop('title')).to.equal('Completed');
      expect(wrapper.find('ListItem')).to.have.length(2);

      expect(wrapper.find('ListItem').at(0).key()).to.equal('1');
      expect(wrapper.find('ListItem').at(0).prop('primaryText')).to.equal('hoge');

      expect(wrapper.find('ListItem').at(1).key()).to.equal('2');
      expect(wrapper.find('ListItem').at(1).prop('primaryText')).to.equal('fuga');
    });
  });

  it('不正なタイプの場合は何も描画されない', () => {
    const props = Object.assign({}, defaultProps, {
      type: 'INVALID',
      todos: [
        { id: 1, text: 'hoge' },
        { id: 2, text: 'fuga' }
      ]
    });
    const wrapper = shallow(<Todos {...props} />);
    expect(wrapper.text()).to.equal('');
  });
});
