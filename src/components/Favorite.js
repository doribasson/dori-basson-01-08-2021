import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
import {
  removeAllAction,
  loadFavoritesAction
} from "../redux/actions/favoriteAction";
import "bootstrap/dist/css/bootstrap.min.css";
import SplitText from "react-pose-text";
import Toggleswitch from "../components/Toggleswitch";
import Cards from "./Cards";
import Loading from "./Loading";
import Modal from "./Modal";

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
          <Loading />
        ) : (
          <div className="container-favorite-card">
            <Cards
              local={local}
              setLocal={setLocal}
              list={local}
              response={response}
              isFavoriteCard={true}
              checkFavorite={checkFavorite}
            />
            <br />
          </div>
        )}
        <Modal removeAll={removeAll} />
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
