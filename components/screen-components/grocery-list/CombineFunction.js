import RecipeList from "../../data/RecipeList.js";

//This function will combine the individual components from the recipelist into a combined list
const combineList = (RecipeList) => {
    let splitArray;
    let combinedItem;

    //Outer to loop through all the individual Recipes
    for(let i=0; i<RecipeList.length; i++){
        //Loop through all the individual ingriedients in each recipe
        for(let j=0; j<RecipeList[i].data.length; j++) {
            //Split ingriedient into different parts if more than 1 word and capitalise all starting
            splitArray = str.split(" ");
            for(let k=0; k<splitArray.length; k++) {
                splitArray[k] = splitArray[k][0].toUpperCase() + splitArray[k].substr(1); //Appends everything else from index 1 onwards
            }
            //Combine back
            combinedItem = splitArray.join(" ");

            //Here we will call the Hash function?
        }
    }
}