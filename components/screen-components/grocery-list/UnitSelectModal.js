import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View, Dimensions, TouchableOpacity, Button, TextInput } from 'react-native';
import Modal from 'react-native-modalbox';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import RecipeList from '../../../data/RecipeList.js'

let screen = Dimensions.get('window');

const DATA = [
    { title: 'No Units', value: "" },
    { title: "gram", value: "g" },
    { title: "kilogram", value: "kg" },
    { title: "pound", value: "lb." },
    { title: "ounce", value: "oz." },
    { title: "quart", value: "qt." },
    { title: "pint", value: "pint" },
    { title: "cup", value: "cup" },
    { title: "tablespoon", value: "tbsp" },
    { title: "teaspoon", value: "tsp" },
    { title: "millilitre", value: "ml" },
    { title: "litre", value: "l" },
]
let selected = '';
let noUnitFlag = true;
let itemKey;

//Render items of flatlist
const Item = ({ title, value }) => {
    let cardStyle = (selected === title) ? styles.selected : styles.itemCard;
    let cardTextStyle = (selected === title) ? [styles.selectedCardText, styles.text, styles.itemCardText] : [styles.itemCardText, styles.text];
    return (
        <View style={cardStyle}>
            <Text style={cardTextStyle}>{title}</Text>
            {(title === "No Units") ? null : <Text style={styles.unitText}>{value}</Text>}
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
        if (itemUnit === '') {
            selected = 'No Units';
        } else {
            for (let item of DATA) {
                if (itemUnit.includes(item.title)) {
                    selected = item.title;
                    break;
                }
            }
            if (selected === '') {
                //Will input into text box in here
            }
        }
        this.refs.unitselectmodal.open();
    }
    clearData = () => {
        if (noUnitFlag === false) {
            DATA.splice(0, 1);
        }
        noUnitFlag = true;
        selected = '';
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
                    <View style={styles.headerBar}>
                        <Text style={styles.headerText}>Edit Units </Text>
                        <View style={styles.iconStyle}>
                            <MaterialCommunityIcons name="scale" size={24} color="black" />
                        </View>
                    </View>
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
                    <Text style={styles.subHeading}>Enter Custom Unit</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder={"Enter Units"}
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
        marginBottom: 5,
        color: '#778899',
    },
    subHeading: {
        fontSize: 20,
        marginVertical: 5,
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
    headerBar: {
        flexDirection: "row",
        borderBottomWidth: 2,
        borderBottomColor: "gold",
    },
    iconStyle: {
        paddingTop: 3,
    },
    unitText: {
        fontSize: 15,
        margin: 10,
        textAlign: 'center',
        color: '#ccc'
    },
    textInput: {
        height: 30,
        padding: 5,
        borderColor: "#CCC",
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: "white",
        width: 150,
      },
})