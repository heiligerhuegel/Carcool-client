import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function AllRatingsPage() {
  const { carId } = useParams();

  const [car, setCar] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `http://localhost:5005/api/onecar/${carId}`
      );
      setCar(result.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const ratingsData = car.ratings;
    setRatings(ratingsData);
  }, [car]);

  useEffect(() => {
    const imagesData = car.image;
    setImages(imagesData);
    console.log(images);
  }, [car]);

  return (
    <div>
      {car && (
        <div>
          <div className="allimages">
            {images &&
              images.map((element) => {
                return (
                  <div className="image">
                    <img src={element} alt="Car" />
                  </div>
                );
              })}
          </div>
          <h2>{car.brand}</h2>
          <h3>{car.model}</h3>
          {ratings &&
            ratings.map((element) => {
              return (
                <Link to={`/rating/${element._id}`}>
                  <div key={element._id}>
                    <h3>{element.title}</h3>
                    <p>{element.description}</p>
                  </div>
                </Link>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default AllRatingsPage;
