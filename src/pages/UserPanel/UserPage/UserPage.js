import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";
import { Container, Button, Card, Col, Row } from "react-bootstrap";

function UserPage() {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const authToken = localStorage.getItem("authToken");
      const response = await axios.get("http://localhost:5005/api/user", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      console.log(response.data.ratings);
      setRatings(response.data.ratings);
    };

    getData();
  }, []);

  return (
    <Container>
      <Container className="mb-5 mt-3">
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
                  <Card className="mt-2" style={{ width: "18rem" }}>
                    <Card.Body>
                      <Card.Title>{element.title}</Card.Title>
                      <Card.Text>{element.brand}</Card.Text>
                      <Card.Text>{element.model}</Card.Text>
                      <Card.Text>Total Score: {element.totalScore}</Card.Text>
                      <Link to={`/user/${element._id}`}>
                        <Button variant="primary">Edit Rating</Button>
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
