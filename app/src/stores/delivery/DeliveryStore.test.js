import { setDelivery } from './DeliveryEvents';
import { deliveryEffect, putDeliveryEffect } from './DeliveryEffect';
import DeliveryStore from './DeliveryStore';
import { getDeliveryById, putDelivery } from '../../services/deliveries/DeliveriesService'

jest.mock('../../services/deliveries/DeliveriesService')

describe('DeliveryStore', () => {
    const mockDeliveryState = {
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
            status: "idle", latitude: 0, longitude: 0
        }
    };


    it('should change value of DeliveryStore when setDelivery is called', () => {
        setDelivery(mockDeliveryState);
        expect(DeliveryStore.getState().delivery).toEqual(mockDeliveryState.delivery);
    });

    it('should change value of DeliveryStore when deliveryEffect is called', async () => {
        const idToGetById = "1"
        getDeliveryById.mockImplementation(() => Promise.resolve({ mockDeliveryState }));
        const delivery = await deliveryEffect(idToGetById);
        expect(delivery.mockDeliveryState).toEqual(mockDeliveryState);
    });

    it('should change value of DeliveryStore when putDeliveryEffect is called', async () => {
        const data = {
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
                latitude: 0,
                longitude: 0
            }
        }
        putDelivery.mockImplementation(() => Promise.resolve(data));
        const delivery = await putDeliveryEffect(data);
        expect(delivery).toEqual(data);
    });
});
