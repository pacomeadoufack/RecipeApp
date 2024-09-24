import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import RandomRecipe from "../Components/RandomRecipe";

const RandomRecipeView = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [randomRecipe, setRandomRecipe] = useState(null);

  useEffect(() => {
    handleRandom();
  }, []);

  const handleRandom = () => {
    setLoading(true);
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        return response.json();
      })
      .then((data) => {
        setRandomRecipe(data.meals[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
        setLoading(false);
      });
  };

  return (
    <div>
      {randomRecipe && (
        <Link to={`/meal/${randomRecipe.idMeal}`}>
          {error && <p>{error}</p>}
          <button onClick={handleRandom}>
            <img
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
              src="./public/image/suprise.jpg"
              alt=""
            />
          </button>
        </Link>
      )}
    </div>
  );
};

export default RandomRecipeView;
