
import React from 'react';
import { Route, Routes } from "react-router-dom";
import Deliveries from '../pages/deliveries/Deliveries';
import Delivery from '../pages/delivery/Delivery';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AppRouter from './AppRouter';
import { shallow } from 'enzyme';

configure({ adapter: new Adapter() });

describe('AppRouter', () => {

    it('should render the right props', () => {
        const wrapper = shallow(<AppRouter />);
        expect(
            wrapper.matchesElement(
                <Routes>
                    <Route path="/" element={<Deliveries />} />
                    <Route path=":id" element={<Delivery />} />
                </Routes>
            )
        ).toBe(true);
    });

    it('should render the right routes', () => {
        const wrapper = shallow(<AppRouter />);
        const routeWrapper = wrapper.find(Routes);

        expect(routeWrapper.children()).toHaveLength(2);
        expect(routeWrapper.childAt(0).prop('path')).toBe('/');
        expect(routeWrapper.childAt(0).prop('element')).toEqual(<Deliveries />);

        expect(routeWrapper.childAt(1).prop('path')).toBe(':id');
        expect(routeWrapper.childAt(1).prop('element')).toEqual(<Delivery />);
    });
});
