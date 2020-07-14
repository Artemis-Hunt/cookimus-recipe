import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import Modal from 'react-native-modalbox';
import { Ionicons } from '@expo/vector-icons';

import SavedRecipes from "../../../data/SavedRecipes.js"

let DATA = [];

//Render card for ingredients
const RenderItemCard = ({ info }) => {
    if (info.key % 2 === 0) {
        //Print out original recipe
        return (
            <Text>{info.ingredient}</Text>
        )
    } else {
        //Render Card for Editing Purpose
        return (
            <Text>{info.ingredientDetails.name}</Text>
        )
    }
}

export default class ConfirmItemModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editArray: [],
        }
    }
    //Run whenever there is a state change and check if added
    componentDidUpdate() {
        let checkFlag = false;
        for (let checkLink of SavedRecipes) {
            if (checkLink.url === this.props.url) {
                checkFlag = true;
                break;
            }
        }
        if (checkFlag === false && this.state.editArray.length === 0) {
            this.buildDataArray();
            this.refs.confirmItemModal.open();
        }
        // if (this.props.modalState === true) {
        //     this.buildDataArray();
        //     this.refs.confirmItemModal.open();
        // }
    }
    //Build the data list with alternating original ingredients and modded ingredients
    buildDataArray() {
        let indexCount = 0;
        for (let i = 0; i < this.props.originalIngre.length; i++) {
            let originalItem = { ingredient: "", key: "" };
            originalItem.ingredient = this.props.originalIngre[i];
            originalItem.key = indexCount;
            DATA.push(originalItem);
            indexCount++;
            //Alternate
            let modItem = { ingredientDetails: "", key: "" };
            modItem.ingredientDetails = this.props.modIngre[i];
            modItem.key = indexCount;
            DATA.push(modItem);
            indexCount++;
        }
        this.setState({ editArray: DATA});
    }
    //This function will clear the data array when Modal is closed
    clearData() {
        DATA = [];
        this.setState({ editArray: [] });
    }

    render() {
        return (
            <Modal
                ref={'confirmItemModal'}
                style={styles.container}
                onClosed={() => {
                    this.clearData();
                }}
            >
                <View style={styles.rowView}>
                    <Text style={styles.headerText}>Confirm Ingredients</Text>
                    <View style={{marginTop: 3}}>
                        <Ionicons name="ios-checkmark-circle" size={24} color="green" />
                    </View>
                </View>
                <FlatList
                    data={this.state.editArray}
                    renderItem={({ item }) => (
                        <RenderItemCard info={item} />
                    )}
                    keyExtractor={item => item.key.toString()}
                />
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 25,
        color: "#778899",
        padding: 10,
    },
    rowView: {
        flexDirection: "row",
        alignItems: "center",
    }
})