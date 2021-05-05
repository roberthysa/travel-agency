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

  it('should render tags in spans in correct order', () => {
    const expectedTags = ['tag1', 'tag1', 'tag3'];
    const component = shallow(<TripSummary tags={expectedTags} id='abc' />);

    expect(component.find('.tags span').at(0).text()).toEqual(expectedTags[0]);
    expect(component.find('.tags span').at(1).text()).toEqual(expectedTags[1]);
    expect(component.find('.tags span').at(2).text()).toEqual(expectedTags[2]);
  });

  it('should not render div .tags without props tags or tags=[]', () => {
    const component = shallow(<TripSummary id='abc' />);
    expect(component.find('.tags')).toMatchObject({});
    const component2 = shallow(<TripSummary tags={[]} id='abc' />);
    expect(component2.find('.tags')).toMatchObject({});
  });
});
