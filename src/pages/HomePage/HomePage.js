import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Button, Carousel, Card, Col, Row } from "react-bootstrap";

function HomePage() {
  const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005";

  const [cars, setCars] = useState(null);
  const [carImages, setCarImages] = useState(null);

  const [show, setShow] = useState(false);

  const [news, setnews] = useState(null);

  useEffect(() => {
    const getCars = async () => {
      const result = await axios.get(`${API_URL}/api/cars`);

      setCars(result.data);
      // console.log(result.data);
    };
    getCars();
  }, []);

  useEffect(() => {
    let newsData;
    const getNewsData = async () => {
      var url =
        "https://api.currentsapi.services/v1/search?" +
        "keywords=Automotive&language=en&" +
        "apiKey=DboRVCe6pJJTG3oUOkOFKY8RkP2Nc62kikBNvkinyLvG7yTg";
      var req = new Request(url);
      const response = await axios.get(url);
      console.log(response.data.news);
      setnews(response.data.news);
    };
    getNewsData();
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
    <Container key="landingpage">
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
      {news && (
        <Container className="mx-auto">
          <h2 className="my-3 mb-4 text-center"> Latest Automotive News: </h2>
          <Row>
            {news &&
              news.map((element) => {
                return (
                  <Col>
                    <Card className="mx-auto my-3" style={{ width: "13rem" }}>
                      {element.image !== "None" && <Card.Img variant="top" src={element.image} />}
                      <Card.Body>
                        <Card.Title>{element.title}</Card.Title>
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
