import React, { Component } from "react";

import RecipeList from '../../../data/RecipeList.js'
import HashTable from '../../../data/HashTable.js'
import SavedRecipes from "../../../data/SavedRecipes.js"

//Size of hash table
const ArraySize = 100;
const Multiplier = 37;

export default class HashFunctions extends Component {
    constructor(props) {
        super(props);
        this.updatedLength;
    }
    //Hashes the passed in string in item and returns the key
    hashFunction = (item) => {
        let total = 0;

        for (let i = 0; i < item.length; i++) {
            total += Multiplier * total + item.charCodeAt(i);
        }
        total %= ArraySize;
        return total;
    };

    //Function to capitalise first letter of all leading words in string
    capitaliseString = (str) => {
        for (let k = 0; k < str.length; k++) {
            str[k] =
                str[k][0].toUpperCase() + str[k].substr(1); //Appends everything else from index 1 onwards
        }
        //Combine back
        return str.join(" ");
    };

    //Pass in single recipes at a time in recipe list format, add into hash table
    //Outer to loop through all the individual Recipes - Currently loops from start of list
    combineFunction = (index) => {
        for (let i = 0; i < index; i++) {
            //Loop through all the individual ingredients in each recipe
            for (let j = 0; j < RecipeList[i].data.length; j++) {
                //Split ingredient into different parts if more than 1 word and capitalise all starting
                let newItem = RecipeList[i].data[j].name;
                let splitName = newItem.split(" ");
                let newName = this.capitaliseString(splitName);

                //Hash combinedItem
                let key = this.hashFunction(newName);

                //Add item into hash table
                this.insertIntoHash(i, j, newName, key);
            }
        }
        //Move all items from hash table into the combined list
        this.props.rebuildList();
    };

    //This function will add to combined list single items - No need to loop entire list
    handleSingleItem = (newSingleItem, itemIndex) => {
        let splitName = newSingleItem.split(" ");
        let newName = this.capitaliseString(splitName);
        let key = this.hashFunction(newName);
        this.insertIntoHash(RecipeList.length - 1, itemIndex, newName, key);
        this.props.rebuildList();
    };

    //This function will handle the item added to the combined list
    insertIntoHash = (i, j, itemName, key) => {
        //Handling item slotting/collisions
        let collision = 0;
        let hashIndex = (key + collision) % ArraySize;
        while (collision !== ArraySize) {
            if (
                (HashTable[hashIndex].name === null ||
                    HashTable[hashIndex].deleted === 1) &&
                HashTable[hashIndex].name !== itemName
            ) {
                //Space in hashtable is empty, set as new object in hashTable - Currently dosent attend to different units
                HashTable[hashIndex].name = itemName;
                HashTable[hashIndex].amount = Number(RecipeList[i].data[j].amount);
                HashTable[hashIndex].unit = RecipeList[i].data[j].unit;
                HashTable[hashIndex].deleted = 0;
                return;
            } else if (HashTable[hashIndex].name === itemName) {
                //Same Item, add amounts
                HashTable[hashIndex].amount += Number(RecipeList[i].data[j].amount);
                return;
            }
            collision++;
            hashIndex = (key + collision) % ArraySize;
        }
        if (collision === ArraySize) alert("Error, array full");
    };

    //Delte function for list
    deleteItem = (id) => {
        //Split id into name / recipe index / ingredient index
        let [name, recipeIndex, ingrIndex] = id.split(".");
        this.hashDelete(recipeIndex, ingrIndex, true);
        RecipeList[recipeIndex].data[ingrIndex].mark = false;
        //Remove ingredient from RecipeList. Update keys for ingredients after deleted ingredient
        RecipeList[recipeIndex].data.splice(ingrIndex, 1);
        for (let j = ingrIndex; j < RecipeList[recipeIndex].data.length; j++) {
            RecipeList[recipeIndex].data[j].key = this.generateKey(recipeIndex, j);
        }
        //Remove Title from RecipeList
        if (
            RecipeList[recipeIndex].data.length === 0 &&
            RecipeList[recipeIndex].title !== "Added to list"
        ) {
            //Clear Savedrecipe
            for (let i = 0; i < SavedRecipes.length; i++) {
                if (RecipeList[recipeIndex].title === SavedRecipes[i].title) {
                    SavedRecipes.splice(i, 1);
                    break;
                }
            }
            RecipeList.splice(recipeIndex, 1);
            this.updatedLength = RecipeList.length;
            this.bulkGenerateKey(recipeIndex);
            return this.updatedLength;
        }
    };

    //Delete entire recipe at once
    deleteSection = (title) => {
        let index = 0;
        //Finding index of the recipe in recipelist
        for (let i of RecipeList) {
            if (i.title === title) { break; }
            index++;
        }
        //Bulk delete of all ingredients found in recipe
        for (let j = 0; j < RecipeList[index].data.length; j++) {
            RecipeList[index].data[j].mark = false;
            this.hashDelete(index, j, false);
        }
        //Delete entire entry
        if (RecipeList[index].title !== "Added to list") {
            for (let i = 0; i < SavedRecipes.length; i++) {
                if (RecipeList[index].title === SavedRecipes[i].title) {
                    SavedRecipes.splice(i, 1);
                    break;
                }
            }
            RecipeList.splice(index, 1);
            this.updatedLength = RecipeList.length;
            this.bulkGenerateKey(index);
        } else {
            //Delete all except title for added to list
            RecipeList[index].data.splice(0, RecipeList[index].data.length);
        }
        this.props.rebuildList();
        return this.updatedLength;
    }
    //Deletes items from the hashtable to update combined list
    hashDelete = (recipeIndex, ingrIndex, rebuildFlag) => {
        //Reference the item to be deleted
        let toDelete = RecipeList[recipeIndex].data[ingrIndex];
        let splitName = toDelete.name.split(" ");
        let newName = this.capitaliseString(splitName);

        //Update hash table. Delete entry if required
        let hashKey = this.hashFunction(newName);
        let collision = 0;
        let hashIndex = (hashKey + collision) % ArraySize;
        while (collision !== ArraySize) {
            if (HashTable[hashIndex].name === newName) {
                HashTable[hashIndex].amount -= toDelete.amount;
                if (HashTable[hashIndex].amount <= 0) {
                    HashTable[hashIndex].name = null;
                    HashTable[hashIndex].amount = "";
                    HashTable[hashIndex].unit = "";
                    HashTable[hashIndex].deleted = 1;
                    HashTable[hashIndex].mark = false;
                }
                break;
            }
            collision++;
            hashIndex = (hashKey + collision) % ArraySize;
        }
        if (rebuildFlag === true) {
            this.props.rebuildList();
        } else {
            return;
        }
    }

    //Generate keys in bulk
    bulkGenerateKey(startIndex) {
        for (let i = startIndex; i < RecipeList.length; i++) {
            for (let j = 0; j < RecipeList[i].data.length; j++) {
                //Generate keys for each item
                RecipeList[i].data[j].key = this.generateKey(i, j);
            }
        }
    }

    generateKey = (i, j) => {
        let key = `${RecipeList[i].data[j].name}.${i}.${j}`;
        return key;
    };

    render() {
        return (null);
    }

}