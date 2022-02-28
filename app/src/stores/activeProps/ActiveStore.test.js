import { setActive } from './ActivePropsEffect';
import ActivePropsStore from './ActivePropsStore';

describe('ActivePropsStore', () => {
    const mockDeliveriesState = {
        isActive: true,
        idActive: "2"
    };


    it('should change value of DeliveriesStore when setDeliveries is called', () => {
        expect(ActivePropsStore.getState()).toEqual({ isActive: false, idActive: "" });
        setActive(mockDeliveriesState);
        expect(ActivePropsStore.getState().isActive).toEqual(mockDeliveriesState.isActive);
    });
});
