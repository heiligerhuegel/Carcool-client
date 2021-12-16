import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import { Container, Button, Form, Card, Row, Col } from "react-bootstrap";

function AllCarsPage() {
  const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005";
  const [cars, setCars] = useState(null);

  const [allCars, setAllCars] = useState(null);
  const [allModels, setAllModels] = useState(null);

  const [filteredBrands, setfilteredBrands] = useState(null);
  const [filteredModels, setfilteredModels] = useState(null);

  const [showMessage, setshowMessage] = useState(false);

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");

  useEffect(() => {
    const getCars = async () => {
      const response = await axios.get(`${API_URL}/api/cars`);
      setCars(response.data);
      // console.log(response.data);
    };
    getCars();
  }, []);

  useEffect(() => {
    const getAllBrands = async () => {
      const response = await axios.get(`${API_URL}/api/allcars`);
      setAllCars(response.data.Results);
      // console.log(response.data);
    };
    getAllBrands();
  }, []);

  useEffect(() => {
    const getAllModels = async () => {
      if (brand) {
        const response = await axios.get(
          `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${brand}?format=json`
        );
        setAllModels(response.data.Results);
      }
    };
    getAllModels();
  }, [brand]);

  const handleAllCarBrands = async (e) => {
    setBrand(e.target.value);
    const filterBrandsData = await cars.filter((element) => {
      if (element.brand === e.target.value) {
        return true;
      }
    });
    setfilteredBrands(filterBrandsData);
    setfilteredModels(null);
    if (filterBrandsData.length < 1) {
      setshowMessage(true);
    } else {
      setshowMessage(false);
    }
    // console.log(filterBrandsData);
  };

  const handleAllCarModels = async (e) => {
    setModel(e.target.value);
    const filterModelsData = await cars.filter((element) => {
      if (element.brand === brand && element.model === e.target.value) {
        return true;
      }
    });
    setfilteredBrands(filterModelsData);
    if (filterModelsData.length < 1) {
      setshowMessage(true);
    } else {
      setshowMessage(false);
    }

    // console.log(filterModelsData);
  };
  const resetFilter = async (e) => {
    setModel(null);
    setBrand(null);
    setAllModels(null);
    setfilteredBrands(null);
    setfilteredModels(null);
    setshowMessage(false);
  };

  return (
    <Container className="mx-auto">
      <h2 className="my-3 mb-4 text-center"> All the rated Cars </h2>

      <Container className="my-3" key="carselector">
        {allCars && (
          <Form.Group as={Row}>
            <Col xs="6">
              <Form.Label>Brand:</Form.Label>
            </Col>
            <Col xs="6">
              <Form.Select placeholder="Select a Brand" onChange={handleAllCarBrands}>
                <option>Select a Car Brand</option>
                {allCars &&
                  allCars.map((element) => {
                    return <option>{element.Make_Name}</option>;
                  })}
              </Form.Select>
            </Col>
          </Form.Group>
        )}
        <br />
        {allModels && (
          <Form.Group as={Row}>
            <Col xs="6">
              <Form.Label>Model:</Form.Label>
            </Col>
            <Col xs="6">
              <Form.Select onChange={handleAllCarModels}>
                <option>Select a Car Model</option>
                {allModels &&
                  allModels.map((element) => {
                    return <option value={element.Model_Name}>{element.Model_Name}</option>;
                  })}
              </Form.Select>
            </Col>
          </Form.Group>
        )}
      </Container>
      <Container className="my-3">
        <Row>
          <Col>
            <Link to="/newrating">
              <Button>Create a rating</Button>
            </Link>
          </Col>
          <Col>
            <Button onClick={resetFilter}>Reset Filter</Button>
          </Col>
        </Row>
      </Container>

      <Container className="my-3">
        {brand && !allModels && (
          <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status"></div>
          </div>
        )}
      </Container>

      <Container>
        {!filteredBrands && (
          <Row>
            {cars &&
              cars.map((element) => {
                return (
                  <Col>
                    <Card className="mx-auto my-3" style={{ width: "13rem" }}>
                      {/* <Card.Img variant="top" src={element.image[0]} /> */}
                      <Card.Body>
                        <Card.Title>{element.model}</Card.Title>
                        <Card.Text>{element.brand}</Card.Text>
                        <Link to={`/car/${element._id}`}>
                          <Button variant="secondary">Read More</Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
          </Row>
        )}
        {filteredBrands && (
          <Row>
            {!filteredModels &&
              filteredBrands.map((element) => {
                return (
                  <Col>
                    <Card className="mx-auto my-3" style={{ width: "13rem" }}>
                      {/* <Card.Img variant="top" src={element.image[0]} /> */}
                      <Card.Body>
                        <Card.Title>{element.model}</Card.Title>
                        <Card.Text>{element.brand}</Card.Text>
                        <Link to={`/car/${element._id}`}>
                          <Button variant="secondary">Read More</Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
          </Row>
        )}
        {showMessage && (
          <Container>
            <h2>No Ratings yet!</h2>
          </Container>
        )}
      </Container>
    </Container>
  );
}

export default AllCarsPage;
