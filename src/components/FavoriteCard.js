import Button from "./Button";
import { iconsSwitch1 } from "../redux/actions/searchAction";
import { MyLocalStorage } from "../redux/actions/favoriteAction";

const FavoriteCard = ({ el, i, response, local, setLocal, checkFavorite }) => {
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
      <h6 className="card-text">{response[i]?.data[0]?.WeatherText}</h6>
      <img src={iconsSwitch1(response[i]?.data[0]?.WeatherText)} alt="none" />

      <Button
        className={"btn btn-dark"}
        handleClick={e => {
          MyLocalStorage(e, i, el.cityName);
          setLocal(JSON.parse(localStorage.getItem("weatherInfo")) || []);
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
};

export default FavoriteCard;
