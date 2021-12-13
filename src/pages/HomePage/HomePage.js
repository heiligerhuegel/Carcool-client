import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Button, Carousel, Card, Col, Row } from "react-bootstrap";

function HomePage() {
  const [cars, setCars] = useState([]);
  const [carImages, setCarImages] = useState(null);

  useEffect(() => {
    const getCars = async () => {
      const result = await axios.get("http://localhost:5005/api/cars");
      setCars(result.data);
      console.log(result.data);
    };
    getCars();
  }, []);

  useEffect(() => {
    const carsImagesData = cars.map((element) => {
      if (element.image[0] !== undefined && element.image[0] !== null) {
        console.log(element.image[0]);
        return element.image[0];
      }
    });
    setCarImages(carsImagesData);
    console.log(carsImagesData);
  }, [cars]);

  return (
    <Container>
      <h1>Welcome to Carcool</h1>

      <Container>
        {carImages && (
          <Carousel>
            {carImages.map((element) => {
              return (
                <Carousel.Item interval={1000}>
                  <img className="d-block w-100" src={element} alt="First slide" />
                </Carousel.Item>
              );
            })}
          </Carousel>
        )}
      </Container>

      <div className="container-fluid">
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
      </div>
    </Container>
  );
}

export default HomePage;
