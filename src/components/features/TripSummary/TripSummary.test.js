import React from 'react';
import {shallow} from 'enzyme';
import TripSummary from './TripSummary';

describe('Component TripSummary', () => {
  it('should generate correct link', () => {
    const expectedLink = '/trip/abc';
    const component = shallow(<TripSummary id='abc' />);

    expect(component.find('.link').prop('to')).toEqual(expectedLink);
  });

  it('should have correct src and alt for <img>', () => {
    const expectedSrc = 'image.jpg';
    const expectedAlt = 'altForImg';
    const component = shallow(<TripSummary image={expectedSrc} name={expectedAlt} id='abc' />);

    expect(component.find('img').prop('src')).toEqual(expectedSrc);
    expect(component.find('img').prop('alt')).toEqual(expectedAlt);
  });

  it('should render correct props: name, cost and days', () => {
    const expectedName = 'TripName';
    const expectedCost = '25000';
    const expectedDays = 3;
    const component = shallow(<TripSummary name={expectedName} cost={expectedCost} days={expectedDays} id='abc' />);

    const renderedName = component.find('.title').text();
    expect(renderedName).toEqual(expectedName);
    const renderedCost = component.find('.details span').last().text();
    expect(renderedCost).toEqual(`from ${expectedCost}`);
    const renderedDays = component.find('.details span').first().text();
    expect(renderedDays).toEqual(`${expectedDays} days`);
  });

  it('should throw error without required props', () => {
    expect(() => shallow(<TripSummary />)).toThrow();
  });
});
