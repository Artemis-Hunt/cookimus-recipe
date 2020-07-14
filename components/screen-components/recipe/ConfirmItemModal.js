import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import Modal from 'react-native-modalbox';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import SavedRecipes from "../../../data/SavedRecipes.js"
import UnitSelectModal from "../grocery-list/UnitSelectModal.js"

let DATA = [];

//Render card for ingredients
const RenderItemCard = ({ info, handlenameupdate, handlequantityupdate, selectUnitModal }) => {
    if (info.key % 2 === 0) {
        //Print out original recipe
        return (
            <View style={styles.originalCard}>
                <Text style={[styles.bodyFontSize]}>{info.ingredient}</Text>
            </View>
        )
    } else {
        //Render Card for Editing Purpose
        return (
            <View style={styles.moddedCard}>
                <View style={styles.rowView}>
                    <TextInput
                        style={[styles.textInput, { flex: 6 }]}
                        placeholder={info.ingredientDetails.name}
                        value={info.ingredientDetails.name}
                        onChangeText={(text) => {
                            handlenameupdate(text, info.key);
                        }}
                    />
                    <TextInput
                        style={[styles.textInput, { flex: 1.5 }]}
                        keyboardType={"numeric"}
                        numeric
                        value={`${info.ingredientDetails.amount}`}
                        onChangeText={(text) => {
                            handlequantityupdate(text, info.key);
                        }}
                    />
                    <TouchableOpacity
                        onPress={() => selectUnitModal(info.key)}
                    >
                        <View style={[styles.textInput, styles.unitBox]}>
                            <Text>{info.ingredientDetails.unit}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default class ConfirmItemModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editArray: [],
        }
        this.handleNameUpdate = this.handleNameUpdate.bind(this);
        this.handleQuantityUpdate = this.handleQuantityUpdate.bind(this);
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
    }
    //Build the data list with alternating original ingredients and modded ingredients
    buildDataArray() {
        let indexCount = 0;
        DATA = [];
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
        this.setState({ editArray: DATA });
    }

    handleNameUpdate(text, index) {
        let tempArray = this.state.editArray;
        tempArray[index].ingredientDetails.name = text;
        this.setState({ editArray: tempArray });
    }
    handleQuantityUpdate(text, index) {
        let tempArray = this.state.editArray;
        //Read in as text - Remember to change to number when saving
        tempArray[index].ingredientDetails.amount = text;
        this.setState({ editArray: tempArray });
    }
    callUnitModal(key) {
        this.refs.unitselectconfirm.renderForConfirm(key);
    }

    render() {
        return (
            <Modal
                ref={'confirmItemModal'}
                style={styles.container}
                swipeToClose={false}
            >
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => this.refs.confirmItemModal.close()}

                >
                    <MaterialCommunityIcons name="close" size={35} color="#CCC" />
                </TouchableOpacity>
                <View style={styles.rowView}>
                    <Text style={styles.headerText}>Confirm Ingredients</Text>
                    <View style={{ marginTop: 3 }}>
                        <Ionicons name="ios-checkmark-circle" size={24} color="green" />
                    </View>
                </View>
                <FlatList
                    data={this.state.editArray}
                    renderItem={({ item }) => (
                        <RenderItemCard
                            info={item}
                            handlenameupdate={this.handleNameUpdate}
                            handlequantityupdate={this.handleQuantityUpdate}
                        />
                    )}
                    keyExtractor={item => item.key.toString()}
                />
                <UnitSelectModal 
                    ref={"unitselectconfirm"}
                    unitUpdate={this.handleUnitUpdate}
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
    bodyFontSize: {
        fontSize: 16,
    },
    rowView: {
        flexDirection: "row",
        alignItems: "center",
    },
    originalCard: {
        flex: 1,
        borderTopWidth: 1,
        borderTopColor: "#E8E8E8",
        paddingVertical: 5,
        justifyContent: "flex-start"
    },
    moddedCard: {
        flex: 1,
        marginBottom: 5,
    },
    closeButton: {
        marginHorizontal: 10,
        marginTop: 5,
        justifyContent: "flex-end",
    },
    textInput: {
        height: 30,
        padding: 5,
        borderColor: "#CCC",
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: "white",
        marginHorizontal: 5,
    },
    unitBox: {
        width: 100,
    }
})