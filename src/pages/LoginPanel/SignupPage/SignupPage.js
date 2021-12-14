import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Form, Button, Col, Row } from "react-bootstrap";

import fileService from "./../../../services/file.service";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = async (e) => {
    try {
      e.preventDefault();
      // Create an object representing the request body
      const requestBody = { email, password, name, imageUrl };

      const authToken = localStorage.getItem("authToken");
      await axios.post("http://localhost:5005/auth/signup", requestBody, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      // or with a service
      // await authService.signup(requestBody);

      // If the request is successful navigate to login page
      navigate("/login");
    } catch (error) {
      // If the request resolves with an error, set the error message in the state
      setErrorMessage("Something went wrong");
    }
  };

  const handleFileUpload = async (e) => {
    try {
      //e.preventDefault();
      const uploadData = new FormData();

      uploadData.append("imageUrl", e.target.files[0]);
      const response = await fileService.uploadImage(uploadData);
      setImageUrl(response.data.secure_url);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Container>
      <h1>Sign Up</h1>

      <Form onSubmit={handleSignupSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address:</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmail} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={handlePassword} />
        </Form.Group>

        <Form.Group className="mb-3" c>
          <Form.Label>Username:</Form.Label>
          <Form.Control type="test" placeholder="Enter Username" value={name} onChange={handleName} />
        </Form.Group>

        <Form.Group className="mb-3" as={Row}>
          <Col xs="6">
            <Form.Label>Profilepicture:</Form.Label>
          </Col>
          <Col xs="6">
            <Form.Control type="file" size="sm" onChange={handleFileUpload} />
          </Col>
        </Form.Group>

        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
      <br />
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already have account?</p>
      <Link to={"/login"}>
        <Button>Log In</Button>
      </Link>
    </Container>
  );
}

export default SignupPage;
