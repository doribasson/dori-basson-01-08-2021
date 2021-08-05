import { MyLocalStorage } from "../redux/actions/favoriteAction";
import { useEffect, useState } from "react";
import Button from "./Button";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import SplitText from "react-pose-text";
import { useSelector, useDispatch } from "react-redux";
import {
  geolocationApi,
  searchCity,
  iconsSwitch1
} from "../redux/actions/searchAction";

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

const Forcast = ({ flagToggle, setFlagToggle, id }) => {
  const objReducer = useSelector(state => state.searchReducer);
  const { forcast, cityName, cityId } = objReducer;
  const [local, setLocal] = useState(
    JSON.parse(localStorage.getItem("weatherInfo")) || []
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchCity(cityName));
    dispatch(geolocationApi());
  }, [cityName, dispatch]);

  let checkFavorite = JSON.parse(localStorage.getItem("weatherInfo")) || [];

  return (
    <div className="card-in">
      <div className="Addfavotire">
        <Button
          id={(checkFavorite.length + 1) | []}
          className={"btn btn-dark"}
          handleClick={e => {
            MyLocalStorage(e, id, cityName);
            setLocal(JSON.parse(localStorage.getItem("weatherInfo")) || []);
          }}
          icon={
            <i
              id={checkFavorite.length | []}
              className="fas fa-star"
              style={{
                color: checkFavorite.some(item => item.cityName === cityName)
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
  );
};

export default Forcast;
