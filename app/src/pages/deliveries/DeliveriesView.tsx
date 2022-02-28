import React from "react";
import { Link } from "react-router-dom";
import ActivePropsState from "../../stores/activeProps/ActivePropsState";
import { Delivery } from '../../types/deliveries.types';

interface DeliveriesProps {
    deliveries: Delivery[],
    activeProps: ActivePropsState;
}

const DeliveriesView = ({ deliveries, activeProps }: DeliveriesProps) => {

    return (
        <div>
            <h1>Deliveries list:</h1>
            {deliveries.map((delivery) => (
                <div key={delivery.id}>
                    <Link to={`/${delivery.id}`}>{delivery.client}</Link>
                    {
                        delivery.id === activeProps.idActive &&
                        <p>Delivery active</p>
                    }
                </div>
            ))}
        </div>
    );
}

export default DeliveriesView;
