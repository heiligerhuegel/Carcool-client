import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function HomePage() {
  const [cars, setCars] = useState([]);
  const [carImages, setCarImages] = useState([]);

  useEffect(async () => {
    const result = await axios.get("http://localhost:5005/api/cars");
    setCars(result.data);
  }, []);

  useEffect(() => {
    const carsImagesData = cars.map((element) => {
      return element.image[0];
    });
    setCarImages(carsImagesData);
  }, [cars]);

  return (
    <div key="landing">
      <div>
        <h1>Welcome to Carcool</h1>
      </div>

      <div className="images">
        {carImages &&
          carImages.map((element) => {
            return (
              <div className="image" key={element._id}>
                <img src={element} alt="Car" />
              </div>
            );
          })}
      </div>

      <div>
        <h2> All the rated Cars </h2>
        {cars &&
          cars.map((element) => {
            return (
              <div key={element._id}>
                <h3>{element.brand}</h3>
                <h2>{element.model}</h2>
              </div>
            );
          })}
      </div>

      <div className="debug">
        <Link to="/user">user</Link>
        <br />

        <Link to="/user/edit">user,edit</Link>
        <br />
        <Link to="/newrating">newrating</Link>
        <br />
        <Link to="/allcars">allcars</Link>
        <br />
        <Link to="/adminpanel">adminpanel</Link>
        <br />
        <Link to="/adminpanel/:userId">amin one user</Link>
        <br />
        <Link to="/adminpanel/:userId/ratings">admin one user ratings</Link>
        <br />
        <Link to="/adminpanel/:userId/editrating/:ratingId">
          admin edit one rating
        </Link>
        <br />
        <Link to="/adminpanel/:userId/edituser/">admin edit one user</Link>
        <br />
      </div>
    </div>
  );
}

export default HomePage;
