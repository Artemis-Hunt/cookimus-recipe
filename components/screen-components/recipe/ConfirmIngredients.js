import React, { Component } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Modal from "react-native-modalbox";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import SavedRecipes from "../../../data/SavedRecipes.js";
import UnitSelectModal from "../grocery-list/UnitSelectModal.js";
import HashFunctions from "../grocery-list/HashFunctions.js";

let DATA = [];

//Render card for ingredients
const RenderItemCard = ({
  item,
  index,
  handlenameupdate,
  handlequantityupdate,
  selectUnitModal,
  calldetermineclass,
}) => {
  if (index % 2 === 0) {
    //Print out original recipe
    return (
      <View style={styles.originalCard}>
        <Text style={[styles.bodyFontSize]}>{item.ingredient}</Text>
      </View>
    );
  } else {
    //Render Card for Editing Purpose
    return (
      <View style={styles.moddedCard}>
        <View style={styles.rowView}>
          <TextInput
            style={[styles.textInput, { flex: 6 }]}
            placeholder={item.ingredientDetails.name}
            value={item.ingredientDetails.name}
            onChangeText={(text) => {
              handlenameupdate(text, index);
            }}
          />
          <TextInput
            style={[styles.textInput, { flex: 1.5 }]}
            keyboardType={"numeric"}
            numeric
            value={`${item.ingredientDetails.amount}`}
            onChangeText={(text) => {
              handlequantityupdate(text, index);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              let unitClass = calldetermineclass(item.ingredientDetails.unit);
              selectUnitModal(index, unitClass.unit);
            }}
          >
            <View style={[styles.textInput, styles.unitBox]}>
              <Text>{item.ingredientDetails.unit}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

export default class ConfirmItemModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editArray: [],
    };
    this.handleNameUpdate = this.handleNameUpdate.bind(this);
    this.handleQuantityUpdate = this.handleQuantityUpdate.bind(this);
    this.handleUnitUpdate = this.handleUnitUpdate.bind(this);
    this.callDetermineClass = this.callDetermineClass.bind(this);
    this.callUnitModal = this.callUnitModal.bind(this);
    this.originalIngredients = this.props.route.params.originalIngredients;
    this.modIngredients = this.props.route.params.modIngredients;
  }

  componentDidMount() {
      this.buildDataArray();
  }
  //Run whenever there is a state change and check if added
  // componentDidUpdate() {
  //     let checkFlag = false;
  //     for (let checkLink of SavedRecipes) {
  //         if (checkLink.url === this.props.url) {
  //             checkFlag = true;
  //             break;
  //         }
  //     }
  //     if (checkFlag === false && this.state.editArray.length === 0) {
  //         this.buildDataArray();
  //         this.refs.confirmItemModal.open();
  //     }
  // }
  //Build the data list with alternating original ingredients and modded ingredients
  buildDataArray() {
    DATA = [];
    for (let i = 0; i < this.originalIngredients.length; i++) {
      let originalItem = {}
      originalItem.ingredient = this.originalIngredients[i];
      DATA.push(originalItem);
      //Alternate
      let modItem = {}
      modItem.ingredientDetails = this.modIngredients[i];
      DATA.push(modItem);
    }
    this.setState({ editArray: DATA });
  }
  //Call function to get the unit details of the item
  callDetermineClass(unit) {
    return this.refs.hashfunctions.determineClass(unit);
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
  handleUnitUpdate(unit, index) {
    let tempArray = this.state.editArray;
    //Read in as text - Remember to change to number when saving
    tempArray[index].ingredientDetails.unit = unit;
    this.setState({ editArray: tempArray });
  }
  callUnitModal(key, unit) {
    this.refs.unitselectconfirm.renderForConfirm(key, unit);
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => {this.props.navigation.goBack()}}
        >
          <MaterialCommunityIcons name="close" size={35} color="#CCC" />
        </TouchableOpacity>
        <View style={styles.rowView}>
          <Text style={styles.headerText}>Confirm Ingredients</Text>
          {/* <View style={{ marginTop: 3 }}>
            <Ionicons name="ios-checkmark-circle" size={24} color="green" />
          </View> */}
        </View>
        <FlatList
          data={this.state.editArray}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <RenderItemCard
              item={item}
              index={index}
              handlenameupdate={this.handleNameUpdate}
              handlequantityupdate={this.handleQuantityUpdate}
              selectUnitModal={this.callUnitModal}
              calldetermineclass={this.callDetermineClass}
            />
          )}
        />
        <UnitSelectModal
          ref={"unitselectconfirm"}
          unitUpdate={this.handleUnitUpdate}
        />
        <HashFunctions ref={"hashfunctions"} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginHorizontal: 5,
  },
  headerText: {
    fontSize: 25,
    color: "#778899",
    margin: 10,
  },
  bodyFontSize: {
    fontSize: 16,
  },
  rowView: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  originalCard: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: "#E8E8E8",
    paddingVertical: 5,
    justifyContent: "flex-start",
  },
  moddedCard: {
    flex: 1,
    marginBottom: 5,
  },
  closeButton: {
    marginHorizontal: 10,
    marginTop: 5,
    justifyContent: "flex-end",
    alignSelf: "center",
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
  },
});
