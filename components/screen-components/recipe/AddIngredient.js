import RecipeList from "../../../data/RecipeList.js"

const AddItem = (ingredient, name) => {
    let newObject = { title: name, data: [] };
    newObject.data = Array.from(ingredient);
    //Add to start of RecipeList
    RecipeList.unshift(newObject);
    alert("Added to grocery list")
}

export default AddItem