import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { withRouter } from "react-router-dom";

const Profile = ({ location }) => {
  const [user, setUser] = useState("");
  const getUser = () => {
    const accessToken = localStorage.getItem("auth-token");
    axios
      .get(`http://localhost:5000/users/${location.state.user}`, {
        headers: {
          "auth-token": `${accessToken}`,
        },
      })
      .then((userData) => {
        setUser(userData.data);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <h1>Profile</h1>
      <h2>{user.username}</h2>
      <RecipeCard recipes={user.recipes} />
    </>
  );
};

export default withRouter(Profile);
