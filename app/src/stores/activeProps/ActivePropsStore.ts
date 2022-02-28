import { createStore } from 'effector';
import { cloneDeep } from 'lodash';
import { setActive } from './ActivePropsEffect';
import ActivePropsState from './ActivePropsState';

const initialState: ActivePropsState = {
  isActive: false,
  idActive: ""
};

const ActivePropsStore = createStore<ActivePropsState>(initialState).on(setActive, (state, status) =>
  cloneDeep({
    ...state,
    ...status,
  })
);
export default ActivePropsStore;
