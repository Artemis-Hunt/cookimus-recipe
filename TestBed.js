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
    //Conversion are based off 8 quarts as base
    convertFunction = (itemUnit, itemQuantity, targetUnit) => {
        let convertedQuantity = itemQuantity;

        //No units, just add the quantities together
        if (itemUnit === '' || itemUnit === ' ' || itemUnit === null || itemUnit === targetUnit) {
            return convertedQuantity;
        }
        //Determine original object unit
        let itemObject = determineObject(itemUnit);
        //Determine target object unit
        let targetObject = determineObject(targetUnit);

        let conversionMultiplier = itemQuantity / itemObject.multiplier;
        //Determine converted quantity
        let convertedQuantity = targetObject.multiplier * conversionMultiplier;

        return convertedQuantity;
    }
    determineObject = (item) => {
        //Pass in full item object, detect the current unit and convert into target unit
        //Add classes: Volume (Class 1)/Weight (Class 2)
        const cookingUnits = [
            { name: 'teaspoon', unit: 'teaspoon', multiplier: 48, class: 1 },
            { name: 'tablespoon', unit: 'tablespoon', multiplier: 16, class: 1 },
            { name: 'cup', unit: 'cup', multiplier: 1, class: 1 },
            { name: 'quart', unit: 'quart', multiplier: 0.25, class: 1 },
            { name: 'ounce', unit: 'ounce', multiplier: 8 },
            { name: 'pound', unit: 'pound', multiplier: 0.5, class: 2 },
            { name: 'gram', unit: 'gram', multiplier: 227, class: 2 },
            { name: 'kilogram', unit: 'kilogram', multiplier: 0.227, class: 2 },
            { name: 'pint', unit: 'pint', multiplier: 0.5, class: 1 },
            { name: 'millilitre', unit: 'millilitre', multiplier: 250, class: 1 },
            { name: 'litre', unit: 'litre', multiplier: 0.25, class: 1 },
        ];
        const specificUnits = [
            { name: 'lb', unit: 'pound', multiplier: 0.5, class: 2 },
            { name: 'lbs', unit: 'pound', multiplier: 0.5, class: 2 },
            { name: 'lb.', unit: 'pound', multiplier: 0.5, class: 2 },
            { name: 'lbs.', unit: 'pound', multiplier: 0.5, class: 2 },
            { name: 'Tbsp', unit: 'tablespoon', multiplier: 16, class: 1 },
            { name: 'Tbsp.', unit: 'tablespoon', multiplier: 16, class: 1 },
            { name: 'tsp', unit: 'teaspoon', multiplier: 48, class: 1 },
            { name: 'tsp.', unit: 'teaspoon', multiplier: 48, class: 1 },
            { name: 'tbsp', unit: 'tablespoon', multiplier: 16, class: 1 },
            { name: 'tbsp.', unit: 'tablespoon', multiplier: 16, class: 1 },
            { name: 'Tsp', unit: 'teaspoon', multiplier: 48, class: 1 },
            { name: 'tsp.', unit: 'teaspoon', multiplier: 48, class: 1 },
            { name: 'oz.', unit: 'ounce', multiplier: 8 },
            { name: 'oz', unit: 'ounce', multiplier: 8 },
            { name: 'g', unit: 'gram', multiplier: 227, class: 2 },
            { name: 'kg', unit: 'kilogram', multiplier: 0.227, class: 2 },
            { name: 'ml', unit: 'millilitre', multiplier: 250, class: 1 },
            { name: 'l', unit: 'litre', multiplier: 0.25, class: 1 },
        ];

        let unit;
        //Checking units
        for (let i of cookingUnits) {
            if (item.includes(i.name)) {
                unit = i;
                return unit;
            }
        }
        //Checking of specificUnits
        for (let i of specificUnits) {
            if (item === i.name) {
                unit = i;
                return unit;
            }
        }
    }
    // <DropDownPicker
    //       items={[
    //         { label: "No Units", value: "" },
    //         { label: "Gram", value: "grams" },
    //         { label: "Kilogram", value: "kg" },
    //         { label: "Cups", value: "cups" },
    //         { label: "Tablespoon", value: "tbsp" },
    //         { label: "Teaspoon", value: "tsp" },
    //         { label: "Millilitres", value: "ml" },
    //         { label: "Litres", value: "litres" },
    //       ]}
    //       defaultNull
    //       placeholder="No units"
    //       containerStyle={{ height: 30, width: 100 }}
    //       style={{ paddingVertical: 5 }}
    //       dropDownStyle={{ backgroundColor: "#fafafa", position: "absolute" }}
    //       onOpen={() => {
    //         dropDownHeight += 130;
    //         setChanged(!changed);
    //       }}
    //       onClose={() => {
    //         dropDownHeight -= 130;
    //         setChanged(!changed);
    //       }}
    //       onChangeItem={(item) => handleunits(item.value)}
    // />
} 