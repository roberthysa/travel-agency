import React from 'react';
import {shallow} from 'enzyme';
import OrderOption from './OrderOption';

describe ('Component OrderOption', () => {
  it('should render without error', () => {
    const component = shallow(<OrderOption type='text' name='name' />);
    expect(component).toBeTruthy();
  });

  it('should return empty object if called without required props', () => {
    const component = shallow(<OrderOption />);
    expect(component).toEqual({});
  });

  it('should display prop name', () => {
    const expectedName = 'optionName';
    const component = shallow(<OrderOption type='text' name={expectedName} />);
    expect(component.find('.title').text()).toEqual(expectedName);
  });
});
