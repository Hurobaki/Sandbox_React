import { createStore } from "redux";
import * as actions from "./actions";

const initialState = {
  search: ""
};

const reducer = (state = initialState, { type, ...action }) => {
  switch (type) {
    case actions.SET_SEARCH:
      const { search } = action;
      return { ...state, search };
    default:
      return state;
  }
};

export const store = createStore(reducer);
