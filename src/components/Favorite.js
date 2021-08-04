import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
import { iconsSwitch1 } from "../actions/searchAction";
import {
  removeAllAction,
  loadFavoritesAction
} from "../actions/favoriteAction";
import "bootstrap/dist/css/bootstrap.min.css";
import SplitText from "react-pose-text";
import Toggleswitch from "../components/Toggleswitch";
import Button from "./Button";
import { MyLocalStorage } from "../actions/favoriteAction";

const charPoses = {
  exit: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    delay: ({ charIndex }) => charIndex * 30
  }
};

const Favorite = () => {
  const [local, setLocal] = useState(
    JSON.parse(localStorage.getItem("weatherInfo")) || []
  );

  const [response, setResponse] = useState();

  const [setFlag] = useState(false);
  const [loading, setLoading] = useState(true);

  let checkFavorite = JSON.parse(localStorage.getItem("weatherInfo")) || [];

  useEffect(() => {
    const resFromApi = loadFavoritesAction().then(res => setResponse(res));
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    setResponse(resFromApi);
  }, []);

  const removeAll = () => {
    removeAllAction();

    setFlag(true);
  };

  let storedWeather = JSON.parse(localStorage.getItem("weatherInfo"));

  if (storedWeather) {
    return (
      <div className="container-favorite">
        <div className="toggle-container">
          <Toggleswitch />
        </div>

        <div className="splitText">
          <SplitText initialPose="exit" pose="enter" charPoses={charPoses}>
            My favorites
          </SplitText>
        </div>
        <br />
        {loading ? (
          <div className="spiner_loading">
            <div className="spinner-grow text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-secondary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-success" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-danger" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-warning" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="container-favorite-card">
            {local.map((el, i) => {
              return (
                <div key={i} className="favorite-card">
                  <h4 className="card-title">
                    <u>{el?.cityName}</u>
                  </h4>
                  <h5 className="card-text">
                    {response[i]?.data[0]?.Temperature.Metric.Value} ℃{" "}
                  </h5>
                  <h5 className="card-text">
                    {response[i]?.data[0]?.Temperature.Imperial.Value} F
                  </h5>
                  <h6 className="card-text">
                    {response[i]?.data[0]?.WeatherText}
                  </h6>
                  <img
                    src={iconsSwitch1(response[i]?.data[0]?.WeatherText)}
                    alt="none"
                  />

                  <Button
                    className={"btn btn-dark"}
                    handleClick={e => {
                      MyLocalStorage(e, i, el.cityName);
                      setLocal(
                        JSON.parse(localStorage.getItem("weatherInfo")) || []
                      );
                    }}
                    icon={
                      <i
                        id={checkFavorite.length | []}
                        className="fas fa-star"
                        style={{
                          color:
                            local[local.length - 1]?.isFavorite === true
                              ? "#ffe000"
                              : "white"
                        }}
                      ></i>
                    }
                  />
                </div>
              );
            })}
          </div>
        )}
        <br />
        <div className="favorite-warnning">
          <button
            type="button"
            className="btn btn-light btn-lg"
            data-toggle="modal"
            data-target="#myModal"
          >
            <span className="fa fa-trash" style={{ fontSize: "20px" }}></span>{" "}
            Delete all favorites
          </button>

          <div className="modal fade" id="myModal" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close1" data-dismiss="modal">
                    &times;
                  </button>
                  <h4 className="modal-title">Warnning</h4>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete all your favorites?</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-info"
                    data-dismiss="modal"
                    onClick={removeAll}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (localStorage.getItem("weatherInfo") === null) {
    return (
      <div>
        <div className="toggle-container">
          <span className="toggle">
            <Toggleswitch />
          </span>
        </div>

        <div
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: "30px",
            // marginLeft: "30px",
            textAlign: "center"
          }}
        >
          <br />
          <SplitText initialPose="exit" pose="enter" charPoses={charPoses}>
            You dont have favorite
          </SplitText>
          <br />
          <SplitText initialPose="exit" pose="enter" charPoses={charPoses}>
            choose from the home page
          </SplitText>
        </div>
      </div>
    );
  }
};

export default Favorite;
