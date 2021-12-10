import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import fileService from "./../../../services/file.service";

function NewRatingPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");

  const [imageUrl, setImageUrl] = useState("");

  const [totalScore, setTotalScore] = useState(0);

  const [style, setStyle] = useState(0);
  const [acceleration, setAcceleration] = useState(0);
  const [handling, setHandling] = useState(0);
  const [fun, setFun] = useState(0);
  const [cool, setCool] = useState(0);
  const [weekend, setWeekend] = useState(0);

  const [features, setFeatures] = useState(0);
  const [comfort, setComfort] = useState(0);
  const [quality, setQuality] = useState(0);
  const [practicality, setPracticality] = useState(0);
  const [value, setValue] = useState(0);
  const [daily, setDaily] = useState(0);

  useEffect(() => {
    const weekendtotal = +style + +acceleration + +handling + +fun + +cool;
    setWeekend(weekendtotal);
  }, [style, acceleration, handling, fun, cool]);

  useEffect(() => {
    const dailytotal = +features + +comfort + +quality + +practicality + +value;
    setDaily(dailytotal);
  }, [features, comfort, quality, practicality, value]);

  useEffect(() => {
    const subtotal = weekend + daily;
    setTotalScore(subtotal);
  }, [weekend, daily]);

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
      const requestBody = {
        title,
        description,
        totalScore,
        style,
        acceleration,
        handling,
        fun,
        cool,
        weekend,
        features,
        comfort,
        quality,
        practicality,
        value,
        daily,
      };

      const newRating = {
        user: "UserId",
        brand,
        model,
        title,
        description,
        ratings: {
          Weekend: { style, acceleration, handling, fun, cool },
          Daily: { features, comfort, quality, practicality, value },
        },
      };

      const response = await axios.post("http://localhost:5005/api/newrating");
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
      setImageUrl(response.data.secure_url);
    } catch (error) {
      setErrorMessage("Something went wrong");
    }
  };
  return (
    <div>
      <h1>NewRatingPage</h1>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" name="title" value={title} onChange={handleTitle} />
        <label>Description:</label>
        <input type="text" name="description" value={description} onChange={handleDescription} />
        <br />
        <label>Style:</label>
        <input type="number" name="style" value={style} onChange={handleStyle} />
        <label>Acceleration:</label>
        <input type="number" name="Acceleration" value={acceleration} onChange={handleAcceleration} />
        <label>Handling:</label>
        <input type="number" name="Handling" value={handling} onChange={handleHandling} />
        <label>Fun:</label>
        <input type="number" name="Fun" value={fun} onChange={handleFun} />
        <label>Cool:</label>
        <input type="number" name="Cool" value={cool} onChange={handleCool} />
        <label>Weekend Total:</label>
        <input type="number" name="Weekend" value={weekend} />
        <br />
        <label>Features:</label>
        <input type="number" name="features" value={features} onChange={handleFeature} />
        <label>comfort:</label>
        <input type="number" name="comfort" value={comfort} onChange={handleComfort} />
        <label>quality:</label>
        <input type="number" name="quality" value={quality} onChange={handleQuality} />
        <label>practicality:</label>
        <input type="number" name="practicality" value={practicality} onChange={handlePracticality} />
        <label>value:</label>
        <input type="number" name="value" value={value} onChange={handleValue} />
        <label>Daily Total:</label>
        <input type="number" name="Weekend" value={daily} />
        <br />

        <label>Total Score:</label>
        <input type="number" name="totalScore" value={totalScore} />

        <input type="file" onChange={handleFileUpload}></input>
        <button type="submit">Sign Up</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default NewRatingPage;
