//This function will handle the saving of the recipe
import SavedRecipeData from "../../../data/SavedRecipeData.js"

const saveRecipe = (name, url, image, ingredients, modIngredient, extraInfo, prep) => {
    let newObject = {};
    newObject.id = SavedRecipeData.length;
    newObject.name = name;
    newObject.url = url;
    newObject.image = image;
    newObject.ingredients = ingredients;
    newObject.modIngredient = modIngredient;
    newObject.extraInfo = extraInfo;
    newObject.prep = prep;

    SavedRecipeData.push(newObject);

    alert("Item Saved")
}

export default saveRecipe