import React, { Component } from "react";
import { AppRegistry, FlatList, StyleSheet, Text, View, Platform, Dimensions, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modalbox';

let screen = Dimensions.get('window');
let previous = 0;

const DATA = [{ title: 'Double', value: 2, text: "2" },
{ title: 'Original', value: 1, text: "1" },
{ title: 'Half', value: 1 / 2, text: "1/2" },
{ title: 'Third', value: 1 / 3, text: "1/3" },
{ title: 'Quarter', value: 1 / 4, text: "1/4" }
]

//Renders the item for the flatlist
const Item = ({ title, text }) => {
    return (
        <View>
            <Text>{title} {text}</Text>
        </View>
    )
}

export default class PortionModal extends Component {
    constructor(props) {
        super(props);
    }
    renderModal = () => {
        this.refs.portionModal.open();
    }
    receivePortion = (portion) => {
        previous = portion;
    }
    //This function will convert the grocery servings to the set portion
    //Selection = New selection, previous = Previous selection (Default values start as original)
    changePortion = (selection, previous, recipeIndex) => {
        let newValue = 0;
        let oldValue = 0;

        //No change
        if (selection === previous) {
            return;
        }
        // //Determine Selected
        // newValue = determineValue(selection);
        // oldValue = determineValue(previous);

        //Multiplier to get quantities back to original
        let multiplier = determineMultiplier(oldValue);

        //If new value is larger than oldValue, we are adding
        for (let item of RecipeList[recipeIndex].data) {
            let newQuantity = item.amount * multiplier;
            newQuantity *= newValue;
            //Add difference into the hash table
            let diff = newQuantity - item.amount;
            //Set as new amount
            item.amount = newQuantity;

            this.splitArray = item.name.split(" ");
            this.capitaliseString();
            this.updateHashValue(diff);
        }
    }
    updateHashValue = (diff) => {
        let hashKey = this.hashFunction(this.combinedItem);
        let collision = 0;
        let hashIndex = (hashKey + collision) % ArraySize;
        while (collision !== ArraySize) {
            if (HashTable[hashIndex].name === this.combinedItem) {
                HashTable[hashIndex].amount += diff;
                break;
            }
            collision++;
            hashIndex = (hashKey + collision) % ArraySize;
        }
    }
    determineMultiplier = (selection) => {
        let value = 0;
        switch (selection) {
            case "Double": value = 0.5;
                break;
            case "Original": value = 1;
                break;
            case "Half": value = 2;
                break;
            case "Third": value = 3;
                break;
            case "Quarter": value = 4;
                break;
        }
        return value;
    }
    render() {
        return (
            <Modal
                ref={'portionModal'}
                style={styles.container}
                position='center'
                backdrop={true}
            >
                <View style={styles.contents}>
                    <Text style={styles.headerText}>Serving Portion</Text>
                    <FlatList
                        data={DATA}
                        renderItem={({ item }) => (
                            <TouchableOpacity>
                                <Item title={item.title} text={item.text} />
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.title}
                    />
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        borderRadius: 20,
        shadowRadius: 10,
        width: screen.width - 80,
        height: 280,
    },
    contents: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    headerText: {
        
    }
})