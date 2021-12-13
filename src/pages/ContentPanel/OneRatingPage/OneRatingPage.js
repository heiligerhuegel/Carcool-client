import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Container, Button, Carousel, Card } from "react-bootstrap";

function OneRatingPage() {
  const { ratingId } = useParams();

  const [rating, setRating] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`http://localhost:5005/api/rating/${ratingId}`);
      setRating(result.data);
      console.log(result.data);
    };
    fetchData();
  }, []);

  return (
    <Container>
      {rating && (
        <div className="container-fluid">
          <Card style={{ width: "100%" }}>
            <Card.Img variant="top" src={rating.image} />
            <Card.Body>
              <Card.Title>{rating.carId.model}</Card.Title>
              <Card.Text>{rating.carId.brand}</Card.Text>
              <Card.Text>{rating.user.name}</Card.Text>
              <Card.Text>{rating.carId.overallTotalScore}</Card.Text>
              <Card.Text>{rating.description}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      )}
    </Container>
  );
}

export default OneRatingPage;
