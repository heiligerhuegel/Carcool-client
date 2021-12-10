import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function AllCarsPage() {
  const [cars, setCars] = useState([]);
  useEffect(async () => {
    const result = await axios.get("http://localhost:5005/api/cars");
    setCars(result.data);
  }, []);

  return (
    <div>
      <h2> All the rated Cars </h2>
      {cars &&
        cars.map((element) => {
          return (
            <div key={element._id}>
              <Link to={`/car/${element._id}`}>
                <h3>{element.brand}</h3>
              </Link>
              <h2>{element.model}</h2>
            </div>
          );
        })}
    </div>
  );
}

export default AllCarsPage;
