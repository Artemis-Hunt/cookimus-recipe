import RecipeList from "../../../data/RecipeList.js"

const AddItem = (ingredient, name) => {
    let newObject = { title: name, data: [] };
    for (let item of ingredient) {
        let ingredientObject = {};
        ingredientObject.name = item.name;
        ingredientObject.amount = Number(item.amount);
        ingredientObject.unit = item.unit;

        newObject.data.push(newObject);
    }
    RecipeList.unshift(newObject);
    alert("ADD TO GROCERY LIST");
}

export default AddItem