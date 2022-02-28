import React from 'react';
import { shallow } from 'enzyme';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AppRouter from './routes/AppRouter';

configure({ adapter: new Adapter() });

describe('App', () => {
    it('should render the component with the right props', () => {
        const wrapper = shallow(<App />);
        expect(
            wrapper.matchesElement(
                <BrowserRouter>
                    <AppRouter />
                </BrowserRouter>
            )
        ).toBe(true);
    });
});
