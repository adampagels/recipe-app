import React, { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useDispatch } from "react-redux";
import { addNewRecipe } from "../../redux/slices/recipe/addNewRecipe";

const RecipeForm = () => {
  const [values, setValues] = useState({
    title: "",
    image: "",
    imageURL: "",
    description: "",
    ingredients: "",
    instructions: "",
    cookTime: "",
    prepTime: "",
  });
  const [diet, setDiet] = useState([]);
  const dispatch = useDispatch();
  const addImagePlaceholder =
    process.env.PUBLIC_URL + "/addImagePlaceholder.png";

  const options = [
    { value: "high-protein", label: "High-Protein" },
    { value: "vegan", label: "Vegan" },
    { value: "pescetarian", label: "Pescetarian" },
    { value: "vegetarian", label: "Vegetarian" },
    { value: "keto", label: "Keto" },
    { value: "dairy-free", label: "Dairy-Free" },
    { value: "paleo", label: "Paleo" },
    { value: "gluten-free", label: "Gluten-Free" },
  ];

  const animatedComponents = makeAnimated();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSelectChange = (dietLabel) => {
    setDiet(dietLabel);
  };

  const handleRecipeSubmit = (event) => {
    event.preventDefault();
    handleAddRecipe();
  };

  const handleAddRecipe = async () => {
    const dietArray = diet.map((diet) => diet.label);
    const ingredientArray = values.ingredients.split("\n");
    const instructionArray = values.instructions.split("\n");

    const token = localStorage.getItem("auth-token");
    const imageData = new FormData();
    imageData.append("image", values.image);
    const url = "http://localhost:5000/recipes/image-upload";

    const config = {
      method: "POST",
      body: imageData,
      headers: {
        "auth-token": `${token}`,
      },
    };

    try {
      const req = await fetch(url, config);
      if (req.ok) {
        const res = await req.json();
        dispatch(
          addNewRecipe({
            title: values.title,
            photo: res.imageUrl,
            description: values.description,
            ingredients: ingredientArray,
            instructions: instructionArray,
            cookTime: values.cookTime,
            prepTime: values.prepTime,
            diet: dietArray,
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="recipeform-container">
      {console.log(values.image)}
      <form className="recipeform-form">
        <div className="recipeform-left-div">
          <label
            className="recipeform-image-label"
            htmlFor="recipeform-input-photo"
          >
            <img
              src={values.imageURL ? values.imageURL : addImagePlaceholder}
              id="recipeform-image"
            />
          </label>
          <input
            id="recipeform-input-photo"
            type="file"
            name="image-upload"
            className="recipeform-input"
            accept="image/png, image/jpeg"
            onChange={(event) => {
              setValues({
                ...values,
                image: event.target.files[0],
                imageURL: URL.createObjectURL(event.target.files[0]),
              });
            }}
          />
          <div className="recipeform-preptime-cooktime-container">
            <div className="recipeform-timing-wrapper">
              <label htmlFor="recipeform-input-preptime">Prep-Time:</label>
              <input
                id="recipeform-input-preptime"
                type="text"
                name="prepTime"
                className="recipeform-input"
                onChange={handleInputChange}
                value={values.prepTime}
              />
            </div>
            <div className="recipeform-timing-wrapper">
              <label htmlFor="recipeform-input-cooktime">Cook-Time:</label>
              <input
                id="recipeform-input-cooktime"
                type="text"
                name="cookTime"
                className="recipeform-input"
                onChange={handleInputChange}
                value={values.cookTime}
              />
            </div>
          </div>
        </div>
        <div className="recipeform-right-div">
          <label htmlFor="recipeform-input-title">Title:</label>
          <input
            id="recipeform-input-title"
            type="text"
            name="title"
            className="recipeform-input"
            onChange={handleInputChange}
            value={values.title}
          />
          <label htmlFor="recipeform-input-description">Description:</label>
          <textarea
            id="recipeform-input-description"
            type="text"
            name="description"
            className="recipeform-textarea"
            onChange={handleInputChange}
            value={values.description}
          />
          <label htmlFor="recipeform-input-ingredients">Ingredients:</label>
          <textarea
            id="recipeform-input-ingredients"
            name="ingredients"
            className="recipeform-textarea"
            onChange={handleInputChange}
            value={values.ingredients}
          />
          <label htmlFor="recipeform-input-instructions">Instructions:</label>
          <textarea
            id="recipeform-input-instructions"
            name="instructions"
            className="recipeform-textarea"
            onChange={handleInputChange}
            value={values.instructions}
          />
          <label htmlFor="recipeform-input-diet">Diet:</label>
          <Select
            id="recipeform-input-diet"
            components={animatedComponents}
            name="diet"
            isMulti
            value={diet}
            onChange={handleSelectChange}
            options={options}
          />
          <button onClick={(event) => handleRecipeSubmit(event)}>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default RecipeForm;
