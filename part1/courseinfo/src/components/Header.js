import React from "react";

const Header = (props) => {
  console.log("props", props);
  return <div>{props.course}</div>;
};

export default Header;
