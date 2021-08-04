const Button = ({ className, handleClick, icon, id = null }) => {
  return (
    <button className={className} onClick={handleClick} id={id}>
      {icon}
    </button>
  );
};

export default Button;
