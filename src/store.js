import { createStore } from "redux";

export const SET_SEARCH = "SET_SEARCH";

const initialState = {
  search: ""
};

const reducer = (state = initialState, { type, ...action }) => {
  switch (type) {
    case SET_SEARCH:
      const { search } = action;
      return { ...state, search };
    default:
      return state;
  }
};

export const store = createStore(reducer);
