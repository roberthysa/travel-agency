import React from 'react';
import {shallow} from 'enzyme';
import OrderOption from './OrderOption';
import DatePicker from 'react-datepicker';

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

const optionTypes = {
  dropdown: 'OrderOptionDropdown',
  icons: 'OrderOptionIcons',
  checkboxes: 'OrderOptionCheckboxes',
  number: 'OrderOptionNumber',
  text: 'OrderOptionText',
  date: 'OrderOptionDate',
};

const mockProps = {
  id: 'abc',
  name: 'Lorem',
  values: [
    {id: 'aaa', icon: 'h-square', name: 'Lorem A', price: 0},
    {id: 'xyz', icon: 'h-square', name: 'Lorem X', price: 100},
  ],
  required: false,
  currentValue: 'aaa',
  price: '50%',
  limits: {
    min: 0,
    max: 6,
  },
};

const mockPropsForType = {
  dropdown: {},
  icons: {},
  checkboxes: {currentValue: [mockProps.currentValue]},
  number: {currentValue: 1},
  text: {},
  date: {},
};

const testValue = mockProps.values[1].id;
const testValueNumber = 3;

for(let type in optionTypes){
  describe(`Component OrderOption with type=${type}`, () => {
    /* test setup */
    let component;
    let subcomponent;
    let renderedSubcomponent;
    let mockSetOrderOption;

    beforeEach(() => {
      mockSetOrderOption = jest.fn();
      component = shallow(
        <OrderOption
          type={type}
          setOrderOption={mockSetOrderOption}
          {...mockProps}
          {...mockPropsForType[type]}
        />
      );
      subcomponent = component.find(optionTypes[type]);
      renderedSubcomponent = subcomponent.dive();
    });

    /* common tests */
    it(`renders ${optionTypes[type]}`, () => {
      expect(subcomponent).toBeTruthy();
      expect(subcomponent.length).toBe(1);
    });

    /* type-specific tests */
    switch (type) {
      case 'dropdown': {
        /* tests for dropdown */
        it('contains select and options', () => {
          const select = renderedSubcomponent.find('select');
          expect(select.length).toBe(1);

          const emptyOption = select.find('option[value=""]').length;
          expect(emptyOption).toBe(1);

          const options = select.find('option').not('[value=""]');
          expect(options.length).toBe(mockProps.values.length);
          expect(options.at(0).prop('value')).toBe(mockProps.values[0].id);
          expect(options.at(1).prop('value')).toBe(mockProps.values[1].id);
        });

        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('select').simulate('change', {currentTarget: {value: testValue}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }

      case 'icons': {
        /* tests for icons */
        it('contains div and icons', () => {
          const div = renderedSubcomponent.find('.component');
          expect(div.length).toBe(1);

          const emptyDiv = div.find('.icon').find('Icon[name="times-circle"]').length;
          expect(emptyDiv).toBe(1);

          const divIcons = div.findWhere(i => i.key());
          expect(divIcons.length).toBe(mockProps.values.length);
          expect(divIcons.at(0).key()).toBe(mockProps.values[0].id);
          expect(divIcons.at(1).key()).toBe(mockProps.values[1].id);
        });

        it('should run setOrderOption function on click', () => {
          renderedSubcomponent.find('.component').find('.icon').last().simulate('click');
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }

      case 'checkboxes': {
        /* tests for checkboxes */
        it('should render div with inputs', () => {
          const div = renderedSubcomponent.find('.checkboxes');
          expect(div.length).toBe(1);

          const inputs = div.find('input');
          expect(inputs.length).toBe(mockProps.values.length);
          expect(inputs.at(0).prop('value')).toBe(mockProps.values[0].id);
          expect(inputs.at(1).prop('value')).toBe(mockProps.values[1].id);
        });

        it('should render setOrderOption function on change', () => {
          renderedSubcomponent.find({value: testValue}).simulate('change', {currentTarget: {checked: true}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: [mockProps.currentValue, testValue] });
        });
        break;
      }

      case 'number': {
        /* test for number */
        it('contains div and input', () => {
          const div = renderedSubcomponent.find('.number');
          expect(div.length).toBe(1);

          const input = renderedSubcomponent.find('input[type="number"]');
          expect(input.length).toBe(1);
          expect(input.prop('min')).toBe(mockProps.limits.min);
          expect(input.prop('max')).toBe(mockProps.limits.max);
          expect(input.prop('value')).toBe(1);
        });

        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('input').simulate('change', {currentTarget: {value: testValueNumber}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValueNumber });
        });
        break;
      }

      case 'text': {
        /* test for text */
        it('contains div with input', () => {
          const div = renderedSubcomponent.find('.component');
          expect(div.length).toBe(1);

          const input = renderedSubcomponent.find('input[type="text"]');
          expect(input.length).toBe(1);
          expect(input.prop('value')).toBe(mockProps.currentValue);
        });

        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('input').simulate('change', {currentTarget: {value: testValue}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }

      case 'date': {
        /* test for date */
        it('contains div with DatePicker', () => {
          const div = renderedSubcomponent.find('.component');
          expect(div.length).toBe(1);

          const datePicker = div.find(DatePicker).length;
          expect(datePicker).toBe(1);
        });

        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find(DatePicker).simulate('change', testValue);
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue});
        });
      }
    }
  });
}
