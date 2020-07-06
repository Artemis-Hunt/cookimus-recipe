import RecipeList from "../../../data/RecipeList.js"
import SavedRecipes from "../../../data/SavedRecipes.js"
import {firestoreDb, groceryListPush} from "../../../config/Firebase/firebaseConfig"

const AddRecipe = async (ingredient, name, url) => {
    for(const check of SavedRecipes) {
        if(check.link === url) {
            alert("Item Already Added");
            return;
        }
    }
    //Add entire recipe to RecipeList
    const recipeToAdd = Object.assign({}, {title: name, data: Array.from(ingredient), portion: 1, portionText: '1', url: url });
    //Sort the ingredient names by alphabetical order
    recipeToAdd.data.sort((a, b) => a.name.localeCompare(b.name));
    RecipeList.push(recipeToAdd);
    //Push to firebase
    await groceryListPush(recipeToAdd);

    //Keep track of saved recipes
    const savedData = {title: name, link: url};
    SavedRecipes.push(savedData);
    //alert("Added to grocery list");
}

export default AddRecipe