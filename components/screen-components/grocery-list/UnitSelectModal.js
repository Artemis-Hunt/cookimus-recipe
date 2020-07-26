import React, { Component } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Button,
  TextInput,
} from "react-native";
import Modal from "react-native-modalbox";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import RecipeList from "../../../data/RecipeList.js";

let screen = Dimensions.get("window");

const UnitsTable = [
  { title: "No Units", value: "" },
  { title: "kilogram", value: "kg" },
  { title: "gram", value: "g" },
  { title: "pound", value: "lb." },
  { title: "ounce", value: "oz." },
  { title: "quart", value: "qt." },
  { title: "pint", value: "pint" },
  { title: "cup", value: "cup" },
  { title: "tablespoon", value: "tbsp" },
  { title: "teaspoon", value: "tsp" },
  { title: "millilitre", value: "ml" },
  { title: "litre", value: "l" },
];
let selected = "";
let itemKey;

//Render items of flatlist
const Item = ({ title, value }) => {
  let cardStyle = selected === title ? styles.selected : styles.itemCard;
  let cardTextStyle =
    selected === title
      ? [styles.selectedCardText, styles.text, styles.itemCardText]
      : [styles.itemCardText, styles.text];
  return (
    <View style={cardStyle}>
      <Text style={cardTextStyle}>{title}</Text>
      {title === "No Units" ? null : (
        <Text style={styles.unitText}>{value}</Text>
      )}
    </View>
  );
};

export default class UnitSelectModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: false,
      tempUnit: "",
    };
    this.itemToConfirmUnits = {}; //Reference to ingredient oject to be modified
  }
  forceUpdate() {
    this.setState({ refresh: !this.state.refresh });
  }
  //Render Modal when called from grocery list
  renderModal = (item) => {
    this.itemToConfirmUnits = item;
    let itemUnit = item.unitDetails.unit;
    //Determine current selected Unit
    if (itemUnit === "") {
      selected = "No Units";
    } else {
      for (let unitsEntry of UnitsTable) {
        if (itemUnit.includes(unitsEntry.title)) {
          selected = unitsEntry.title;
          break;
        }
      }
    }
    this.refs.unitselectmodal.open();
  };
  //Render Modal when called from recipe view
  renderForConfirm = (item, unit) => {
    this.itemToConfirmUnits = item;
    //Determine current selected Unit
    if (unit === "") {
      selected = "No Units";
    } else {
      for (let unitsEntry of UnitsTable) {
        if (unit.includes(unitsEntry.title)) {
          selected = unitsEntry.title;
          break;
        }
      }
    }
    this.refs.unitselectmodal.open();
  };
  //Resets variables in modal
  clearData = () => {
    selected = "";
    this.setState({ tempUnit: "" });
  };
  //Handles when an item in the flatlist is selected
  handlePress = (title) => {
    //alert("Previous: " + selected);
    selected = title;
    this.forceUpdate();
    this.itemToConfirmUnits.edited = true;
    //Change units in recipeList
    this.props.unitUpdate(this.itemToConfirmUnits, title);
    //alert("Updated: " + selected);
    this.refs.unitselectmodal.close();
  };
  handleCustomUnit = (text) => {
    this.setState({ tempUnit: text });
  };
  //Update unit to be new custom unit
  submitCustomUnit = (item) => {
    let customUnit = this.state.tempUnit;
    customUnit = customUnit.trim();
    this.itemToConfirmUnits.edited = true;
    this.props.unitUpdate(this.itemToConfirmUnits, customUnit);
  };
  render() {
    return (
      <Modal
        ref={"unitselectmodal"}
        style={styles.container}
        postion="center"
        backdrop={true}
        onClosed={() => {
          this.clearData();
        }}
      >
        <View style={styles.contents}>
          <View style={styles.headerBar}>
            <Text style={[styles.text, styles.headerText]}>Select Units </Text>
            <View style={styles.iconStyle}>
              <MaterialCommunityIcons name="scale" size={24} color="black" />
            </View>
          </View>
          <FlatList
            data={UnitsTable}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => this.handlePress(item.title)}>
                <Item title={item.title} value={item.value} />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.title}
          />
          <View style={styles.customUnitContainer}>
            <TextInput
              style={styles.textInput}
              placeholder={"Enter custom unit"}
              value={this.tempUnit}
              onChangeText={(text) => {
                this.handleCustomUnit(text);
              }}
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => {
                this.submitCustomUnit(this.itemToConfirmUnits);
                this.refs.unitselectmodal.close();
              }}
            >
              <Text style={[styles.text, styles.saveButtonText]}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    borderRadius: 20,
    shadowRadius: 10,
    width: screen.width - 80,
    height: 350,
    alignItems: "center",
  },
  contents: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 15,
  },
  headerText: {
    fontSize: 25,
    marginBottom: 5,
    color: "#778899",
  },
  subHeading: {
    fontSize: 20,
    marginVertical: 8,
    color: "#778899",
  },
  itemCard: {
    flexDirection: "row",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e8e8e8",
    width: screen.width - 100,
    borderRadius: 5,
  },
  selected: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "cornflowerblue",
    borderRadius: 5,
  },
  itemCardText: {
    fontSize: 15,
    margin: 10,
    textAlign: "center",
  },
  selectedCardText: {
    color: "white",
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
    textAlign: "center",
    color: "#ccc",
  },
  textInput: {
    height: 30,
    padding: 5,
    borderColor: "#CCC",
    borderBottomWidth: 1,
    borderRadius: 5,
    backgroundColor: "white",
    width: 150,
  },
  customUnitContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  saveButton: {
    marginHorizontal: 15,
    paddingTop: 4,
  },
  saveButtonText: {
    fontSize: 17,
    color: "dodgerblue",
  },
  text: {
    fontFamily: "SourceSansPro",
  },
});
