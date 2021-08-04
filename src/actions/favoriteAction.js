import { API_ADDRESS_CURRENT, API_ADDRESS, KEY_WEATHER } from "../actions/type";

export const MyLocalStorage = (e, i, cityName) => {
  let storedCity = JSON.parse(localStorage.getItem("weatherInfo")) || [];
  const isExsisit = storedCity.some(x => x.cityName === cityName);
  if (isExsisit) {
    delteCityFromFavorite(cityName);
  } else addCityToStorage(cityName, i);
};

export const delteCityFromFavorite = cityName => {
  let checkFavorite = JSON.parse(localStorage.getItem("weatherInfo")) || [];
  const newCheckFavorite = checkFavorite.filter(el => el.cityName !== cityName);
  checkFavorite.isFavorite = false;
  localStorage.setItem("weatherInfo", JSON.stringify(newCheckFavorite));

  if (newCheckFavorite.length === 0) localStorage.clear();
};

export const addCityToStorage = (cityName, i) => {
  const objArray = localStorage.getItem("weatherInfo");
  const parsedArray = objArray ? JSON.parse(objArray) : [];
  const newObjCity = [...parsedArray, { id: i, cityName, isFavorite: true }];
  localStorage.setItem("weatherInfo", JSON.stringify(newObjCity));
};

export const loadFavoritesAction = () => {
  return new Promise((resolve, reject) => {
    try {
      let storedWeather = [];
      let cities = [];
      storedWeather = JSON.parse(localStorage.getItem("weatherInfo"));
      if (storedWeather) {
        storedWeather.forEach((el, i) => {
          let res = fetchCity(el.cityName);
          res.then(res => {
            cities.push(res);
          });
        });
        resolve(cities);
      }
    } catch (e) {
      console.error(e.error);
    }
  });
};

export const fetchCity = async CityName => {
  let cities = {};
  const req1 = await fetch(`${API_ADDRESS}${KEY_WEATHER}=${CityName}`);
  const resData1 = await req1.json();
  if (resData1[0] !== undefined) {
    const cityKey = resData1[0].Key;
    const req2 = await fetch(
      `${API_ADDRESS_CURRENT}${cityKey}?apikey=${KEY_WEATHER}`
    );
    const resData2 = await req2.json();

    const updatedList = { city: CityName, data: resData2 };
    cities = updatedList;
  }
  return cities;
};

export const removeAllAction = () => {
  if (localStorage.getItem("weatherInfo") !== null)
    localStorage.removeItem("weatherInfo");
};

// export const MyLocalStorageAction = cityName => {
//   let deleteCity = cityName;
//   let storedCity = JSON.parse(localStorage.getItem("weatherInfo")) || [];
//   if (localStorage.length !== 0) {
//     const resultresult = storedCity.some(city => city === deleteCity);
//   } else addCityToStorageAction(cityName);
// };

export const delteCityFromFavoriteAction = deleteCity => {
  let storedCity = JSON.parse(localStorage.getItem("weatherInfo"));
  const NewStoredCity = storedCity.filter(city => city !== deleteCity);
  localStorage.setItem("weatherInfo", JSON.stringify(NewStoredCity));
};

export const addCityToStorageAction = cityName => {
  if (localStorage.getItem("weatherInfo") === null) {
    let storedCity = [];
    storedCity.push(cityName);
    localStorage.setItem("weatherInfo", JSON.stringify(storedCity));
  } else {
    let storedCity = JSON.parse(localStorage.getItem("weatherInfo"));
    const result = storedCity.some(city => city === cityName);
    if (!result) storedCity.push(cityName);
    localStorage.setItem("weatherInfo", JSON.stringify(storedCity));
  }
};
