import { createEffect } from "effector";
import { getAllDeliveries } from "../../services/deliveries/DeliveriesService";
import { Delivery } from "../../types/deliveries.types";

export const deliveriesEffect = createEffect(async () => {

  const deliveriesResponse: Delivery[] = await getAllDeliveries();

  return deliveriesResponse;
});
