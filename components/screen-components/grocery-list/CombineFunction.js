import RecipeList from "../../data/RecipeList.js";
import CombinedList from "../../data/CombinedList.js";

//Size of hash table
const ArraySize = 100;
const Multiplier = 37;

//This function will combine the individual components from the recipelist into a combined list
export default class combineList extends Component {
    constructor() {
        this.hashTable = new Array(ArraySize);
        this.splitArray = "";
        this.combinedItem = "";
        this.key = "";
    }

    //Hashes the passed in string in item and returns the key
    hashFunction = (item) => {
        let total = 0;

        for (let i = 0; i < item.length; i++) {
            total += Multiplier * total + String.charCodeAt(i);
        }
        total %= ArraySize;

        return total;
    }

    //This function will handle the item added to the combined list
    handleNewItem = () => {
        //Handling item slotting/collisions
        let collision = 0;

        while (collision !== ArraySize) {
            if (this.hashTable[this.key + collision].name === null) {
                //Space in hashtable is empty, set as new object in hashTable - Currently dosent attend to different units
                this.hashTable[this.key].name = this.combinedItem;
                this.hashTable[this.key].amount = RecipeList[i].data[j].amount;
                this.hashTable[this.key].unit = RecipeList[i].data[j].unit;
                return;
            }
            else if (this.hashTable[this.key].name === combinedItem) {
                //Same Item, add amounts
                this.hashTable[this.key].amount += RecipeList[i].data[j].amount;
                return;
            }
            collision++;
            if (collision === ArraySize)
                alert("Error, array full");
        }
    }

    //This function adds all the items in the hashtable into the combinedlist
    addToCombined = (CombinedList) => {
        for (let i = 0; i < ArraySize; i++) {
            if (this.hashTable[i] !== NULL) {
                CombinedList[0].data.push(this.hashTable[i]);
            }
        }
    }

    //This function will add to combined list single items - No need to loop entire list
    handleSingleItem = (newItem) => {
        this.splitArray = newItem.split(" ");
        this.capitaliseString();
        this.key = this.hashFunction(this.combinedItem);
        this.handleNewItem();
        this.addToCombined();
    }

    //Function to capitalise first letter of all leading words in string
    capitaliseString = () => {
        for (let k = 0; k < this.splitArray.length; k++) {
            this.splitArray[k] = this.splitArray[k][0].toUpperCase() + this.splitArray[k].substr(1); //Appends everything else from index 1 onwards

            //Combine back
            this.combinedItem = this.splitArray.join(" ");
        }
    }

    //Pass in single recipes at a time in recipe list format, add into hash table
    //Outer to loop through all the individual Recipes - Currently loops from start of list
    combineFunction = (RecipeList) => {
        for (let i = 0; i < RecipeList.length; i++) {
            //Loop through all the individual ingriedients in each recipe
            for (let j = 0; j < RecipeList[i].data.length; j++) {
                //Split ingriedient into different parts if more than 1 word and capitalise all starting
                this.splitArray = RecipeList[i].data[j].split(" ");
                this.capitaliseString();

                //Hash combinedItem
                this.key = this.hashFunction(this.combinedItem);

                //Add item into hash table
                this.handleNewItem();

                //Move all items from hash table into the combined list
                this.addToCombined();
            }
        }
    }
} 