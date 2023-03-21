import { shallow } from 'enzyme';
import React from 'react';
// import renderer from 'react-test-renderer';
import InputField from '../components/InputField';
import PasswordButton from '../components/PasswordButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { InputArea, InputLabelPlaceholder, InputLabelTitle } from '../components/style-components/Form';

describe('show/hide password button', () => {
  const noop = () => {};

  // check whether the hide/show button can be triggered
  it('triggers onClick event handler when click', () => {
    const onClick = jest.fn();
    shallow(
      <PasswordButton
        onClick={onClick}
        ariaLabel='show password'
        icon={<Visibility />}
      />
    ).simulate('click');
    expect(onClick).toBeCalledTimes(1);
  })

  // check whether the aria-label is set
  it('has defined aria-label attribute', () => {
    const button = shallow(
      <PasswordButton
        onClick={noop}
        ariaLabel='show password'
        icon={<Visibility />}
      />
    );

    // check whether the aria-label is defined in the button
    expect(button.props()['aria-label']).toBeDefined();
  })

  // check whether a icon is transfer to the button
  it('icon is set', () => {
    const button = shallow(
      <PasswordButton
        onClick={noop}
        ariaLabel='hide password'
        icon={<VisibilityOff />}
      />
    );

    // check whether the icon is set by property
    expect(button.find(VisibilityOff).length).toEqual(1);
  })
})

describe('Input field', () => {
  const noop = () => {};
  // test input type of text
  it('input filed is set to text', () => {
    const input = shallow(
      <InputField
        inputtype='text'
        title='test'
        value=''
        warn={false}
        setWarn={noop}
        setState={noop}
        hasInput={noop}
        onKeyDown={noop}
      />
    );

    // check whether the type is text
    expect(input.find(InputArea).props().type).toEqual('text');
  })

  // test input type of password
  it('input filed is set to password', () => {
    const input = shallow(
      <InputField
        inputtype='password'
        title='password'
        value=''
        warn={false}
        setWarn={noop}
        setState={noop}
        hasInput={noop}
        onKeyDown={noop}
      />
    );

    // check whether the type is password
    expect(input.find(InputArea).props().type).toEqual('password');
  })

  // test whether the setWarn function is trigher to remove warning
  it('warning is remove after click', () => {
    const setWarn = jest.fn();

    shallow(
      <InputField
        inputtype='password'
        title='password'
        value=''
        warn={true}
        setWarn={setWarn}
        setState={noop}
        hasInput={noop}
        onKeyDown={noop}
      />
    ).find(InputArea).simulate('focus');

    // check whether warning is remove by setting false
    expect(setWarn).toHaveBeenCalledWith(false);
  })

  // test whether the keydown event is trigger
  it('warning is remove after click', () => {
    const onKeyDown = jest.fn();

    shallow(
      <InputField
        inputtype='password'
        title='password'
        value=''
        warn={true}
        setWarn={noop}
        setState={noop}
        hasInput={noop}
        onKeyDown={onKeyDown}
      />
    ).find(InputArea).simulate('keyDown');

    // check whether warning is remove by setting false
    expect(onKeyDown).toBeCalledTimes(1);
  })

  // test whether the value in input is change
  it('value in input is set', () => {
    const setState = jest.fn();
    const event = {
      target: {
        value: 'test'
      }
    }

    shallow(
      <InputField
        inputtype='password'
        title='password'
        value=''
        warn={false}
        setWarn={noop}
        setState={setState}
        hasInput={noop}
        onKeyDown={noop}
      />
    ).find(InputArea).simulate('change', event);

    // check whether the value is set correctly
    expect(setState).toBeCalledWith('test');
  })

  // test whether parent state of hasInput trigger
  it('input has value', () => {
    const hasInput = jest.fn();
    const event = {
      target: {
        value: 'test'
      }
    }

    // change input with set value
    shallow(
      <InputField
        inputtype='password'
        title='password'
        value=''
        warn={false}
        setWarn={noop}
        setState={noop}
        hasInput={hasInput}
        onKeyDown={noop}
      />
    ).find(InputArea).simulate('change', event);

    // check whether parent's useState hook is triggered
    expect(hasInput).toBeCalledWith(true);
  })

  // check the style of the label is changed after focus on input
  it('input label changed after focus', () => {
    const input = shallow(
      <InputField
        inputtype='password'
        title='password'
        value=''
        warn={false}
        setWarn={noop}
        setState={noop}
        hasInput={noop}
        onKeyDown={noop}
      />
    );

    // the initial state of label
    expect(input.find(InputLabelTitle).exists()).toBeFalsy();
    expect(input.find(InputLabelPlaceholder).exists()).toBeTruthy();

    // focus on the input and check whether the style is changed
    input.find(InputArea).simulate('focus');
    expect(input.find(InputLabelTitle).exists()).toBeTruthy();
    expect(input.find(InputLabelPlaceholder).exists()).toBeFalsy();
  })

  // check whether the password can be shown and hidden after the button is clicked
  it('show/hide password button is change after click', () => {
    const input = shallow(
      <InputField
        inputtype='password'
        title='password'
        value=''
        warn={false}
        setWarn={noop}
        setState={noop}
        hasInput={noop}
        onKeyDown={noop}
      />
    );

    // get input form and check whether the type is password
    let inputForm = input.find(InputArea);
    expect(inputForm.props().type).toBe('password');

    // simulate click on password button
    input.find(PasswordButton).simulate('click');

    // get input form and check whether the type is text
    inputForm = input.find(InputArea);
    expect(inputForm.props().type).toBe('text');
  })
})
