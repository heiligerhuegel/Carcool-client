import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Container, Button, Form, Row, Col } from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";

function EditRatingPage() {
  const { rating } = useParams();

  const [userid, setuserid] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");

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
    const getData = async () => {
      const response = await axios.get(`http://localhost:5005/api/rating/${rating}`);

      console.log(response.data);

      setTitle(response.data.title);
      setDescription(response.data.description);

      setBrand(response.data.carId.brand);
      setModel(response.data.carId.model);

      setStyle(response.data.ratings.weekend.style);
      setAcceleration(response.data.ratings.weekend.acceleration);
      setHandling(response.data.ratings.weekend.handling);
      setFun(response.data.ratings.weekend.funfactor);
      setCool(response.data.ratings.weekend.coolfactor);

      setFeatures(response.data.ratings.daily.features);
      setComfort(response.data.ratings.daily.comfort);
      setQuality(response.data.ratings.daily.quality);
      setPracticality(response.data.ratings.daily.practicality);
      setValue(response.data.ratings.daily.value);
    };
    getData();
  }, []);

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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // Create an object representing the request body

      const newRating = {
        title,
        description,
        totalScore,
        ratings: {
          weekend: { style, acceleration, handling, funfactor, coolfactor },
          daily: { features, comfort, quality, practicality, value },
        },
      };
      console.log(newRating);
      const response = await axios.put(`http://localhost:5005/api/rating/${rating}`, newRating);
      console.log(response);
      navigate(`/rating/${response.data._id}`);
    } catch (error) {
      // If the request resolves with an error, set the error message in the state
      setErrorMessage("Something went wrong");
    }
  };
  return (
    <Container>
      <h1>Edit this Review:</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row}>
          <Col xs="6">
            <Form.Label>Brand:</Form.Label>
          </Col>
          <Col xs="6">
            <Form.Label>{brand}</Form.Label>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Col xs="6">
            <Form.Label>Model:</Form.Label>
          </Col>
          <Col xs="6">
            <Form.Label>{model}</Form.Label>
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
            <RangeSlider value={style} onChange={handleStyle} step={1} min="0" max="10" />
          </Col>
        </Form.Group>
        <Form.Group className="mb-3" as={Row}>
          <Col xs="6">
            <Form.Label>Acceleration:</Form.Label>
          </Col>
          <Col xs="6">
            <RangeSlider value={acceleration} onChange={handleAcceleration} step={1} min="0" max="10" />
          </Col>
        </Form.Group>
        <Form.Group className="mb-3" as={Row}>
          <Col xs="6">
            <Form.Label>Handling:</Form.Label>
          </Col>
          <Col xs="6">
            <RangeSlider value={handling} onChange={handleHandling} step={1} min="0" max="10" />
          </Col>
        </Form.Group>
        <Form.Group className="mb-3" as={Row}>
          <Col xs="6">
            <Form.Label>Fun:</Form.Label>
          </Col>
          <Col xs="6">
            <RangeSlider value={funfactor} onChange={handleFun} step={1} min="0" max="10" />
          </Col>
        </Form.Group>
        <Form.Group className="mb-3" as={Row}>
          <Col xs="6">
            <Form.Label>Cool:</Form.Label>
          </Col>
          <Col xs="6">
            <RangeSlider value={coolfactor} onChange={handleCool} step={1} min="0" max="10" />
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
            <RangeSlider value={features} onChange={handleFeature} step={1} min="0" max="10" />
          </Col>
        </Form.Group>
        <Form.Group className="mb-3" as={Row}>
          <Col xs="6">
            <Form.Label>Comfort:</Form.Label>
          </Col>
          <Col xs="6">
            <RangeSlider value={comfort} onChange={handleComfort} step={1} min="0" max="10" />
          </Col>
        </Form.Group>
        <Form.Group className="mb-3" as={Row}>
          <Col xs="6">
            <Form.Label>Quality:</Form.Label>
          </Col>
          <Col xs="6">
            <RangeSlider value={quality} onChange={handleQuality} step={1} min="0" max="10" />
          </Col>
        </Form.Group>
        <Form.Group className="mb-3" as={Row}>
          <Col xs="6">
            <Form.Label>Practicality:</Form.Label>
          </Col>
          <Col xs="6">
            <RangeSlider value={practicality} onChange={handlePracticality} step={1} min="0" max="10" />
          </Col>
        </Form.Group>
        <Form.Group className="mb-3" as={Row}>
          <Col xs="6">
            <Form.Label>Value:</Form.Label>
          </Col>
          <Col xs="6">
            <RangeSlider value={value} onChange={handleValue} step={1} min="0" max="10" />
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
        <Button type="submit">Submit</Button>
      </Form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </Container>
  );
}

export default EditRatingPage;
