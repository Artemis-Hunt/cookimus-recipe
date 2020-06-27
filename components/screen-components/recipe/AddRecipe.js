import RecipeList from "../../../data/RecipeList.js"
import SavedRecipes from "../../../data/SavedRecipes.js"

const AddRecipe = (ingredient, name, url) => {
    for(const check of SavedRecipes) {
        if( check.link === url) {
            alert("Item Already Added");
            return;
        }
    }
    //Add entire recipe to RecipeList
    const newObject = Object.assign({}, {title: name, data: Array.from(ingredient), portion: 1, portionText: '1' });
    RecipeList.unshift(newObject);

    //Keep track of saved recipes
    const saveObject = {title: name, link: url};
    SavedRecipes.push(saveObject);
    alert("Added to grocery list");
}

export default AddRecipe