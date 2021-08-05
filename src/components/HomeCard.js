import moment from "moment";
import { iconsSwitch1 } from "../redux/actions/searchAction";

const HomeCard = ({ el, cityId, flagToggle }) => {
  const fahrenheitMin = el.Temperature.Minimum.Value;
  const fahrenheitMax = el.Temperature.Maximum.Value;
  const CelsiusMin = ((5 / 9) * (fahrenheitMin - 32)).toFixed(0);
  const CelsiusMax = ((5 / 9) * (fahrenheitMax - 32)).toFixed(0);
  return (
    <div className="item">
      <h5 className="card-title2">{moment(el.Date).format("L")}</h5>
      <h5 className="card-title2">{moment(el.Date).format("dddd")}</h5>
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
};

export default HomeCard;
