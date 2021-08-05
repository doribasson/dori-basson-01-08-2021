import {
  FETCH_SEARCH,
  FETCH_STORAGE,
  API_ADDRESS,
  API_ADDRESS_CURRENT,
  API_ADDRESS_SEARCH,
  API_ADDRESS_LOCATION,
  FETCH_GEOLOCATION,
  KEY_WEATHER,
  THEME_COLOR
} from "../actions/type";
import axios from "axios";

export const searchCity = cityQuery => {
  return function(dispatch) {
    fetch(`${API_ADDRESS}${KEY_WEATHER}=${cityQuery}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        const cityKey = data[0].Key;
        Promise.all([
          fetch(`${API_ADDRESS}${KEY_WEATHER}=${cityQuery}`),
          fetch(`${API_ADDRESS_SEARCH}${cityKey}?apikey=${KEY_WEATHER}`),
          fetch(`${API_ADDRESS_CURRENT}${cityKey}?apikey=${KEY_WEATHER}`)
        ])
          .then(async ([req1, req2, req3]) => {
            const res1 = await req1.json();
            const res2 = await req2.json();
            const res3 = await req3.json();
            return [res1, res2, res3];
          })
          .then(responseAll => {
            dispatch({
              type: FETCH_SEARCH,
              cityKey: responseAll[0][0].Key,
              cityName: responseAll[0][0].LocalizedName,
              cityId: responseAll[0][0].AdministrativeArea.ID,
              forcasts: responseAll[1].DailyForecasts,
              data: responseAll[2]
            });
          });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const storageAction = cityQuery => {
  return function(dispatch) {
    axios
      .get(`${API_ADDRESS}${KEY_WEATHER}=${cityQuery}`)
      .then(response => {
        if (response.status !== 200) {
          throw new Error("Unsuccessful request");
        }
        const cityName = response.data[0].LocalizedName;
        const cityId = response.data[0].AdministrativeArea.ID;
        const cityKey = response.data[0].Key;

        axios
          .get(`${API_ADDRESS_SEARCH}${cityKey}?apikey=${KEY_WEATHER}`)
          .then(response => {
            // const forcasts = response.data.DailyForecasts;

            const requestOne = axios.get(
              `${API_ADDRESS_SEARCH}${cityKey}?apikey=${KEY_WEATHER}`
            );
            const requestTwo = axios.get(
              `${API_ADDRESS_CURRENT}${cityKey}?apikey=${KEY_WEATHER}`
            );

            axios
              .all([requestOne, requestTwo])
              .then(
                axios.spread((...responses) => {
                  const responseOne = responses[0];
                  const responseTwo = responses[1];
                  const forcasts = responseOne.data.DailyForecasts;
                  dispatch({
                    type: FETCH_STORAGE,
                    data: responseTwo.data,
                    cityName,
                    cityId,
                    forcasts
                  });
                })
              )
              .catch(errors => {
                throw new Error("Unsuccessful request");
              });

            // dispatch({
            //   type: FETCH_STORAGE,
            //   data: responseTwo.data,
            //   cityName,
            //   cityId,
            //   forcasts
            // });
          });
      })

      .catch(error => {
        console.log("this city not found");
      });
  };
};

export const geolocationApi = () => {
  function error() {}
  return function(dispatch) {
    navigator.geolocation.getCurrentPosition(success, error);
    function success() {
      navigator.geolocation.watchPosition(position => {
        let location =
          position.coords.latitude + "," + position.coords.longitude;
        axios.get(`${API_ADDRESS_LOCATION}${location}`).then(response => {
          if (response.status !== 200) {
            throw new Error("Unsuccessful request Geolocation");
          }
          const dataLocation = response.data.EnglishName;
          dispatch({
            type: FETCH_GEOLOCATION,
            data: response.data,
            dataLocation
          });
        });
      });
    }
  };
};

export const iconsSwitch1 = param => {
  switch (param) {
    case "Sunny":
      return require("../../data/icons/01-s.png").default;
    case "Clouds and sun":
      return require("../../data/icons/04-s.png").default;
    case "Mostly sunny":
      return require("../../data/icons/02-s.png").default;
    case "Partly sunny":
      return require("../../data/icons/03-s.png").default;
    case "Intermittent clouds":
      return require("../../data/icons/04-s.png").default;
    case "Hazy sunshine":
      return require("../../data/icons/05-s.png").default;
    case "Mostly cloudy":
      return require("../../data/icons/06-s.png").default;
    case "Cloudy":
      return require("../../data/icons/07-s.png").default;
    case "Overcast":
      return require("../../data/icons/08-s.png").default;
    case "Fog":
      return require("../../data/icons/11-s.png").default;
    case "Showers":
      return require("../../data/icons/12-s.png").default;
    case "Mostly cloudy w/ showers":
      return require("../../data/icons/13-s.png").default;
    case "Partly sunny w/ showers":
      return require("../../data/icons/14-s.png").default;
    case "T-Storms":
      return require("../../data/icons/15-s.png").default;
    case "Partly Sunny w/ T-Storms":
      return require("../../data/icons/17-s.png").default;
    case "Rain":
      return require("../../data/icons/18-s.png").default;
    case "Flurries":
      return require("../../data/icons/19-s.png").default;
    case "Partly sunny w/ Flurries":
      return require("../../data/icons/21-s.png").default;
    case "Snow":
      return require("../../data/icons/22-s.png").default;
    case "Ice":
      return require("../../data/icons/24-s.png").default;
    case "Sleet":
      return require("../../data/icons/25-s.png").default;
    case "Freezing Rain":
      return require("../../data/icons/26-s.png").default;
    case "Rain and Snow":
      return require("../../data/icons/29-s.png").default;
    case "Hot":
      return require("../../data/icons/30-s.png").default;
    case "Cold":
      return require("../../data/icons/31-s.png").default;
    case "Windy":
      return require("../../data/icons/32-s.png").default;
    case "Clear":
      return require("../../data/icons/33-s.png").default;
    case "Partly cloudy":
      return require("../../data/icons/35-s.png").default;
    case "Hazy moonlight":
      return require("../../data/icons/37-s.png").default;
    case "Partly cloudy w/ showers":
      return require("../../data/icons/39-s.png").default;
    case "Mostly Cloudy w/ Showers":
      return require("../../data/icons/40-s.png").default;
    case "Partly cloudy w/ T-Storms":
      return require("../../data/icons/41-s.png").default;
    case "Mostly cloudy w/ T-Storms":
      return require("../../data/icons/42-s.png").default;
    case "Mostly cloudy w/ Flurries":
      return require("../../data/icons/43-s.png").default;
    case "Mostly cloudy w/ Snow":
      return require("../../data/icons/44-s.png").default;
    case "Some clouds":
      return require("../../data/icons/04-s.png").default;
    case "Mostly clear":
      return require("../../data/icons/02-s.png").default;
    default:
      return require("../../data/icons/06-s.png").default;
  }
};

export const checkStorage = () => {
  let checkFavorite = JSON.parse(localStorage.getItem("weatherinfo"));

  if (checkFavorite !== null) {
    const doubled = checkFavorite.some(city => city === "yavne");
    return doubled;
  }
  return null;
};

export const themeColor = (themeColor, checked) => {
  return function(dispatch) {
    const newThemeColor =
      themeColor === "light-theme" ? "dark-theme" : "light-theme";
    dispatch({
      type: THEME_COLOR,
      theme: newThemeColor,
      checked: !checked
    });
  };
};
