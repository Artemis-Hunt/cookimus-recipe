//TestBed for functions and writing code

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

    //This function will convert the cooking units from one to another
    convertFunction = (itemUnit, itemQuantity, targetUnit) => {
        //Pass in full item object, detect the current unit and convert into target unit
        const cookingUnits = ["teaspoon", "tablespoon", "cup", "quart", "ounce", "pound", "gram", "kilogram", "pint"];
        const specificUnits = ["lb", "lbs", "lb.", "lbs.", "Tbsp", "Tbsp.", "tsp", "tsp.", "tbsp", "tbsp.", "Tsp", "tsp.", "oz.", "oz", "g", "kg"];

        const weights = ["pound", "gram", "kilogram"];
        const volumes = ["teaspoon", "tablespoon", "cup", "quart", "pint"];

        let unit = false;
        let flag = false;
        let convertedQuantity = false;
        for (let i of cookingUnits) {
            if (itemUnit.includes(i)) {
                unit = i;
                break;
            }
            //Converting specific units to fit larger category
            for (let j of specificUnits) {
                if (itemUnit === j) {
                    unit = j;
                    if (unit === 'lb' || unit === 'lbs' || unit === 'lb.' || unit === 'lbs.') { unit = 'pound' }
                    else if (unit === 'Tbsp' || unit === 'Tbsp.' || unit === 'tbsp' || unit === 'tbsp.') { unit = 'tablespoon' }
                    else if (unit === 'tsp' || unit === 'tsp.' || unit === 'Tsp' || unit === 'Tsp.') { unit = 'tablespoon' }
                    else if (unit === 'oz.' || unit === 'oz') { unit = 'ounce' }
                    else if (unit === 'g') { unit = 'gram' }
                    else if (unit === 'kg') { unit = 'kilogram' }
                    flag = true;
                    break;
                }
            }
            if (flag === true) {
                break;
            }
        }
        //No common units found, just add the quantities together
        if (unit === false) {
            return convertedQuantity;
        }
        //Target is in ounces
        if (unit === 'ounce') {
            for (let i of weights) {
                if (targetUnit === i) {
                    unit += '.weight';
                    break;
                }
            }
        }
        //Converting if weight measurements
        if (unit === 'gram' || unit === 'kilogram' || unit === 'pound') {

        }

        return convertedQuantity;
    }
} 