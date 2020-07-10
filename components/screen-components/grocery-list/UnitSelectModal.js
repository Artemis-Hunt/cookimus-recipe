import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View, Dimensions, TouchableOpacity, Button } from 'react-native';
import Modal from 'react-native-modalbox';

import RecipeList from '../../../data/RecipeList.js'

let screen = Dimensions.get('window');

const DATA = [
    { title: 'No Units', value: "" },
    { title: "Gram", value: "grams" },
    { title: "Kilogram", value: "kg" },
    { title: "Pound", value: "pound" },
    { title: "Ounce", value: "ounce" },
    { title: "Quart", value: "quart" },
    { title: "Pint", value: "pint" },
    { title: "Cups", value: "cups" },
    { title: "Tablespoon", value: "tbsp" },
    { title: "Teaspoon", value: "tsp" },
    { title: "Millilitres", value: "ml" },
    { title: "Litres", value: "litres" },
]
let selected;
let noUnitFlag = true;
let itemKey;

//Render items of flatlist
const Item = ({ title, value }) => {
    let cardStyle = (selected === title) ? styles.selected : styles.itemCard;
    let cardTextStyle = (selected === title) ? [styles.selectedCardText, styles.text, styles.itemCardText] : [styles.itemCardText, styles.text];
    return (
        <View style={cardStyle}>
            <Text style={cardTextStyle}>{title}</Text>
        </View>
    )
}

export default class UnitSelectModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refresh: false,
        }
    }
    forceUpdate() {
        this.setState({ refresh: !this.state.refresh })
    }
    renderModal = (key) => {
        itemKey = key;
        let [name, recipeIndex, ingrIndex] = itemKey.split(".");
        let itemUnit = RecipeList[recipeIndex].data[ingrIndex].unitDetails.unit;
        //Determine current selected Unit
        if(itemUnit === '') {
            selected = 'No Units';
        } else {
            for(let unitTitle of DATA) {
                if(itemUnit.includes(unitTitle)) {
                    selected = unitTitle;
                    break;
                }
            }
        }
        selected = DATA[0].title;
        this.refs.unitselectmodal.open();
    }
    clearData = () => {
        if(noUnitFlag === false) {
            DATA.splice(0, 1);
        }
        noUnitFlag = true;
    }
    handlePress = (title) => {
        selected = title;
        this.forceUpdate();
        //Change units in recipeList
        this.props.unitUpdate(title, itemKey);
    }
    render() {
        return (
            <Modal
                ref={'unitselectmodal'}
                style={styles.container}
                postion='center'
                backdrop={true}
                onClosed={() => this.clearData()}
            >
                <View style={styles.contents}>
                    <Text style={styles.headerText}>Edit Units</Text>
                    <FlatList
                        data={DATA}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => this.handlePress(item.title)}
                            >
                                <Item title={item.title} value={item.value} />
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
        height: 300,
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
    text: {
        fontFamily: "SourceSansPro",
    },
})