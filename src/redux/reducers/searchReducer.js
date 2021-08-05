import {
  FETCH_SEARCH,
  FETCH_STORAGE,
  FETCH_GEOLOCATION,
  THEME_COLOR
} from "../actions/type";

const initialState = {
  forcast: [],
  forcasts: [],
  cityName: "Tel-aviv",
  cityId: "",
  cityKey: "",
  dataLocation: "",
  theme: "light-theme",
  checked: false
};

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SEARCH:
      return {
        ...state,
        forcast: action.data,
        cityName: action.cityName,
        cityId: action.cityId,
        forcasts: action.forcasts,
        cityKey: action.cityKey
      };
    case FETCH_STORAGE:
      return {
        ...state,
        forcast: action.data,
        cityName: action.cityName,
        cityId: action.cityId,
        forcasts: action.forcasts,
        cityKey: action.cityKey
      };

    case FETCH_GEOLOCATION:
      return {
        ...state,
        data: action.data,
        dataLocation: action.dataLocation
      };

    case THEME_COLOR:
      return {
        ...state,
        theme: action.theme,
        checked: action.checked
      };

    default:
      return state;
  }
}
