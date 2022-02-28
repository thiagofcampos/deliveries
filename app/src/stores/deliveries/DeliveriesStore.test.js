import { setDeliveries } from './DeliveriesEvents';
import { deliveriesEffect } from './DeliveriesEffect';
import DeliveriesStore from './DeliveriesStore';
import { getAllDeliveries } from '../../services/deliveries/DeliveriesService'

jest.mock('../../services/deliveries/DeliveriesService')

describe('DeliveriesStore', () => {
    const mockDeliveriesState = [
        {
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
        },
        {
            client: "Bergnaum",
            customer: {
                name: "Randall Walter II",
                address: "8459 Koss Skyway",
                city: "Waukegan",
                zipCode: 12323,
                latitude: 36.1238,
                longitude: -101.4354
            },
            delivery: { status: "idle", latitude: null, longitude: null }
        }
    ];


    it('should change value of DeliveriesStore when setDeliveries is called', () => {
        expect(DeliveriesStore.getState().deliveries).toEqual([]);
        setDeliveries(mockDeliveriesState);
        expect(DeliveriesStore.getState().customer).toEqual(mockDeliveriesState.customer);
    });

    it('should change value of DeliveriesStore when deliveriesEffect is called', async () => {
        getAllDeliveries.mockImplementation(() => Promise.resolve({ mockDeliveriesState }));
        const deliveries = await deliveriesEffect();
        expect(deliveries.mockDeliveriesState).toEqual(mockDeliveriesState);
    });
});
