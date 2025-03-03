import { SET_UI } from '@/redux/actionConstants';

const initialState = {
  color: 'red',
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_UI:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
