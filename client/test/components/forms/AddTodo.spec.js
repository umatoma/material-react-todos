import React, { PropTypes } from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AddTodo from '../../../components/forms/AddTodo';

describe('<AddTodo />', () => {
  const sandbox = sinon.sandbox.create();
  const muiTheme = getMuiTheme();
  const mountWithContext = node => mount(node, {
    context: { muiTheme },
    childContextTypes: { muiTheme: PropTypes.object }
  });
  const defaultProps = {
    form: { error: null, text: '' },
    onUpdate: () => {},
    onSubmit: () => {}
  };

  afterEach(() => {
    sandbox.restore();
  });

  it('Todo追加用フォームが表示される', () => {
    const props = Object.assign({}, defaultProps);
    const wrapper = shallow(<AddTodo {...props} />);
    expect(wrapper.find('form')).to.have.length(1);
    expect(wrapper.find('TextField[name="text"]')).to.have.length(1);
  });

  it('form.textの値がフォームに反映される', () => {
    const props = Object.assign({}, defaultProps, {
      form: { error: null, text: 'sample text' }
    });
    const wrapper = mountWithContext(<AddTodo {...props} />);
    expect(wrapper.find('input[name="text"]')).to.have.length(1);
    expect(wrapper.find('input[name="text"]').first().prop('value')).to.be.equal('sample text');
  });

  it('フォームの入力値が更新されたらonUpdateが呼ばれる', () => {
    const props = Object.assign({}, defaultProps);
    const spyOnUpdate = sinon.spy(props, 'onUpdate');

    const wrapper = mountWithContext(<AddTodo {...props} />);
    const inputText = wrapper.find('input[name="text"]');
    inputText.simulate('change', { target: { value: 'new text' } });

    expect(spyOnUpdate.callCount).to.be.equal(1);
    expect(spyOnUpdate.firstCall.args[0]).to.be.deep.equal({ text: 'new text' });
  });

  it('フォームがSubmitされたらonSubmitが呼ばれる', () => {
    const props = Object.assign({}, defaultProps, {
      form: { error: null, text: 'sample text' }
    });
    const spyOnSubmit = sinon.spy(props, 'onSubmit');

    const wrapper = mountWithContext(<AddTodo {...props} />);
    const form = wrapper.find('form');
    form.simulate('submit');

    expect(spyOnSubmit.callCount).to.be.equal(1);
    expect(spyOnSubmit.firstCall.args[0]).to.be.deep.equal({
      error: null,
      text: 'sample text'
    });
  });
});
