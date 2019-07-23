import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING
} from "../actions/types";

const initialState = {
  items: [],
  payload: false

  /*
        {id: uuid(), name: "Eggs"},
        {id: uuid(), name: "Bread"},
        {id: uuid(), name: "Shnaps"},
        {id: uuid(), name: "Ballon"}
        */
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload.slice(0, 50),
        loading: false
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload)
      };
    case ADD_ITEM:
      return {
        ...state, //current state
        items: [action.payload, ...state.items] //tipo padaro copy
      };
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
