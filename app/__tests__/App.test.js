import React from 'react';
import { shallow, mount } from 'enzyme';
import './setupTests';
import App from '../containers/App';
import UrlShortener from '../components/UrlShortener';

beforeAll(() => {
  global.fetch = jest.fn();
 });

let wrapper;

beforeEach(() => {
    wrapper = mount(<App />);
});
afterEach(() => {
    wrapper.unmount();
});
  
describe('App.jsx loads properly', () => {
test('App renders without crashing', () => {
    shallow(<App />);
  });
test('loads with UrlShortener', () => {
    expect(wrapper.find(UrlShortener)).toHaveLength(1);
  });
}); 