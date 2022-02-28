import React from "react";
import { useStoreMap } from "effector-react";
import { deliveriesEffect } from '../../stores/deliveries/DeliveriesEffect';
import DeliveriesStore from '../../stores/deliveries/DeliveriesStore';
import DeliveriesView from './DeliveriesView';
import ActivePropsStore from '../../stores/activeProps/ActivePropsStore';

const Deliveries = () => {

    const { deliveries } = useStoreMap({
        store: DeliveriesStore,
        keys: [],
        fn: (state) => state,
    });

    const activeProps = useStoreMap({
        store: ActivePropsStore,
        keys: [],
        fn: (state) => state,
    });

    React.useEffect(() => {
        if (deliveries.length === 0) {
            deliveriesEffect();
        }
    }, []);

    return (
        <DeliveriesView deliveries={deliveries} activeProps={activeProps} />
    );
}

export default Deliveries;
