import RecipeList from "../../../data/RecipeList.js"
import SavedRecipes from "../../../data/SavedRecipes.js"

const AddItem = (ingredient, name, url) => {
    let newObject = { title: name, data: [] };
    for(let check of SavedRecipes) {
        if( check.link === url) {
            alert("Item Already Added");
            return;
        }
    }
    newObject.data = Array.from(ingredient);
    let saveObject = {title: '', link: ''};
    //Add to start of RecipeList
    RecipeList.unshift(newObject);
    saveObject.title = name;
    saveObject.link = url;
    SavedRecipes.push(saveObject);
    alert("Added to grocery list");
}

export default AddItem