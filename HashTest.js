/*Test Bed for the hashing function, to be deleted */
//Hashes the passed in string in item and returns the key
const ArraySize = 100;
const Multiplier = 37;
const frac = require('frac');

const hashFunction = () => {
    let total = 0;
    const item = "Focaccia Bread";

    for (let i = 0; i < item.length; i++) {
        total += Multiplier * total + item.charCodeAt(i);
    }
    console.log("Total: " + total);
    total %= ArraySize;

    console.log("Index: " + total);
    let fraction = frac(3, 9);
    console.log(fraction);

    return total;
};

hashFunction();