import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Container, Button, Row, Col } from "react-bootstrap";

function OneRatingPage() {
  const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005";
  const { ratingId } = useParams();

  const [rating, setRating] = useState(null);

  const [totalScoreAvg, setTotalScoreAvg] = useState(0);

  const [totalDailyAvg, setTotalDailyAvg] = useState(0);
  const [totalWeeklyAvg, setTotalWeeklyAvg] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${API_URL}/api/rating/${ratingId}`);
      setRating(result.data);
      console.log(result.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    let dailyScore = 0;
    const getDaily = () => {
      if (rating) {
        for (const property in rating.ratings.daily) {
          dailyScore += rating.ratings.daily[property];
        }

        console.log(dailyScore);
        setTotalDailyAvg(dailyScore);
      }
    };
    getDaily();
  }, [rating]);

  useEffect(() => {
    let weeklyScore = 0;
    const getWeekly = () => {
      if (rating) {
        for (const property in rating.ratings.weekend) {
          weeklyScore += rating.ratings.weekend[property];
        }
      }

      console.log(weeklyScore);
      setTotalWeeklyAvg(weeklyScore);
    };
    getWeekly();
  }, [rating]);

  useEffect(() => {
    const getTotal = () => {
      const totalScore = totalDailyAvg + totalWeeklyAvg;
      setTotalScoreAvg(totalScore);
    };

    getTotal();
  }, [totalDailyAvg, totalWeeklyAvg]);

  return (
    <Container>
      {rating && (
        <Container>
          <Container className="my-3">
            <Row>
              <Col>
                <h1>{rating.carId.model}</h1>
              </Col>
              <Col>
                <h2>{rating.carId.brand}</h2>
              </Col>
            </Row>
            <Row>
              <Col>
                <h2>{rating.title}</h2>
              </Col>
            </Row>
            <Row>
              <h6>Created by: {rating.user.name}</h6>
            </Row>
            <Row>
              <Col>
                <h4>Total Score: </h4>
              </Col>
              <Col>
                <h4>{totalScoreAvg}</h4>
              </Col>
            </Row>
          </Container>
          <Container className="my-3">
            <Row>
              <Col>
                <h6>Acceleration: </h6>
              </Col>
              <Col>{rating.ratings.weekend.acceleration}</Col>
            </Row>
            <Row>
              <Col>
                <h6>Coolfactor: </h6>
              </Col>
              <Col>{rating.ratings.weekend.coolfactor}</Col>
            </Row>
            <Row>
              <Col>
                <h6>Funfactor: </h6>
              </Col>
              <Col>{rating.ratings.weekend.funfactor}</Col>
            </Row>
            <Row>
              <Col>
                <h6>Handling: </h6>
              </Col>
              <Col>{rating.ratings.weekend.handling}</Col>
            </Row>
            <Row>
              <Col>
                <h6>Style:</h6>
              </Col>
              <Col> {rating.ratings.weekend.style}</Col>
            </Row>
            <Row>
              <Col>
                <h5>Weekend Score: </h5>
              </Col>
              <Col>
                <h5>{totalWeeklyAvg}</h5>
              </Col>
            </Row>
          </Container>
          <Container className="my-3">
            <Row>
              <Col>
                <h6>Comfort: </h6>
              </Col>
              <Col>{rating.ratings.daily.comfort}</Col>
            </Row>
            <Row>
              <Col>
                <h6>Features: </h6>
              </Col>
              <Col>{rating.ratings.daily.features}</Col>
            </Row>
            <Row>
              <Col>
                <h6>Practicality: </h6>
              </Col>
              <Col>{rating.ratings.daily.practicality}</Col>
            </Row>
            <Row>
              <Col>
                <h6>Quality: </h6>
              </Col>
              <Col>{rating.ratings.daily.quality}</Col>
            </Row>
            <Row>
              <Col>
                <h6>Value: </h6>
              </Col>
              <Col>{rating.ratings.daily.value}</Col>
            </Row>
            <Row>
              <Col>
                <h5>Daily Score: </h5>
              </Col>
              <Col>
                <h5>{totalDailyAvg}</h5>
              </Col>
            </Row>
          </Container>

          <Container className="my-3">
            <h5>About the Car:</h5>
            <p>{rating.description}</p>
          </Container>
        </Container>
      )}
    </Container>
  );
}

export default OneRatingPage;
