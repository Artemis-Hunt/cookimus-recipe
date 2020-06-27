import RecipeList from "../../../data/RecipeList.js"
import SavedRecipes from "../../../data/SavedRecipes.js"

const AddRecipe = (ingredient, name, url) => {
    for(const check of SavedRecipes) {
        if( check.link === url) {
            alert("Item Already Added");
            return;
        }
    }
    const ingredientToAdd = Object.assign({}, ingredient)
    const nameToAdd = String(name)
    //Add entire recipe to RecipeList
    const newObject = { title: nameToAdd, data: Object.values(ingredientToAdd), portion: 1, portionText: '1' };
    RecipeList.unshift(newObject);

    //Keep track of saved recipes
    const saveObject = {title: name, link: url};
    SavedRecipes.push(saveObject);
    alert("Added to grocery list");
}

export default AddRecipe