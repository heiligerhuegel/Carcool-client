// src/pages/LoginPage.js

import axios from "axios";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./../../../context/auth.context";

import { Container, Form, Button } from "react-bootstrap";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  // Get the function for saving and verifying the token
  const { logInUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = async (e) => {
    try {
      e.preventDefault();
      const requestBody = { email, password };

      const authToken = localStorage.getItem("authToken");
      const response = await axios.post("http://localhost:5005/auth/login", requestBody, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      // or with a service
      // const response = await authService.login(requestBody);

      // Save the token and set the user as logged in ...
      const token = response.data.authToken;
      logInUser(token);

      navigate("/");
    } catch (error) {
      // If the request resolves with an error, set the error message in the state
      setErrorMessage("Something went wrong");
    }
  };

  return (
    <Container className="my-3">
      <h1>Login</h1>

      <Form onSubmit={handleLoginSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address:</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmail} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={handlePassword} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Log In
        </Button>
      </Form>
      <br />
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Don't have an account yet?</p>
      <Link to={"/signup"}>
        <Button>Sign Up</Button>
      </Link>
    </Container>
  );
}

export default LoginPage;
