import React from 'react';
import { shallow } from 'enzyme';
import Deliveries from '../Deliveries';
import DeliveriesView from '../DeliveriesView';
import { deliveriesEffect } from '../../../stores/deliveries/DeliveriesEffect';
import DeliveriesStore from '../../../stores/deliveries/DeliveriesStore';
import ActivePropsStore from '../../../stores/activeProps/ActivePropsStore';
import { useStoreMap } from 'effector-react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('effector-react')
jest.mock('../../../stores/deliveries/DeliveriesEffect')

describe('Deliveries', () => {

    describe('without values on deliveries', () => {
        it('should call deliveriesEffect when useEffect has been called and when deliveries list is not empty', async () => {
            useStoreMap.mockReturnValueOnce(deliveriesEmpty()).mockReturnValueOnce(activePropsMock())
            jest.spyOn(React, 'useEffect').mockImplementationOnce((f) => f());
            shallow(<Deliveries />);
            expect(deliveriesEffect).toHaveBeenCalled();
        });
    })


    describe('With value on deliveries', () => {
        it('should render the component with the right props', () => {
            useStoreMap.mockReturnValueOnce(deliveries()).mockReturnValueOnce(activePropsMock())
            const wrapper = shallow(<Deliveries />);

            expect(wrapper.matchesElement(<DeliveriesView />)).toBe(true);
        });

        it('should not call deliveriesEffect when useEffect has been called and when deliveries list is empty', async () => {
            useStoreMap.mockReturnValueOnce(deliveries()).mockReturnValueOnce(activePropsMock())
            jest.spyOn(React, 'useEffect').mockImplementationOnce((f) => f());
            shallow(<Deliveries />);
            expect(deliveriesEffect).toHaveBeenCalledTimes(0)
        });

        it("should select the correct values from the store", () => {
            useStoreMap.mockReturnValueOnce(deliveries()).mockReturnValueOnce(activePropsMock())

            shallow(<Deliveries />);

            expect(useStoreMap.mock.calls[0][0].store).toBe(DeliveriesStore);
            expect(useStoreMap.mock.calls[0][0].keys).toEqual([]);
            expect(useStoreMap.mock.calls[0][0].fn(deliveries())).toMatchObject({
                deliveries: [
                    {
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
                ]
            });

            expect(useStoreMap.mock.calls[1][0].store).toBe(ActivePropsStore);
            expect(useStoreMap.mock.calls[1][0].keys).toEqual([]);
            expect(useStoreMap.mock.calls[1][0].fn(activePropsMock())).toMatchObject({
                activeProps: {
                    idActive: "1"
                }
            });
        });
    })



});


function deliveries() {
    return ({
        deliveries:
            [
                {
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
            ]
    }
    )
}

function deliveriesEmpty() {
    return ({
        deliveries: []
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