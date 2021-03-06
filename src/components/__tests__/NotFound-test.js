import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import NotFound from '../NotFound';

describe('NotFound', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<NotFound />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
