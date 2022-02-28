import { createEffect } from "effector";
import { getDeliveryById, putDelivery } from "../../services/deliveries/DeliveriesService";
import { Delivery } from "../../types/deliveries.types";

export const deliveryEffect = createEffect(async (id: string) => {
  const deliveryResponse: Delivery = await getDeliveryById(id);

  return deliveryResponse;
});

export const putDeliveryEffect = createEffect(async (data: Delivery) => {
  debugger
  const deliveryResponse: Delivery = await putDelivery(data);

  return deliveryResponse;
});
