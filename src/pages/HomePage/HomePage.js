import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Button, Carousel, Card, Col, Row } from "react-bootstrap";

function HomePage() {
  const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005";
  const NEWS_KEY = process.env.NEWS_KEY;
  const [cars, setCars] = useState(null);
  const [carImages, setCarImages] = useState(null);

  const [show, setShow] = useState(false);

  const [news, setnews] = useState(null);

  useEffect(() => {
    const getNews = async () => {
      try {
        const response = await axios.get(`https://newsdata.io/api/1/news?apikey=${NEWS_KEY}&q=Automotive&language=en`);

        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getNews();
  }, []);

  useEffect(() => {
    const getCars = async () => {
      const result = await axios.get(`${API_URL}/api/cars`);

      setCars(result.data);
      // console.log(result.data);
    };
    getCars();
  }, []);

  useEffect(() => {
    if (cars) {
      // console.log(cars);
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

      // console.log("carImagesData", carImagesData);
      setCarImages(carImagesData);
      if (carImagesData.length > 0) {
        setShow(true);
      }
    }
  }, [cars]);

  return (
    <Container>
      <h1 className="my-3 mb-4 text-center">Welcome to Carcool</h1>
      {show && (
        <Container>
          <Carousel>
            {carImages.map((element) => {
              return (
                <Carousel.Item interval={5000}>
                  <img className="d-block w-100" src={element} alt="First slide" style={{ width: "100vw" }} />
                </Carousel.Item>
              );
            })}
          </Carousel>
        </Container>
      )}
      {cars && (
        <Container className="mx-auto">
          <h2 className="my-3 mb-4 text-center"> All the rated Cars </h2>
          <Row>
            {cars &&
              cars.map((element) => {
                return (
                  <Col>
                    <Card className="mx-auto my-3" style={{ width: "13rem" }}>
                      {/* <Card.Img variant="top" src={element.image[0]} /> */}
                      <Card.Body>
                        <Card.Title>{element.brand}</Card.Title>
                        <Card.Title>{element.model}</Card.Title>
                        <Link to={`/car/${element._id}`}>
                          <Button variant="secondary">See More</Button>
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
