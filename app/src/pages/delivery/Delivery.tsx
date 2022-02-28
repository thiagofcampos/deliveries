import React from "react";
import { useStoreMap } from "effector-react";
import { useParams } from "react-router-dom";
import { deliveryEffect, putDeliveryEffect } from '../../stores/delivery/DeliveryEffect';
import DeliveryStore from '../../stores/delivery/DeliveryStore';
import { setActive } from '../../stores/activeProps/ActivePropsEffect';
import ActivePropsStore from '../../stores/activeProps/ActivePropsStore';
import DeliveryView from './DeliveryView';

interface CoordinateProps {
    latitude: number;
    longitude: number;
}

const Delivery = () => {
    const { id } = useParams();
    const [coords, setCoords] = React.useState<CoordinateProps>({ latitude: 0, longitude: 0 });

    const onInitGeolocation = () => {
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                setCoords({ latitude: coords.latitude, longitude: coords.longitude });
            }
        );
    }

    React.useEffect(() => {
        onInitGeolocation()
    }, []);

    const deliveryProps = useStoreMap({
        store: DeliveryStore,
        keys: [],
        fn: (state) => state,
    });

    const activeProps = useStoreMap({
        store: ActivePropsStore,
        keys: [],
        fn: (state) => state,
    });

    React.useEffect(() => {
        id && deliveryEffect(id);
    }, []);

    const handleActive = () => {
        id && setActive({ idActive: id, isActive: true })
    }

    const handleUpdateDelivery = (status: "idle" | "delivered" | "undelivered") => {
        if (coords.latitude === 0 || coords.longitude === 0) {
            alert("The location in browser needs to be active");
            return;
        }
        const data = {
            ...deliveryProps,
            delivery: {
                status: status,
                latitude: coords.latitude,
                longitude: coords.longitude
            }
        }
        putDeliveryEffect(data);
        setActive({ idActive: "", isActive: false })
    }

    return (
        <DeliveryView paramId={id} deliveryProps={deliveryProps} coords={coords} activeProps={activeProps} handleActive={handleActive} updateDelivery={handleUpdateDelivery} />
    );
}

export default Delivery;
