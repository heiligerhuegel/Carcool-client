import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import fileService from "./../../../services/file.service";
import { AuthContext } from "./../../../context/auth.context";
import { useContext } from "react";

import { Form, Row, Col, Button, Container } from "react-bootstrap";

function EditUserPage() {
  const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005";
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [image, setImage] = useState("default");

  const { logOutUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleUsername = (e) => setName(e.target.value);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // Create an object representing the request body
      const requestBody = { name: name, image: image };

      const authToken = localStorage.getItem("authToken");
      await axios.put(`${API_URL}/api/user/edit`, requestBody, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      logOutUser();
      navigate("/login");
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

      const imageUrl = response.data.secure_url;

      setImage(imageUrl);
      // console.log("done");
    } catch (error) {
      // console.log(error.message);
    }
  };
  return (
    <Container>
      <h1>Login</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" placeholder="Enter new Username" value={name} onChange={handleUsername} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Profilepicture:</Form.Label>
          <Form.Control type="file" size="sm" onChange={handleFileUpload} />
        </Form.Group>

        <Button variant="secondary" type="submit">
          Change and Logout to reset.
        </Button>
      </Form>
      <br />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </Container>
  );
}

export default EditUserPage;
