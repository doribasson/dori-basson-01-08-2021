import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  geolocationApi,
  searchCity,
  iconsSwitch1
} from "../actions/searchAction";
import { MyLocalStorage } from "../actions/favoriteAction";
import Button from "./Button";
import Search from "./Search";
import moment from "moment";
import "moment/locale/en-gb";
import Toggleswitch from "./Toggleswitch";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import SplitText from "react-pose-text";

const charPoses = {
  exit: { y: 40, opacity: 0 },
  enter: {
    y: 0,
    opacity: 1,
    transition: ({ charInWordIndex }) => ({
      type: "spring",
      delay: charInWordIndex * 30,
      stiffness: 500 + charInWordIndex * 150,
      damping: 10 - charInWordIndex * 1
    })
  }
};

function App() {
  const [flagToggle, setFlagToggle] = useState(true);
  const [local, setLocal] = useState(
    JSON.parse(localStorage.getItem("weatherInfo")) || []
  );
  const objReducer = useSelector(state => state.searchReducer);
  const { forcast, forcasts, cityName, cityId, dataLocation } = objReducer;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchCity(cityName));
    dispatch(geolocationApi());
  }, [cityName, dispatch]);

  let checkFavorite = JSON.parse(localStorage.getItem("weatherInfo")) || [];
  useEffect(() => {}, [local]);

  let id = 0;
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
      {/* <Hamburger /> */}
      <Search />
      <div className="container">
        <div className="container-card2">
          <div className="card-in">
            <div className="Addfavotire">
              <Button
                id={(checkFavorite.length + 1) | []}
                className={"btn btn-dark"}
                handleClick={e => {
                  MyLocalStorage(e, id, cityName);
                  setLocal(
                    JSON.parse(localStorage.getItem("weatherInfo")) || []
                  );
                }}
                icon={
                  <i
                    id={checkFavorite.length | []}
                    className="fas fa-star"
                    style={{
                      color: checkFavorite.some(
                        item => item.cityName === cityName
                      )
                        ? "#ffe000"
                        : "white"
                    }}
                  ></i>
                }
              />
            </div>

            <SplitText initialPose="exit" pose="enter" charPoses={charPoses}>
              {`${cityName}, ${cityId}`}
            </SplitText>

            <div className="container-toggle-Temperature">
              <h6 className="title-city">
                {flagToggle
                  ? forcast[0]?.Temperature.Metric.Value + " ℃"
                  : forcast[0]?.Temperature.Imperial.Value + " °F"}
              </h6>
              <div className="toggleTemp1">
                <BootstrapSwitchButton
                  checked={true}
                  offlabel="°F"
                  onstyle="info"
                  offstyle="info"
                  onlabel="℃"
                  size="sm"
                  onChange={checked => {
                    setFlagToggle(checked);
                  }}
                />
              </div>
            </div>
            <div className="container-WeatherText-iconsSwitch1">
              <h6>{`${forcast[0]?.WeatherText}`}</h6>
              <img src={iconsSwitch1(forcast[0]?.WeatherText)} alt="none" />
            </div>
          </div>
        </div>
        <div className="all">
          {forcasts.map((el, i) => {
            const fahrenheitMin = el.Temperature.Minimum.Value;
            const fahrenheitMax = el.Temperature.Maximum.Value;
            const CelsiusMin = ((5 / 9) * (fahrenheitMin - 32)).toFixed(0);
            const CelsiusMax = ((5 / 9) * (fahrenheitMax - 32)).toFixed(0);
            return (
              <div key={i} className="item">
                <h5 className="card-title2">{moment(el.Date).format("L")}</h5>
                <h5 className="card-title2">
                  {moment(el.Date).format("dddd")}
                </h5>
                {flagToggle ? (
                  <h5 className="card-text1">
                    {CelsiusMin} - {CelsiusMax} {" ℃"}
                  </h5>
                ) : (
                  <h5 className="card-text1">
                    {fahrenheitMin} - {fahrenheitMax} {" °F"}
                  </h5>
                )}
                <h6 className="card-title1">{cityId}</h6>
                <img
                  className="img-icon-home1"
                  src={iconsSwitch1(el.Day.IconPhrase)}
                  alt="none"
                />
              </div>
            );
          })}
        </div>
      </div>
      <br />
      <div className="line-1 anim-typewriter">
        React Weather-app <br />
        Made by Dori
      </div>
    </div>
  );
}

export default App;
