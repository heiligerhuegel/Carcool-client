import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import fileService from "./../../../services/file.service";

import { Container, Button, Form, Row, Col } from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";

function NewRatingPage() {
  const [userid, setuserid] = useState("");
  const [allCars, setAllCars] = useState(null);
  const [allModels, setAllModels] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");

  const [image, setImage] = useState("");

  const [totalScore, setTotalScore] = useState(10);

  const [style, setStyle] = useState(1);
  const [acceleration, setAcceleration] = useState(1);
  const [handling, setHandling] = useState(1);
  const [funfactor, setFun] = useState(1);
  const [coolfactor, setCool] = useState(1);
  const [weekend, setWeekend] = useState(5);

  const [features, setFeatures] = useState(1);
  const [comfort, setComfort] = useState(1);
  const [quality, setQuality] = useState(1);
  const [practicality, setPracticality] = useState(1);
  const [value, setValue] = useState(1);
  const [daily, setDaily] = useState(5);

  useEffect(() => {
    const getAllBrands = async () => {
      const response = await axios.get(`http://localhost:5005/api/allcars`);
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
      const response = await axios.get("http://localhost:5005/api/user", {
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
      const response = await axios.post("http://localhost:5005/api/newrating", newRating);
      console.log(response);
      navigate(`/rating/${response.data._id}`);
    } catch (error) {
      // If the request resolves with an error, set the error message in the state
      setErrorMessage("Something went wrong");
    }
  };
  const handleFileUpload = async (e) => {
    try {
      const uploadData = new FormData();

      uploadData.append("imageUrl", e.target.files[0]);
      const response = await fileService.uploadImage(uploadData);
      console.log(response.data);
      setImage(response.data.secure_url);
    } catch (error) {
      setErrorMessage("Something went wrong");
    }
  };

  return (
    <Container>
      <h1>Create a new Review:</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row}>
          <Col xs="6">
            <Form.Label>Brand:</Form.Label>
          </Col>
          <Col xs="6">
            <Form.Select onChange={handleAllCarBrands}>
              {allCars &&
                allCars.map((element) => {
                  return <option value={element.Make_Name}>{element.Make_Name}</option>;
                })}
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col xs="6">
            <Form.Label>Model:</Form.Label>
          </Col>
          <Col xs="6">
            <Form.Select onChange={handleAllCarModels}>
              {allModels &&
                allModels.map((element) => {
                  return <option value={element.Model_Name}>{element.Model_Name}</option>;
                })}
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group className="mb-3" as={Row}>
          <Col xs="6">
            <Form.Label>Title:</Form.Label>
          </Col>
          <Col xs="6">
            <Form.Control type="text" value={title} onChange={handleTitle} />
          </Col>
        </Form.Group>

        <Form.Group className="mb-3" as={Row}>
          <Col xs="6">
            <Form.Label>Description:</Form.Label>
          </Col>
          <Col xs="12">
            <Form.Control as="textarea" rows={3} value={description} onChange={handleDescription} />
          </Col>
        </Form.Group>

        <Form.Group className="mb-3" as={Row}>
          <Col xs="6">
            <Form.Label>Style:</Form.Label>
          </Col>
          <Col xs="6">
            <RangeSlider
              value={style}
              onChange={handleStyle}
              step={1}
              min="1"
              max="10"
              tooltipPlacement="top"
              tooltip="on"
            />
          </Col>
        </Form.Group>

        <Form.Group className="mb-3" as={Row}>
          <Col xs="6">
            <Form.Label>Acceleration:</Form.Label>
          </Col>
          <Col xs="6">
            <RangeSlider
              value={acceleration}
              onChange={handleAcceleration}
              step={1}
              min="1"
              max="10"
              tooltipPlacement="top"
              tooltip="on"
            />
          </Col>
        </Form.Group>

        <Form.Group className="mb-3" as={Row}>
          <Col xs="6">
            <Form.Label>Handling:</Form.Label>
          </Col>
          <Col xs="6">
            <RangeSlider
              value={handling}
              onChange={handleHandling}
              step={1}
              min="1"
              max="10"
              tooltipPlacement="top"
              tooltip="on"
            />
          </Col>
        </Form.Group>

        <Form.Group className="mb-3" as={Row}>
          <Col xs="6">
            <Form.Label>Fun:</Form.Label>
          </Col>
          <Col xs="6">
            <RangeSlider
              value={funfactor}
              onChange={handleFun}
              step={1}
              min="1"
              max="10"
              tooltipPlacement="top"
              tooltip="on"
            />
          </Col>
        </Form.Group>
        <Form.Group className="mb-3" as={Row}>
          <Col xs="6">
            <Form.Label>Cool:</Form.Label>
          </Col>
          <Col xs="6">
            <RangeSlider
              value={coolfactor}
              onChange={handleCool}
              step={1}
              min="1"
              max="10"
              tooltipPlacement="top"
              tooltip="on"
            />
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
            <RangeSlider
              value={features}
              onChange={handleFeature}
              step={1}
              min="1"
              max="10"
              tooltipPlacement="top"
              tooltip="on"
            />
          </Col>
        </Form.Group>

        <Form.Group className="mb-3" as={Row}>
          <Col xs="6">
            <Form.Label>Comfort:</Form.Label>
          </Col>
          <Col xs="6">
            <RangeSlider
              value={comfort}
              onChange={handleComfort}
              step={1}
              min="1"
              max="10"
              tooltipPlacement="top"
              tooltip="on"
            />
          </Col>
        </Form.Group>

        <Form.Group className="mb-3" as={Row}>
          <Col xs="6">
            <Form.Label>Quality:</Form.Label>
          </Col>
          <Col xs="6">
            <RangeSlider
              value={quality}
              onChange={handleQuality}
              step={1}
              min="1"
              max="10"
              tooltipPlacement="top"
              tooltip="on"
            />
          </Col>
        </Form.Group>

        <Form.Group className="mb-3" as={Row}>
          <Col xs="6">
            <Form.Label>Practicality:</Form.Label>
          </Col>
          <Col xs="6">
            <RangeSlider
              value={practicality}
              onChange={handlePracticality}
              step={1}
              min="1"
              max="10"
              tooltipPlacement="top"
              tooltip="on"
            />
          </Col>
        </Form.Group>

        <Form.Group className="mb-3" as={Row}>
          <Col xs="6">
            <Form.Label>Value:</Form.Label>
          </Col>
          <Col xs="6">
            <RangeSlider
              value={value}
              onChange={handleValue}
              step={1}
              min="1"
              max="10"
              tooltipPlacement="top"
              tooltip="on"
            />
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

        <Button type="submit">Sign Up</Button>
      </Form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </Container>
  );
}

export default NewRatingPage;
