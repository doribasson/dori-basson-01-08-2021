import HomeCard from "./HomeCard";
import FavoriteCard from "./FavoriteCard";

const cards = ({
  list,
  response,
  flagToggle,
  cityId,
  isFavoriteCard,
  checkFavorite,
  local,
  setLocal
}) => {
  return (
    <>
      {list.map((el, i) => {
        if (isFavoriteCard === false) {
          return (
            <HomeCard
              el={el}
              key={i}
              flagToggle={flagToggle}
              cityId={cityId}
              checkFavorite={checkFavorite}
            />
          );
        } else
          return (
            <FavoriteCard
              checkFavorite={checkFavorite}
              el={el}
              key={i}
              response={response}
              local={local}
              setLocal={setLocal}
            />
          );
      })}
    </>
  );
};

export default cards;
