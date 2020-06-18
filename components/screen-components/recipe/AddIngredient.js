import RecipeList from "../../../data/RecipeList.js"

const AddItem = (ingredient, name) => {
    let newObject = { title: name, data: [] };
    for (let item of ingredient) {
        newObject.data.push(item);
    }
    //Add to start of RecipeList
    RecipeList.unshift(newObject);
    alert("ADDED TO GROCERY LIST");
}

export default AddItem