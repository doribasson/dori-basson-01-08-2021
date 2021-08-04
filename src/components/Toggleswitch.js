import { useEffect } from "react";
import Switch from "react-switch";
import { themeColor } from "../actions/searchAction";
import { useDispatch, useSelector } from "react-redux";

const Toggleswitch = () => {
  const theme = useSelector(state => state.searchReducer.theme);
  const checked = useSelector(state => state.searchReducer.checked);
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.classList.add(theme);
  }, [theme]);

  const handleChange = () => {
    if (theme === "light-theme") {
      document.body.classList.remove("light-theme");
      document.body.classList.add("dark-theme");
      dispatch(themeColor(theme, checked));
    } else if (theme === "dark-theme") {
      document.body.classList.remove("dark-theme");
      document.body.classList.add("light-theme");
      dispatch(themeColor(theme, checked));
    }
  };

  return (
    <>
      <label htmlFor="material-switch">
        <Switch
          className="Toggle-switch"
          id="material-switch"
          onChange={handleChange}
          checked={checked}
          onColor="#2e59a0"
          onHandleColor="#fff"
          offHandleColor="#fff"
          offColor="#000000"
          handleDiameter={30}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          height={20}
          width={48}
        />
      </label>
    </>
  );
};

export default Toggleswitch;
