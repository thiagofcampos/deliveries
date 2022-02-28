import { createStore } from "effector";
import { cloneDeep } from "lodash";
import { DeliveryState } from "./DeliveryState";
import { deliveryEffect, putDeliveryEffect } from './DeliveryEffect';
import { setDelivery } from './DeliveryEvents';

const initialState: DeliveryState = {
  id: "",
  client: "",
  customer: {
    name: "",
    address: "",
    city: "",
    zipCode: "0",
    latitude: "0",
    longitude: "0"
  },
  delivery: { status: "idle", latitude: 0, longitude: 0 }
};

const DeliveryStore = createStore<DeliveryState>(initialState)
  .on(setDelivery, (state, data) => {
    cloneDeep({ ...state, ...data })
  })
  .on(deliveryEffect.doneData, (state, payload) => {
    return cloneDeep({
      ...state,
      ...payload,
    });
  })
  .on(putDeliveryEffect.doneData, (state, payload) => {
    return cloneDeep({
      ...state,
      delivery: {
        ...payload.delivery
      }
    });
  })
export default DeliveryStore;

