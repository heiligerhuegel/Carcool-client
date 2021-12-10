import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function OneRatingPage() {
  const { ratingId } = useParams();

  const [rating, setRating] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `http://localhost:5005/api/rating/${ratingId}`
      );
      setRating(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>{rating.title}</h1>
      <h2>{rating.user}</h2>
      <p>{rating.description}</p>
    </div>
  );
}

export default OneRatingPage;
