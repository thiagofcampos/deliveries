import { createEvent } from "effector";
import { Delivery } from "../../types/deliveries.types";

export const setDelivery = createEvent<Delivery>();
