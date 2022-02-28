import React from "react";
import { useStoreMap } from "effector-react";
import { shallow, mount } from 'enzyme';
import Router from "react-router-dom";
import { deliveryEffect, putDeliveryEffect } from '../../../stores/delivery/DeliveryEffect';
import DeliveryStore from '../../../stores/delivery/DeliveryStore';
import { setActive } from '../../../stores/activeProps/ActivePropsEffect';
import ActivePropsStore from '../../../stores/activeProps/ActivePropsStore';
import Delivery from '../Delivery';
import DeliveryView from '../DeliveryView';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import enableHooks, { withHooks } from 'jest-react-hooks-shallow';

enableHooks(jest);
configure({ adapter: new Adapter() });
jest.mock('effector-react')
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: jest.fn(),
}));
jest.mock('../../../stores/delivery/DeliveryEffect')
jest.mock('../../../stores/activeProps/ActivePropsEffect')

describe('Delivery', () => {
    beforeEach(() => {
        const mockGeolocation = {
            getCurrentPosition: jest.fn()
                .mockImplementationOnce((success) => Promise.resolve(success({
                    coords: {
                        latitude: 51.1,
                        longitude: 45.3
                    }
                }))),
            watchPosition: jest.fn()
        };

        global.navigator.geolocation = mockGeolocation;
        jest.spyOn(React, 'useState').mockImplementation(() => [{ latitude: 0, longitude: 0 }, jest.fn()]);
        jest.spyOn(Router, 'useParams').mockReturnValue({ id: '1' });
    })

    it('should render the view with the right props', () => {
        const wrapper = shallow(<Delivery />);

        expect(
            wrapper.matchesElement(
                <DeliveryView />
            )
        ).toBe(true);
    });

    it('should call deliveryEffect when call handleActive function', () => {
        useStoreMap.mockReturnValueOnce(deliveries()).mockReturnValueOnce(activePropsMock())
        const wrapper = shallow(<Delivery />);
        wrapper.invoke('handleActive')();
        expect(setActive).toHaveBeenCalledTimes(1)

    });

    it('should call alert when call updateDelivery function and coords are undefined', () => {
        useStoreMap.mockReturnValueOnce(deliveries()).mockReturnValueOnce(activePropsMock())
        const wrapper = shallow(<Delivery />);
        jest.spyOn(window, 'alert').mockImplementation(() => { "The location in browser needs to be active" });
        wrapper.invoke('updateDelivery')("delivered");
        expect(window.alert).toBeCalled();
    });

    it('should call putDeliveryEffect and setActive when call updateDelivery function and coords are defined', () => {
        useStoreMap.mockReturnValueOnce(deliveries()).mockReturnValueOnce(activePropsMock())
        jest.spyOn(React, 'useState').mockImplementation(() => [{ latitude: 10, longitude: 10 }, jest.fn()]);
        const wrapper = shallow(<Delivery />);
        wrapper.invoke('updateDelivery')("delivered");
        expect(putDeliveryEffect).toBeCalled();
        expect(setActive).toBeCalled();
    });

    it('should call geoLocation and setState loads', async () => {
        useStoreMap.mockReturnValueOnce(deliveries()).mockReturnValueOnce(activePropsMock())
        jest.spyOn(React, 'useEffect').mockImplementationOnce((f) => f()).mockImplementationOnce((f) => f());
        const wrapper = shallow(<Delivery />);
        console.log(wrapper.prop('coords'))
        expect(deliveryEffect).toBeCalled();
        expect(React.useState).toBeCalled();
    });

    it("should select the correct values from the store", () => {
        useStoreMap.mockReturnValueOnce(deliveries()).mockReturnValueOnce(activePropsMock())

        shallow(<Delivery />);

        expect(useStoreMap.mock.calls[0][0].store).toBe(DeliveryStore);
        expect(useStoreMap.mock.calls[0][0].keys).toEqual([]);
        expect(useStoreMap.mock.calls[0][0].fn(deliveries())).toMatchObject({
            deliveries: {
                id: "1",
                client: "Quigley Inc",
                customer: {
                    name: "Clyde Bosco",
                    address: "8459 Koss Skyway",
                    city: "Waukegan",
                    zipCode: 19087,
                    latitude: 36.7388,
                    longitude: -101.2631
                },
                delivery: { status: "idle", latitude: null, longitude: null }
            }
        });

        expect(useStoreMap.mock.calls[1][0].store).toBe(ActivePropsStore);
        expect(useStoreMap.mock.calls[1][0].keys).toEqual([]);
        expect(useStoreMap.mock.calls[1][0].fn(activePropsMock())).toMatchObject({
            activeProps: {
                idActive: "1"
            }
        });
    });
});

function deliveries() {
    return ({
        deliveries: {
            id: "1",
            client: "Quigley Inc",
            customer: {
                name: "Clyde Bosco",
                address: "8459 Koss Skyway",
                city: "Waukegan",
                zipCode: 19087,
                latitude: 36.7388,
                longitude: -101.2631
            },
            delivery: { status: "idle", latitude: null, longitude: null }
        }
    }
    )
}

function activePropsMock() {
    return ({
        activeProps: {
            idActive: "1"
        }
    }
    )
}