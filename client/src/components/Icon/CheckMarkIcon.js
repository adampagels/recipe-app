import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CheckMarkIcon = ({ regularIcon, onClick, className }) => {
  return (
    <>
      <FontAwesomeIcon
        className={className}
        icon={regularIcon && regularIcon}
        onClick={() => onClick()}
      />
    </>
  );
};

export default CheckMarkIcon;
