import React from "react";
import { Delivery } from '../../types/deliveries.types';
import ActivePropsState from '../../stores/activeProps/ActivePropsState';

interface DeliveryProps {
    deliveryProps: Delivery,
    coords: {
        latitude: number;
        longitude: number;
    }
    paramId?: string
    activeProps: ActivePropsState;
    handleActive: () => void;
    updateDelivery: (status: "idle" | "delivered" | "undelivered") => void;
}


const DeliveryView = ({ deliveryProps, activeProps, handleActive, updateDelivery, paramId }: DeliveryProps) => {

    const showSetActiveButton = paramId === activeProps.idActive && activeProps.isActive;
    const disableSetActiveButton = paramId !== activeProps.idActive && activeProps.isActive;

    const renderButtons = React.useMemo(() => {
        if (showSetActiveButton) {
            return (
                <>
                    <button id="delivered-button" onClick={() => updateDelivery("delivered")}>Delivered</button>
                    <button id="undelivered-button" onClick={() => updateDelivery("undelivered")}>Undelivered</button>
                </>
            )
        }
        return (
            <>
                <button id="set-active-button" onClick={handleActive} disabled={disableSetActiveButton}>Set active</button>
                {
                    disableSetActiveButton &&
                    <p id="text-feedback">
                        There was another delivery active.
                    </p>
                }
            </>
        )
    }, [activeProps])

    const renderDeliveredCoords = () => {
        if (deliveryProps.delivery.status === "idle") {
            return (
                <>
                    <h1>{deliveryProps.client}</h1>
                    <p>{deliveryProps.customer.address}</p>
                    {
                        renderButtons
                    }
                </>
            )
        }
        return (
            <>
                <h1>{deliveryProps.client}</h1>
                <p>{deliveryProps.customer.address}</p>
                <p id={"delivery-latitude"}>Latitude: {deliveryProps.delivery.latitude}</p>
                <p id={"delivery-longitude"}>Longitude: {deliveryProps.delivery.longitude}</p>
            </>
        )
    }

    return (
        <div>
            {
                renderDeliveredCoords()
            }
        </div>
    );
}

export default DeliveryView;
