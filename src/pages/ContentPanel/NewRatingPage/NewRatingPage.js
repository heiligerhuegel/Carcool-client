import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import fileService from "./../../../services/file.service";

import { Container, Button, Form, Row, Col } from "react-bootstrap";

function NewRatingPage() {
  const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005";
  const [userid, setuserid] = useState("");
  const [allCars, setAllCars] = useState(null);
  const [allModels, setAllModels] = useState(null);

  const [uploadDone, setuploadDone] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");

  const [image, setImage] = useState("");

  const [totalScore, setTotalScore] = useState(0);

  const [style, setStyle] = useState(0);
  const [acceleration, setAcceleration] = useState(0);
  const [handling, setHandling] = useState(0);
  const [funfactor, setFun] = useState(0);
  const [coolfactor, setCool] = useState(0);
  const [weekend, setWeekend] = useState(0);

  const [features, setFeatures] = useState(0);
  const [comfort, setComfort] = useState(0);
  const [quality, setQuality] = useState(0);
  const [practicality, setPracticality] = useState(0);
  const [value, setValue] = useState(0);
  const [daily, setDaily] = useState(0);

  useEffect(() => {
    const getAllBrands = async () => {
      const response = await axios.get(`${API_URL}/api/allcars`);
      setAllCars(response.data.Results);
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

  useEffect(() => {
    const weekendTotal = +style + +acceleration + +handling + +funfactor + +coolfactor;
    setWeekend(weekendTotal);
  }, [style, acceleration, handling, funfactor, coolfactor]);

  useEffect(() => {
    const dailyTotal = +features + +comfort + +quality + +practicality + +value;
    setDaily(dailyTotal);
  }, [features, comfort, quality, practicality, value]);

  useEffect(() => {
    const subtotal = +weekend + +daily;
    setTotalScore(subtotal);
  }, [weekend, daily]);

  useEffect(() => {
    const getData = async () => {
      const authToken = localStorage.getItem("authToken");
      const response = await axios.get(`${API_URL}/api/user`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setuserid(response.data._id);
    };

    getData();
  }, []);

  const handleTitle = (e) => setTitle(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);

  const handleStyle = (e) => setStyle(e.target.value);
  const handleAcceleration = (e) => setAcceleration(e.target.value);
  const handleHandling = (e) => setHandling(e.target.value);
  const handleFun = (e) => setFun(e.target.value);
  const handleCool = (e) => setCool(e.target.value);

  const handleFeature = (e) => setFeatures(e.target.value);
  const handleComfort = (e) => setComfort(e.target.value);
  const handleQuality = (e) => setQuality(e.target.value);
  const handlePracticality = (e) => setPracticality(e.target.value);
  const handleValue = (e) => setValue(e.target.value);

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const handleAllCarBrands = async (e) => {
    setBrand(e.target.value);
  };

  const handleAllCarModels = async (e) => {
    setModel(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // Create an object representing the request body

      const newRating = {
        user: userid,
        brand,
        model,
        title,
        image,
        description,
        totalScore,
        ratings: {
          weekend: { style, acceleration, handling, funfactor, coolfactor },
          daily: { features, comfort, quality, practicality, value },
        },
      };
      console.log(newRating);
      const response = await axios.post(`${API_URL}/api/newrating`, newRating);
      console.log(response);
      navigate(`/rating/${response.data._id}`);
    } catch (error) {
      // If the request resolves with an error, set the error message in the state
      setErrorMessage("Something went wrong");
    }
  };

  const handleFileUpload = async (e) => {
    try {
      setuploadDone("disabled");
      const uploadData = new FormData();

      uploadData.append("imageUrl", e.target.files[0]);
      const response = await fileService.uploadImage(uploadData);
      console.log(response.data.secure_url);
      setImage(response.data.secure_url);
      setuploadDone("");
    } catch (error) {
      setErrorMessage("Something went wrong");
    }
  };

  return (
    <Container className="my-3">
      <h1>Create a new Review:</h1>
      <Form onSubmit={handleSubmit}>
        <Container key="carselector">
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
        <Container>
          {brand && !allModels && (
            <div class="d-flex justify-content-center">
              <div class="spinner-border" role="status"></div>
            </div>
          )}
        </Container>

        {model && (
          <Container>
            <Form.Group className="mb-3" as={Row}>
              <Col xs="6">
                <Form.Label>Title:</Form.Label>
              </Col>
              <Col xs="12">
                <Form.Control type="text" value={title} onChange={handleTitle} />
                <Form.Text className="text-muted">Please give your rating a title.</Form.Text>
              </Col>
            </Form.Group>

            <Form.Group className="mb-3" as={Row}>
              <Col xs="6">
                <Form.Label>Description:</Form.Label>
              </Col>
              <Col xs="12">
                <Form.Control as="textarea" rows={3} value={description} onChange={handleDescription} />
                <Form.Text className="text-muted">Please give your rating a description.</Form.Text>
              </Col>
            </Form.Group>

            <Form.Group className="mb-3" as={Row}>
              <Col xs="6">
                <Form.Label>Style: </Form.Label>
              </Col>
              <Col xs="6">
                <Form.Range value={style} onChange={handleStyle} step={1} min="0" max="10" />
              </Col>
            </Form.Group>

            <Form.Group className="mb-3" as={Row}>
              <Col xs="6">
                <Form.Label>Acceleration:</Form.Label>
              </Col>
              <Col xs="6">
                <Form.Range value={acceleration} onChange={handleAcceleration} step={1} min="0" max="10" />
              </Col>
            </Form.Group>

            <Form.Group className="mb-3" as={Row}>
              <Col xs="6">
                <Form.Label>Handling:</Form.Label>
              </Col>
              <Col xs="6">
                <Form.Range value={handling} onChange={handleHandling} step={1} min="0" max="10" />
              </Col>
            </Form.Group>

            <Form.Group className="mb-3" as={Row}>
              <Col xs="6">
                <Form.Label>Fun:</Form.Label>
              </Col>
              <Col xs="6">
                <Form.Range value={funfactor} onChange={handleFun} step={1} min="0" max="10" />
              </Col>
            </Form.Group>
            <Form.Group className="mb-3" as={Row}>
              <Col xs="6">
                <Form.Label>Cool:</Form.Label>
              </Col>
              <Col xs="6">
                <Form.Range value={coolfactor} onChange={handleCool} step={1} min="0" max="10" />
              </Col>
            </Form.Group>

            <Form.Group className="mb-3" as={Row}>
              <Col xs="6">
                <Form.Label>Weekend Total:</Form.Label>
              </Col>
              <Col xs="6">
                <Form.Control type="number" value={weekend} readOnly />
              </Col>
            </Form.Group>

            <Form.Group className="mb-3" as={Row}>
              <Col xs="6">
                <Form.Label>Features:</Form.Label>
              </Col>
              <Col xs="6">
                <Form.Range value={features} onChange={handleFeature} step={1} min="0" max="10" />
              </Col>
            </Form.Group>

            <Form.Group className="mb-3" as={Row}>
              <Col xs="6">
                <Form.Label>Comfort:</Form.Label>
              </Col>
              <Col xs="6">
                <Form.Range value={comfort} onChange={handleComfort} step={1} min="0" max="10" />
              </Col>
            </Form.Group>

            <Form.Group className="mb-3" as={Row}>
              <Col xs="6">
                <Form.Label>Quality:</Form.Label>
              </Col>
              <Col xs="6">
                <Form.Range value={quality} onChange={handleQuality} step={1} min="0" max="10" />
              </Col>
            </Form.Group>

            <Form.Group className="mb-3" as={Row}>
              <Col xs="6">
                <Form.Label>Practicality:</Form.Label>
              </Col>
              <Col xs="6">
                <Form.Range value={practicality} onChange={handlePracticality} step={1} min="0" max="10" />
              </Col>
            </Form.Group>

            <Form.Group className="mb-3" as={Row}>
              <Col xs="6">
                <Form.Label>Value:</Form.Label>
              </Col>
              <Col xs="6">
                <Form.Range value={value} onChange={handleValue} step={1} min="0" max="10" />
              </Col>
            </Form.Group>

            <Form.Group className="mb-3" as={Row}>
              <Col xs="6">
                <Form.Label>Daily Total:</Form.Label>
              </Col>
              <Col xs="6">
                <Form.Control type="number" value={daily} readOnly />
              </Col>
            </Form.Group>

            <Form.Group className="mb-3" as={Row}>
              <Col xs="6">
                <Form.Label>Total Score:</Form.Label>
              </Col>
              <Col xs="6">
                <Form.Control type="number" value={totalScore} readOnly />
              </Col>
            </Form.Group>

            <Form.Group className="mb-3" as={Row}>
              <Col xs="6">
                <Form.Label>Upload an Image:</Form.Label>
              </Col>
              <Col xs="6">
                <Form.Control type="file" size="sm" onChange={handleFileUpload} />
              </Col>
            </Form.Group>
            {title && description && (
              <Col className="">
                <Button type="submit" className={`${uploadDone}`}>
                  Submit
                </Button>
              </Col>
            )}
          </Container>
        )}
      </Form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </Container>
  );
}

export default NewRatingPage;
