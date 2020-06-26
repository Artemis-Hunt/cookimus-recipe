import React, { Component } from "react";
import { AppRegistry, FlatList, StyleSheet, Text, View, Platform, Dimensions, TouchableOpacity, Button } from 'react-native';
import Modal from 'react-native-modalbox';

import RecipeList from '../../../data/RecipeList.js'
import HashTable from '../../../data/HashTable.js'

let screen = Dimensions.get('window');
let previous = 0;
let selected;
let recipeIndex = 0;

const ArraySize = 100;
const Multiplier = 37;

const DATA = [
    { title: 'Triple', value: 3, text: "3" },
    { title: 'Double', value: 2, text: "2" },
    { title: 'Original', value: 1, text: "1" },
    { title: 'Three-Quarter', value: 3 / 4, text: "3/4" },
    { title: 'Half', value: 1 / 2, text: "1/2" },
    { title: 'Third', value: 1 / 3, text: "1/3" },
    { title: 'Quarter', value: 1 / 4, text: "1/4" }
]

//Renders the item for the flatlist
const Item = ({ title, text, value }) => {
    let cardStyle = (selected === value) ? styles.selected : styles.itemCard;
    let cardTextStyle = (selected === value) ? [styles.selectedCardText, styles.text, styles.itemCardText] : [styles.itemCardText, styles.text];
    return (
        <View style={cardStyle}>
            <Text style={cardTextStyle}>{title}</Text>
            <Text style={[styles.multiplierText]}>({text}x)</Text>
        </View>
    )
}

export default class PortionModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refresh: false,
        }
    }
    forceUpdate() {
        this.setState({ refresh: !this.state.refresh })
    }
    renderModal = () => {
        this.refs.portionModal.open();
    }
    receivePortion = (portion, title) => {
        previous = portion;
        selected = previous;
        //Determine Index of recipe
        for (let i = 0; i < RecipeList.length; i++) {
            if (title === RecipeList[i].title) { break; }
            recipeIndex++;
        }

    }
    //This function will convert the grocery servings to the set portion
    //Selection = New selection, previous = Previous selection (Default values start as original)
    changePortion = (selection, previous, recipeIndex) => {
        //No change
        if (selection === previous) {
            return;
        }
        //Multiplier to get quantities back to original
        let multiplier = this.determineMultiplier(previous);

        //If new value is larger than oldValue, we are adding
        for (let item of RecipeList[recipeIndex].data) {
            let newQuantity = item.amount * multiplier;
            newQuantity *= selection;
            //Add difference into the hash table
            let diff = newQuantity - item.amount;
            //Set as new amount
            item.amount = newQuantity;

            let splitArray = item.name.split(" ");
            let newName = this.capitaliseString(splitArray);
            this.updateHashValue(diff, newName);
        }
        this.props.rebuildList();
    }
    updateHashValue = (diff, newName) => {
        let hashKey = this.hashFunction(newName);
        let collision = 0;
        let hashIndex = (hashKey + collision) % ArraySize;
        while (collision !== ArraySize) {
            if (HashTable[hashIndex].name === newName) {
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
            case 3: value = 1 / 3;
                break;
            case 2: value = 0.5;
                break;
            case 1: value = 1;
                break;
            case 3 / 4: value = 1 / 3;
                break;
            case 1 / 2: value = 2;
                break;
            case 1 / 3: value = 3;
                break;
            case 1 / 4: value = 4;
                break;
        }
        return value;
    }
    handlePress = (value) => {
        selected = value;
        this.forceUpdate();
    }
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
    render() {
        return (
            <Modal
                ref={'portionModal'}
                style={styles.container}
                position='center'
                backdrop={true}
            >
                <View style={styles.contents}>
                    <Text style={styles.headerText}>Serving Portions</Text>
                    <FlatList
                        scrollEnabled={false}
                        data={DATA}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => this.handlePress(item.value)}
                            >
                                <Item title={item.title} text={item.text} value={item.value} />
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.title}
                    />
                    <Button
                        onPress={() => {
                            this.changePortion(selected, previous, recipeIndex);
                            RecipeList[recipeIndex].portion = selected;
                            this.props.MainRefresh();
                            recipeIndex = 0;
                            this.refs.portionModal.close();
                        }}
                        title='Save Portion'
                        color='dodgerblue'
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
        height: 400,
        alignItems: 'center',
    },
    contents: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 15,
    },
    headerText: {
        fontSize: 25,
        marginBottom: 10,
        color: '#778899',
    },
    itemCard: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: "#e8e8e8",
        width: screen.width - 100,
        borderRadius: 5,
    },
    selected: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'cornflowerblue',
        borderRadius: 5,
    },
    itemCardText: {
        fontSize: 15,
        margin: 10,
        textAlign: 'center',
    },
    selectedCardText: {
        color: 'white',
    },
    multiplierText: {
        fontSize: 15,
        margin: 10,
        textAlign: 'center',
        color: '#ccc'
    },
    text: {
        fontFamily: "SourceSansPro",
    },
})