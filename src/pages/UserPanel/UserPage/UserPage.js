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

      setRatings(response.data.ratings);
    };

    getData();
  }, []);

  return (
    <Container>
      <h1>Profile Page</h1>
      <Link to="/user/edit">Edit Profile</Link>
      <Row>
        {ratings &&
          ratings.map((element) => {
            return (
              <Col>
                <Card style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Title>{element.title}</Card.Title>
                    <Card.Text>{element.description}</Card.Text>
                    <Link to={`/user/${element._id}`}>
                      <Button variant="primary">somewhere</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
      </Row>
    </Container>
  );
}

export default UserPage;
