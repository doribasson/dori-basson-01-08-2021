import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { geolocationApi, searchCity } from "../redux/actions/searchAction";
import Search from "./Search";
import Cards from "./Cards";
import Forcast from "./Forcast";
import "moment/locale/en-gb";
import Toggleswitch from "./Toggleswitch";

const Home = () => {
  const [flagToggle, setFlagToggle] = useState(true);
  const objReducer = useSelector(state => state.searchReducer);
  const { forcasts, cityName, cityId, dataLocation } = objReducer;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchCity(cityName));
    dispatch(geolocationApi());
  }, [cityName, dispatch]);

  return (
    <div>
      <div className="toggle-location">
        <span className="toggle-container">
          <Toggleswitch />
        </span>
        <div className="displayLocation">
          <img
            className="LocationImgStyle"
            src={require("../data/icons/icons8-location-8000.png").default}
            alt="location"
          />
          <p className="myLocation">{dataLocation}</p>
        </div>
      </div>
      <Search />
      <div className="container">
        <div className="container-card2">
          <Forcast
            flagToggle={flagToggle}
            setFlagToggle={setFlagToggle}
            id={cityId}
          />
        </div>
        <div className="all">
          <Cards
            isFavoriteCard={false}
            list={forcasts}
            flagToggle={flagToggle}
            cityId={cityId}
          />
        </div>
      </div>
      <br />
      <div className="line-1 anim-typewriter">
        React Weather-app <br />
        Made by Dori
      </div>
    </div>
  );
};

export default Home;
