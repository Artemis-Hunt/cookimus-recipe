import RecipeList from "../../../data/RecipeList.js"
import AddedToGroceryList from "../../../data/AddedToGroceryList.js"
import { firestoreDb, groceryListPush } from "../../../config/Firebase/firebaseConfig"

const AddRecipe = async (ingredient, name, url) => {
    ingredient.sort((a, b) => a.name.localeCompare(b.name));
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
    RecipeList.unshift(recipeToAdd);
    //Push to firebase
    await groceryListPush(recipeToAdd);

    //Keep track of saved recipes
    AddedToGroceryList[url] = null;
    //alert("Added to grocery list");
}

export default AddRecipe