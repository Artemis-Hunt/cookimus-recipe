import RecipeList from "../../../data/RecipeList.js"
import SavedRecipes from "../../../data/SavedRecipes.js"
import { firestoreDb, groceryListPush } from "../../../config/Firebase/firebaseConfig"

const AddRecipe = async (ingredient, name, url) => {
    //Add entire recipe to RecipeList
    const recipeToAdd = JSON.parse(
        JSON.stringify({
          title: name,
          data: ingredient,
          portion: 1,
          portionText: "1",
          url: url,
        })
      );
    //Sort the ingredient names by alphabetical order
    recipeToAdd.data.sort((a, b) => a.name.localeCompare(b.name));
    for(let item of recipeToAdd.data) {
      item.amount = Number(item.amount);
    }
    RecipeList.unshift(recipeToAdd);
    //Push to firebase
    await groceryListPush(recipeToAdd);

    //Keep track of saved recipes
    const savedData = { title: name, url: url };
    SavedRecipes.push(savedData);
    //alert("Added to grocery list");
}

export default AddRecipe