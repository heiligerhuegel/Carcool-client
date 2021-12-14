import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Button, Carousel, Card, Col, Row } from "react-bootstrap";

function HomePage() {
  const [cars, setCars] = useState(null);
  const [carImages, setCarImages] = useState(null);

  const [show, setShow] = useState(false);

  useEffect(() => {
    const getCars = async () => {
      const result = await axios.get("http://localhost:5005/api/cars");
      setCars(result.data);
      console.log(result.data);
    };
    getCars();
  }, []);

  useEffect(() => {
    if (cars) {
      console.log(cars);
      const carImagesData = cars
        .filter((element) => {
          if (element.image[0] === undefined || element.image[0] === null || element.image[0] === "") {
            return false;
          } else {
            return true;
          }
        })
        .map((element) => {
          return element.image[0];
        });

      console.log("carImagesData", carImagesData);
      setCarImages(carImagesData);
      if (carImagesData.length > 0) {
        setShow(true);
      }
    }
  }, [cars]);

  return (
    <Container>
      <h1>Welcome to Carcool</h1>
      {show && (
        <Container>
          <Carousel>
            {carImages.map((element) => {
              return (
                <Carousel.Item interval={1000}>
                  <img className="d-block w-100" src={element} alt="First slide" />
                </Carousel.Item>
              );
            })}
          </Carousel>
        </Container>
      )}
      {cars && (
        <Container>
          <h2> All the rated Cars </h2>
          <Row className="justify-content-md-center">
            {cars &&
              cars.map((element) => {
                return (
                  <Col>
                    <Card style={{ width: "16rem" }}>
                      <Card.Img variant="top" src={element.image} />
                      <Card.Body>
                        <Card.Title>{element.model}</Card.Title>
                        <Card.Text>{element.brand}</Card.Text>
                        <Link to={`/car/${element._id}`}>
                          <Button variant="primary">See More</Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
          </Row>
        </Container>
      )}
    </Container>
  );
}

export default HomePage;
