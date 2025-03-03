import { CURRENT_CALCULATION } from '../actionConstants';

// import { SET_SELECTED_BET } from '@actions/actionConstants';

const initialState = {
  currentValue: {},
};
const calculationModule = (state = { ...initialState }, action = {}) => {
  switch (action.type) {
    case CURRENT_CALCULATION:
      return {
        ...state,
        currentValue: action.payload.payload,
      };
    default:
      return state;
  }
};

export default calculationModule;
