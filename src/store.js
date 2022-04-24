import { createStore } from 'redux';


const bankReducer = function (state = {}, action) {
  switch (action.type) {
    case "UPDATE_SELECTED_BANK":
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

const store = createStore(bankReducer);

export default store;