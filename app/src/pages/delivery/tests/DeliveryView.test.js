import React from 'react';
import { shallow } from 'enzyme';
import DeliveryView from '../DeliveryView';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('DeliveryView', () => {

    const deliveryMock = {
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
        delivery: {
            status: "idle",
            latitude: null,
            longitude: null
        }
    }

    const coordsWithValueMock = {
        latitude: -22.7277132,
        longitude: -47.3363995
    }

    const paramIdMock = "1"
    const activePropsTrueMock = {
        isActive: true,
        idActive: "1"
    }

    const handleActiveMock = jest.fn();

    const updateDeliveryMock = jest.fn();

    it('should render the delivered/undelivered buttons when activeProps idActive is equal paramId, and activeProps is true', () => {
        const wrapper = shallow(
            <DeliveryView
                activeProps={activePropsTrueMock}
                coords={coordsWithValueMock}
                deliveryProps={deliveryMock}
                handleActive={handleActiveMock}
                updateDelivery={updateDeliveryMock}
                paramId={paramIdMock}
            />
        );
        const wrapperButtons = wrapper.find("button")
        expect(wrapperButtons).toHaveLength(2);
        expect(wrapper.find('h1').text()).toEqual(deliveryMock.client);
        expect(wrapper.find('p').text()).toEqual(deliveryMock.customer.address);
        expect(wrapper.find('#delivered-button').text()).toEqual("Delivered");
        expect(wrapper.find('#undelivered-button').text()).toEqual("Undelivered");
    });

    it('should call the set delivered function when the Delivered button was clicked', () => {
        const wrapper = shallow(
            <DeliveryView
                activeProps={activePropsTrueMock}
                coords={coordsWithValueMock}
                deliveryProps={deliveryMock}
                handleActive={handleActiveMock}
                updateDelivery={updateDeliveryMock}
                paramId={paramIdMock}
            />
        );
        wrapper.find('#delivered-button').simulate("click")
        expect(updateDeliveryMock.mock.calls.length).toEqual(1);
    });

    it('should call the set unDelivered function when the Undelivered button was clicked', () => {
        const wrapper = shallow(
            <DeliveryView
                activeProps={activePropsTrueMock}
                coords={coordsWithValueMock}
                deliveryProps={deliveryMock}
                handleActive={handleActiveMock}
                updateDelivery={updateDeliveryMock}
                paramId={paramIdMock}
            />
        );
        wrapper.find('#undelivered-button').simulate("click")
        expect(updateDeliveryMock.mock.calls.length).toEqual(1);
    });

    it('should render the setActive button disabled and the feedback text when activeProps idActive is different from paramId, and activeProps is true', () => {
        const paramIdDiffMock = "5"

        const wrapper = shallow(
            <DeliveryView
                activeProps={activePropsTrueMock}
                coords={coordsWithValueMock}
                deliveryProps={deliveryMock}
                handleActive={handleActiveMock}
                updateDelivery={updateDeliveryMock}
                paramId={paramIdDiffMock}
            />
        );
        const wrapperButtons = wrapper.find("button")
        expect(wrapperButtons).toHaveLength(1);
        expect(wrapper.find('h1').text()).toEqual(deliveryMock.client);
        expect(wrapper.find('#text-feedback').text()).toEqual("There was another delivery active.");
        expect(wrapper.find('#set-active-button').text()).toEqual("Set active");
        expect(wrapper.find('#set-active-button').prop("disabled")).toEqual(true);
    });

    it('should render the setActive button when activeProps idActive is different from paramId, and activeProps is true', () => {
        const activePropsFalseMock = {
            isActive: false,
            idActive: ""
        }

        const wrapper = shallow(
            <DeliveryView
                activeProps={activePropsFalseMock}
                coords={coordsWithValueMock}
                deliveryProps={deliveryMock}
                handleActive={handleActiveMock}
                updateDelivery={updateDeliveryMock}
                paramId={paramIdMock}
            />
        );

        const wrapperButtons = wrapper.find("button")
        expect(wrapperButtons).toHaveLength(1);
        expect(wrapper.find('h1').text()).toEqual(deliveryMock.client);
        expect(wrapper.find('#set-active-button').text()).toEqual("Set active");
        expect(wrapper.find('#set-active-button').prop("disabled")).toEqual(false);
    });

    it('should render the coords when delivery status different of idle', () => {
        const deliveryDeliveredMock = {
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
            delivery: {
                status: "delivered",
                latitude: 123456,
                longitude: 123456
            }
        }

        const wrapper = shallow(
            <DeliveryView
                activeProps={activePropsTrueMock}
                coords={coordsWithValueMock}
                deliveryProps={deliveryDeliveredMock}
                handleActive={handleActiveMock}
                updateDelivery={updateDeliveryMock}
                paramId={paramIdMock}
            />
        );

        expect(wrapper.find('h1').text()).toEqual(deliveryDeliveredMock.client);
        expect(wrapper.find('#delivery-latitude').text()).toEqual(`Latitude: ${deliveryDeliveredMock.delivery.latitude}`);
        expect(wrapper.find('#delivery-longitude').text()).toEqual(`Longitude: ${deliveryDeliveredMock.delivery.longitude}`);
    });
});
