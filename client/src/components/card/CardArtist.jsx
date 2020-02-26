import React from "react";
import { Link } from "react-router-dom";
// custom tools
import IconFav from "../icon/IconFavorite";
// styles
import "./../../styles/icon-color.css";

export default function CardArtist({ data }) {
  let styleColor = {
    backgroundColor: `${data.style.color}`
  };

  return (
    <div>
      <div className="color" style={styleColor}></div>
      <Link to={"/artists/" + data._id}>{data.name}</Link>
      <Link to={"/artists/" }>
        <IconFav />
      </Link>
    </div>
  );
}
