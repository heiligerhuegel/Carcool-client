import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Container, Button, Carousel, Card } from "react-bootstrap";

function AllRatingsPage() {
  const { carId } = useParams();

  const [car, setCar] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`http://localhost:5005/api/onecar/${carId}`);
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
    <Container>
      {car && (
        <div>
          <h2>{car.brand}</h2>
          <h3>{car.model}</h3>
          {ratings &&
            ratings.map((element) => {
              return (
                <Card style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={element.image} />
                  <Card.Body>
                    <Card.Title>{element.title}</Card.Title>
                    <Card.Text>{element.totalScore}</Card.Text>
                    <Link to={`/rating/${element._id}`}>
                      <Button variant="primary">somewhere</Button>
                    </Link>
                  </Card.Body>
                </Card>
              );
            })}
        </div>
      )}
    </Container>
  );
}

export default AllRatingsPage;
