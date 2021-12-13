import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import { Container, Button, Carousel, Card } from "react-bootstrap";

function AllCarsPage() {
  const [cars, setCars] = useState([]);
  useEffect(() => {
    const getCars = async () => {
      const result = await axios.get("http://localhost:5005/api/cars");
      setCars(result.data);
    };
    getCars();
  }, []);

  return (
    <Container>
      <h2> All the rated Cars </h2>
      {cars &&
        cars.map((element) => {
          return (
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={element.image} />
              <Card.Body>
                <Card.Title>{element.model}</Card.Title>
                <Card.Text>{element.brand}</Card.Text>
                <Link to={`/car/${element._id}`}>
                  <Button variant="primary">somewhere</Button>
                </Link>
              </Card.Body>
            </Card>
          );
        })}
    </Container>
  );
}

export default AllCarsPage;
