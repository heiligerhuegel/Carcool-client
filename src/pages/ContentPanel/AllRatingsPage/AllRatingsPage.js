import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Container, Button, Row, Col, Card } from "react-bootstrap";

function AllRatingsPage() {
  const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005";
  const { carId } = useParams();

  const [car, setCar] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [images, setImages] = useState([]);

  const [totalScoreAvg, setTotalScoreAvg] = useState(0);

  const [totalDailyAvg, setTotalDailyAvg] = useState(0);
  const [totalWeeklyAvg, setTotalWeeklyAvg] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${API_URL}/api/onecar/${carId}`);
      setCar(result.data);
      console.log(result.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const ratingsData = car.ratings;
    setRatings(ratingsData);
    console.log(ratingsData);
  }, [car]);

  useEffect(() => {
    let dailyScore = 0;
    const getDaily = () => {
      if (ratings) {
        ratings.map((element) => {
          for (const property in element.ratings.daily) {
            dailyScore += element.ratings.daily[property];
          }
        });
        dailyScore = Math.round(dailyScore / ratings.length);
        console.log(dailyScore);
        setTotalDailyAvg(dailyScore);
      }
    };
    getDaily();
  }, [ratings]);

  useEffect(() => {
    let weeklyScore = 0;
    const getWeekly = () => {
      if (ratings) {
        ratings.map((element) => {
          for (const property in element.ratings.weekend) {
            weeklyScore += element.ratings.weekend[property];
          }
        });
        weeklyScore = Math.round(weeklyScore / ratings.length);
        console.log(weeklyScore);
        setTotalWeeklyAvg(weeklyScore);
      }
    };
    getWeekly();
  }, [ratings]);

  useEffect(() => {
    const getTotal = () => {
      const totalScore = (totalDailyAvg + totalWeeklyAvg) / 2;
      setTotalScoreAvg(totalScore);
    };

    getTotal();
  }, [totalDailyAvg, totalWeeklyAvg]);

  // useEffect(() => {
  //   const imagesData = car.image;
  //   setImages(imagesData);
  //   console.log(images);
  // }, [car]);

  return (
    <Container className="my-1 mx-auto text-center">
      {car && (
        <div>
          <h1 className="my-5 mb-1 text-center">{car.brand}</h1>
          <h2 className="my-4  text-center">{car.model}</h2>
          <h2 className="my-3  text-center">Average TotalScore: {totalScoreAvg}</h2>
          <h4 className="my-1  text-center">Average Weekend Score: {totalWeeklyAvg}</h4>
          <h4 className="my-1  text-center">Average Daily Score: {totalDailyAvg}</h4>
          <Container as={Row} className="my-3 mx-auto text-center">
            {ratings &&
              ratings.map((element) => {
                return (
                  <Col className="mx-auto">
                    <Card className="mx-auto my-3" style={{ width: "18rem" }}>
                      <Card.Body>
                        <Card.Title>Title: {element.title}</Card.Title>
                        <Card.Text>Totalscore: {element.totalScore}</Card.Text>
                        <Link to={`/rating/${element._id}`}>
                          <Button variant="secondary">Read More</Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
          </Container>
        </div>
      )}
    </Container>
  );
}

export default AllRatingsPage;
