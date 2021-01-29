import React from "react";
import PropTypes from "prop-types";

const Like = (props) => {
  let classes = "fa fa-heart";
  classes += !props.liked ? "-o" : "";
  return (
    <i
      className={classes}
      style={{ cursor: "pointer" }}
      onClick={props.onClick}
    />
  );
};

Like.propTypes = {
  liked: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};
export default Like;
