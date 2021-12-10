import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import fileService from "./../../../services/file.service";
import { AuthContext } from "./../../../context/auth.context";
import { useContext } from "react";

function EditUserPage() {
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
      await axios.put("http://localhost:5005/api/user/edit", requestBody, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      logOutUser();
      navigate("/user");
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
      console.log("done");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="EditUserPage">
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          name="email"
          value={name}
          onChange={handleUsername}
        />

        <label>Profile Picture: </label>
        <input name="image" type="file" onChange={handleFileUpload}></input>

        <button type="submit">Save</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default EditUserPage;
