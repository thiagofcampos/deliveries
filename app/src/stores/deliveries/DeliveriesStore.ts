import { createStore } from "effector";
import { cloneDeep } from "lodash";
import DeliveriesState from "./DeliveriesState";
import { deliveriesEffect } from './DeliveriesEffect';

const initialState: DeliveriesState = {
  deliveries: [],
};

const DeliveriesStore = createStore<DeliveriesState>(initialState)
  .on(deliveriesEffect, (state) => cloneDeep({ ...state }))
  .on(deliveriesEffect.doneData, (state, payload) => {
    return cloneDeep({
      ...state,
      deliveries: payload,
    });
  })

export default DeliveriesStore;
