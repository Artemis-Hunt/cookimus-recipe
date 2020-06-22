import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  SectionList,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";

import DropMenu from "../screen-components/grocery-list/DropMenu.js";
import MenuBar from "../screen-components/grocery-list/MenuBar.js";
import Item from "../screen-components/grocery-list/Item.js";
import RecipeList from "../../data/RecipeList";
import CombinedList from "../../data/CombinedList.js";
import HashTable from "../../data/HashTable.js";
import SavedRecipes from "../../data/SavedRecipes.js"

//Size of hash table
const ArraySize = 100;
const Multiplier = 37;

const ItemSeparator = () => {
  return <View style={styles.separator} />;
};

export default class GroceryList extends Component {
  constructor(props) {
    super(props);
    this.splitArray = "";
    this.combinedItem = "";
    this.key;
    this.oldLength = RecipeList.length;
    this.state = {
      showComponent: false,
      name: "",
      quantity: "",
      units: "",
      incompleteField: "",
      refresh: false,
      combine: false,
    };
    this._handleButtonClick = this._handleButtonClick.bind(this);
    this._handleCloseClick = this._handleCloseClick.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleQuantity = this.handleQuantity.bind(this);
    this.handleUnits = this.handleUnits.bind(this);
  }

  //Run combine list on startup
  componentDidMount() {
    this.combineFunction(RecipeList.length);
    this.bulkGenerateKey(0);
    this.unsubscribe = this.props.navigation.addListener("tabPress", (e) => {
      this.forceUpdate();
    });
  }

