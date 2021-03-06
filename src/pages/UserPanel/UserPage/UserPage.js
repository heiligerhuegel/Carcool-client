import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";
import { Container, Button, Card, Col, Row } from "react-bootstrap";

function UserPage() {
  const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005";
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const authToken = localStorage.getItem("authToken");
      const response = await axios.get(`${API_URL}/api/user`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      // console.log(response.data.ratings);
      setRatings(response.data.ratings);
    };

    getData();
  }, []);

  return (
    <Container>
      <Container className="my-3">
        <Row>
          <Col>
            <h1>Profile Page</h1>
          </Col>
          <Col>
            <Link to="/user/edit">
              <Button>Edit Profile</Button>
            </Link>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          {ratings &&
            ratings.map((element) => {
              return (
                <Col>
                  <Card className="mx-auto my-3" style={{ width: "18rem" }}>
                    <Card.Body>
                      <Card.Title>{element.title}</Card.Title>
                      <Card.Text>{element.brand}</Card.Text>
                      <Card.Text>{element.model}</Card.Text>
                      <Card.Text>Total Score: {element.totalScore}</Card.Text>
                      <Link to={`/user/${element._id}`}>
                        <Button variant="secondary">Edit Rating</Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </Container>
    </Container>
  );
}

export default UserPage;
