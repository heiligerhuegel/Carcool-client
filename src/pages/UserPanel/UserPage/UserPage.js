import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./../../../context/auth.context";

function UserPage() {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const authToken = localStorage.getItem("authToken");
      const response = await axios.get("http://localhost:5005/api/user", {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      setRatings(response.data.ratings);
    };

    getData();
  }, []);

  return (
    <div>
      <h1>Profile Page</h1>

      {ratings &&
        ratings.map((element) => {
          return (
            <div className="rating" key={element._id}>
              <Link to={`/rating/${element._id}`}>
                <div key={element._id}>
                  <h3>{element.title}</h3>
                  <p>{element.description}</p>
                </div>
              </Link>
            </div>
          );
        })}
    </div>
  );
}

export default UserPage;