  //Run combine list on refresh
  componentDidUpdate() {
    let newLength = RecipeList.length;
    if (newLength > this.oldLength) {
      //Update new table, add to combined list
      let index = newLength - this.oldLength;
      this.oldLength = newLength;
      this.combineFunction(index);
      this.bulkGenerateKey(newLength);
      this.forceUpdate();
    }
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  //Generate keys in bulk
  bulkGenerateKey(startIndex) {
    for (let i = startIndex; i < RecipeList.length; i++) {
      for (let j = 0; j < RecipeList[i].data.length; j++) {
        //Generate keys for each item, if it hasn't already been done
        RecipeList[i].data[j].key = this.generateKey(i, j);
      }
    }
  }

  _handleButtonClick() {
    this.setState({
      showComponent: true,
    });
  }

  _handleCloseClick() {
    this.setState({
      showComponent: false,
    });
  }

  toggleMenu() {
    this.setState({
      combine: !this.state.combine,
    });
  }

  forceUpdate() {
    this.setState({ refresh: !this.state.refresh })
  }

  handleName = (text) => {
    this.setState({ name: text });
  };

  handleQuantity = (text) => {
    this.setState({ quantity: text });
  };

  handleUnits = (item) => {
    this.setState({ units: item });
  };

  generateKey = (i, j) => {
    let key = `${RecipeList[i].data[j].name}.${i}.${j}`;
    return key;
  };

  //Deletes items from the hashtable to update combined list
  hashDelete = (recipeIndex, ingrIndex) => {
    //Reference the item to be deleted
    let toDelete = RecipeList[recipeIndex].data[ingrIndex];
    this.splitArray = toDelete.name.split(" ");
    this.capitaliseString();

    //Update hash table. Delete entry if required
    let hashKey = this.hashFunction(this.combinedItem);
    let collision = 0;
    let hashIndex = (hashKey + collision) % ArraySize;
    while (collision !== ArraySize) {
      if (HashTable[hashIndex].name === this.combinedItem) {
        HashTable[hashIndex].amount -= toDelete.amount;
        if (HashTable[hashIndex].amount <= 0) {
          HashTable[hashIndex].name = null;
          HashTable[hashIndex].amount = "";
          HashTable[hashIndex].unit = "";
          HashTable[hashIndex].deleted = 1;
        }
        break;
      }
      collision++;
      hashIndex = (hashKey + collision) % ArraySize;
    }
    //Need to change where this is called
    this.addToCombined();
  }

  //Delte function for list
  deleteItem = (id) => {
    //Split id into name / recipe index / ingredient index
    let [name, recipeIndex, ingrIndex] = id.split(".");
    this.hashDelete(recipeIndex, ingrIndex);
    //Remove ingredient from RecipeList. Update keys for ingredients after deleted ingredient
    RecipeList[recipeIndex].data.splice(ingrIndex, 1);
    for (let j = ingrIndex; j < RecipeList[recipeIndex].data.length; j++) {
      RecipeList[recipeIndex].data[j].key = this.generateKey(recipeIndex, j);
    }
    //Remove Title from RecipeList
    if (
      RecipeList[recipeIndex].data.length === 0 &&
      RecipeList[recipeIndex].title !== "Added to list"
    ) {
      //Clear Savedrecipe
      for (let i = 0; i < SavedRecipes.length; i++) {
        if (RecipeList[recipeIndex].title === SavedRecipes[i].title) {
          SavedRecipes.splice(i, 1);
          break;
        }
      }
      RecipeList.splice(recipeIndex, 1);
      this.oldLength = RecipeList.length;
      this.bulkGenerateKey(recipeIndex);
    }
  };

  //Delete entire recipe at once
  deleteSection = (title) => {
    let index = 0;
    //Finding index of the recipe in recipelist
    for (let i of RecipeList) {
      if (i.title === title) { break; }
      index++;
    }
    //Bulk delete of all ingredients found in recipe
    for (let j = 0; j < RecipeList[index].data.length; j++) {
      this.hashDelete(index, j);
    }
    //Delete entire entry
    if (RecipeList[index].title !== "Added to list") {
      for (let i = 0; i < SavedRecipes.length; i++) {
        if (RecipeList[index].title === SavedRecipes[i].title) {
          SavedRecipes.splice(i, 1);
          break;
        }
      }
      RecipeList.splice(index, 1);
      this.oldLength = RecipeList.length;
      this.bulkGenerateKey(RecipeList.length);
    } else {
      //Delete all except title for added to list
      RecipeList[index].data.splice(0, RecipeList[index].data.length);
    }
  }

  //Check if entered is valid
  _verifyInfo = (name, quantity, units) => {
    if (name && quantity) {
      let newObject = { name: "", amount: "", unit: "" };

      newObject.name = this.state.name;
      newObject.amount = this.state.quantity;
      newObject.unit = this.state.units;

      //Recipe Index
      let RecipeIndex = RecipeList.length - 1;
      //itemIndex
      let itemIndex = RecipeList[RecipeIndex].data.length;

      RecipeList[RecipeIndex].data.push(newObject);
      RecipeList[RecipeIndex].data[itemIndex].key = this.generateKey(
        RecipeIndex,
        itemIndex
      );

      this.handleSingleItem(newObject.name, itemIndex);

      //Clear fields
      this.setState({ name: "", quantity: "", units: "", incompleteField: "" });
    } else this.setState({ incompleteField: "Please fill in all fields" });
  };

  //Hashes the passed in string in item and returns the key
  hashFunction = (item) => {
    let total = 0;

    for (let i = 0; i < item.length; i++) {
      total += Multiplier * total + item.charCodeAt(i);
    }
    total %= ArraySize;

    return total;
  };

  //This function will handle the item added to the combined list
  handleNewItem = (i, j) => {
    //Handling item slotting/collisions
    let collision = 0;
    let hashIndex = (this.key + collision) % ArraySize;
    while (collision !== ArraySize) {
      //Need to fix for deletion
      if (
        (HashTable[hashIndex].name === null ||
          HashTable[hashIndex].deleted === 1) &&
        HashTable[hashIndex].name !== this.combinedItem
      ) {
        //Space in hashtable is empty, set as new object in hashTable - Currently dosent attend to different units
        HashTable[hashIndex].name = this.combinedItem;
        HashTable[hashIndex].amount = Number(RecipeList[i].data[j].amount);
        HashTable[hashIndex].unit = RecipeList[i].data[j].unit;
        HashTable[hashIndex].deleted = 0;
        return;
      } else if (HashTable[hashIndex].name === this.combinedItem) {
        //Same Item, add amounts
        HashTable[hashIndex].amount += Number(RecipeList[i].data[j].amount);
        return;
      }
      collision++;
      hashIndex = (this.key + collision) % ArraySize;
    }
    if (collision === ArraySize) alert("Error, array full");
  };

  //This function adds all the items in the hashtable into the combinedlist
  addToCombined = () => {
    //Clear item
    CombinedList[0].data.splice(0, CombinedList[0].data.length);
    for (let i = 0; i < ArraySize; i++) {
      if (HashTable[i].name !== null) {
        CombinedList[0].data.push(HashTable[i]);
      }
    }
  };

  //This function will add to combined list single items - No need to loop entire list
  handleSingleItem = (newSingleItem, itemIndex) => {
    this.splitArray = newSingleItem.split(" ");
    this.capitaliseString();
    this.key = this.hashFunction(this.combinedItem);
    this.handleNewItem(RecipeList.length - 1, itemIndex);
    this.addToCombined();
  };

  //Function to capitalise first letter of all leading words in string
  capitaliseString = () => {
    for (let k = 0; k < this.splitArray.length; k++) {
      this.splitArray[k] =
        this.splitArray[k][0].toUpperCase() + this.splitArray[k].substr(1); //Appends everything else from index 1 onwards

      //Combine back
      this.combinedItem = this.splitArray.join(" ");
    }
  };

  //Pass in single recipes at a time in recipe list format, add into hash table
  //Outer to loop through all the individual Recipes - Currently loops from start of list
  combineFunction = (index) => {
    for (let i = 0; i < index; i++) {
      //Loop through all the individual ingriedients in each recipe
      for (let j = 0; j < RecipeList[i].data.length; j++) {
        //Split ingriedient into different parts if more than 1 word and capitalise all starting
        let newItem = RecipeList[i].data[j].name;
        this.splitArray = newItem.split(" ");
        this.capitaliseString();

        //Hash combinedItem
        this.key = this.hashFunction(this.combinedItem);

        //Add item into hash table
        this.handleNewItem(i, j);
      }
    }
    //Move all items from hash table into the combined list
    this.addToCombined();
  };

  render() {
    return (
      <View style={styles.container}>
        {/* Menu Bar */}
        <MenuBar
          buttonClick={this._handleButtonClick}
          togglemenu={this.toggleMenu}
        />

        {/* Toggle menu for add item */}
        {this.state.showComponent ? (
          <DropMenu
            close={this._handleCloseClick}
            name={this.state.name}
            quantity={this.state.quantity}
            unit={this.state.units}
            handlename={this.handleName}
            handlequantity={this.handleQuantity}
            handleunits={this.handleUnits}
            verifyinfo={this._verifyInfo}
            incomplete={this.state.incompleteField}
          />
        ) : null}

        {/* Determine whether to render combined list or individual list */}
        {this.state.combine ? (
          <SectionList
            stickySectionHeadersEnabled={true}
            sections={CombinedList}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <Item
                  title={item.name}
                  amounts={item.amount}
                  units={item.unit}
                />
              </TouchableOpacity>
            )}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={[styles.header, styles.text]}>{title}</Text>
            )}
            ItemSeparatorComponent={ItemSeparator}
          />
        ) : (
            <SectionList
              stickySectionHeadersEnabled={true}
              sections={RecipeList}
              keyExtractor={(item, index) => item + index}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    this.deleteItem(item.key);
                    this.forceUpdate();
                  }}
                >
                  <Item
                    title={item.name}
                    amounts={item.amount}
                    units={item.unit}
                  />
                </TouchableOpacity>
              )}
              renderSectionHeader={({ section: { title } }) => (
                <TouchableOpacity
                  onPress={() => {
                    this.deleteSection(title);
                    this.forceUpdate();
                  }}
                >
                  <Text style={[styles.header, styles.text]}>{title}</Text>
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={ItemSeparator}
            />
          )}
      </View>
    );
  }
}

//StyleSheets
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  //Recipe Names
  header: {
    padding: 10,
    fontSize: 24,
    backgroundColor: "#E8E8E8",
    color: "black",
  },
  //Main Top Bar Text
  title: {
    fontSize: 38,
    color: "#FFF",
    paddingTop: 0,
    paddingLeft: 170,
    position: "absolute",
  },
  //Main Top Bar Background
  titleCard: {
    flexDirection: "row",
    alignContent: "center",
  },
  text: {
    fontFamily: "SourceSansPro",
  },
  separator: {
    height: 2,
    backgroundColor: "#E8E8E8",
  },
});
