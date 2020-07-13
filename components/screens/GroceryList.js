import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  SectionList,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  KeyboardAvoidingView, Platform
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";

import DropMenu from "../screen-components/grocery-list/DropMenu.js";
import MenuBar from "../screen-components/grocery-list/MenuBar.js";
import Item from "../screen-components/grocery-list/Item.js";
import PortionModal from "../screen-components/grocery-list/PortionModal.js";
import UnitSelectModal from "../screen-components/grocery-list/UnitSelectModal.js";
import RecipeList from "../../data/RecipeList";
import CombinedList from "../../data/CombinedList.js";
import HashTable from "../../data/HashTable.js";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";

import HashFunctions from "../screen-components/grocery-list/HashFunctions.js";

import UserContext from "../context/UserContext";

import {
  groceryListPush,
  groceryListDelete,
  groceryListCustomPush,
  getUserDataRef,
} from "../../config/Firebase/firebaseConfig";

//Size of hash table
const ArraySize = 200;
let verifyFlag = false;

const ItemSeparator = () => {
  return <View style={styles.separator} />;
};

export default class GroceryList extends Component {
  constructor(props) {
    super(props);
    this.oldLength = RecipeList.length;
    this.state = {
      showComponent: false,
      name: "",
      quantity: "",
      units: "",
      incompleteField: "",
      refresh: false,
      combine: false,
      editMode: false,
      groceryList: [],
      editList: [],
    };
    this.showAddItem = this.showAddItem.bind(this);
    this.hideAddItem = this.hideAddItem.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleNameUpdate = this.handleNameUpdate.bind(this);
    this.handleQuantityUpdate = this.handleQuantityUpdate.bind(this);
    this.handleUnitUpdate = this.handleUnitUpdate.bind(this);
    this.updateEditArray = this.updateEditArray.bind(this);
    this.handleQuantity = this.handleQuantity.bind(this);
    this.showModal = this.showModal.bind(this);
    this.showUnitSelectModal = this.showUnitSelectModal.bind(this);
    this.sendPortion = this.sendPortion.bind(this);
    this.forceUpdate = this.forceUpdate.bind(this);
    this.rebuildCombinedList = this.rebuildCombinedList.bind(this);
    this.callCombineFunction = this.callCombineFunction.bind(this);
    this.callBulkGenerate = this.callBulkGenerate.bind(this);
    this.callgenerateKey = this.callgenerateKey.bind(this);
    this.callhandleSingleItem = this.callhandleSingleItem.bind(this);
    this.callDeleteItem = this.callDeleteItem.bind(this);
    this.callDeleteSection = this.callDeleteSection.bind(this);
    this.callClearHashTable = this.callClearHashTable.bind(this);
  };

  //Run combine list on startup
  componentDidMount() {
    //Fetch from Firebase - not in use
    //this.fetchGroceryList();
    this.callCombineFunction(RecipeList.length);
    this.callBulkGenerate(0);
    //Trigger a re-render whenever the grocery list tab is pressed
    this.unsubscribeTabPress = this.props.navigation.addListener(
      "tabPress",
      (e) => {
        this.forceUpdate();
      }
    );
  }

  componentDidUpdate() {
    let newLength = RecipeList.length;
    if (newLength > this.oldLength) {
      //Update new table, add to combined list
      let index = newLength - this.oldLength;
      this.oldLength = newLength;
      if (verifyFlag === false) {
        this.callCombineFunction(index);
      }
      this.callBulkGenerate(0);
      this.forceUpdate();
    }
  }

  componentWillUnmount() {
    //Unsubscribe event handler
    this.unsubscribeTabPress();
    //this.unsubscribeSnapshot(); this.unsubscribeSnapshot =
  }

  //Fetch from Firebase - not in use
  // async fetchGroceryList() {
  //   return getUserDataRef().onSnapshot(
  //     (snapshot) => {
  //       //alert("Received snapshot" + snapshot.get("groceryList"))
  //       this.setState({ groceryList: snapshot.get("groceryList") });
  //     },
  //     (err) => alert(err)
  //   );
  // }

  showAddItem() {
    this.setState({
      showComponent: true,
    });
    if(this.state.editMode === true) {
      this.toggleEdit();
    }
  }

  hideAddItem() {
    this.setState({
      showComponent: false,
    });
  }

  toggleMenu() {
    this.setState({
      combine: !this.state.combine,
    });
  }
  //Toggles edit mode when toggle button is pressed
  toggleEdit() {
    this.setState({
      editMode: !this.state.editMode,
    });
    this.handleEditMode();
  }
  //Handles what happens when edit mode is called
  handleEditMode() {
    //Append new row into the RecipeList array / Remove temp rows
    if (this.state.editMode) {
      for (let item of RecipeList) {
        item.data.splice(item.data.length - 1, 1);
      }
      //Edits were made
      if (this.state.editList.length > 0) {
        //Redo combine function, regenerate all keys
        let deleteArray = [];
        for (let itemKey of this.state.editList) {
          //New Item Added, check if all blank
          let [name, i, j] = itemKey.split(".");
          if (RecipeList[i].data[j].name === "" && RecipeList[i].data[j].amount === "" && RecipeList[i].data[j].unit === "") {
            let deleteIndex = { recipeIndex: i, ingrIndex: j };
            deleteArray.unshift(deleteIndex);
          }
        }
        for (let todelete of deleteArray) {
          let i = todelete.recipeIndex;
          let j = todelete.ingrIndex;
          RecipeList[i].data.splice(j, 1);
        }
        this.callClearHashTable();
        this.callCombineFunction(RecipeList.length);
        this.callBulkGenerate(0);
        //Reset EditList
        this.setState({ editList: [] });
        verifyFlag = false;
      }
    } else {
      let indexCount = 0;
      for (let item of RecipeList) {
        let addItemObject = { name: "Add Item...", index: indexCount }
        item.data.push(addItemObject);
        indexCount++;
      }
    }
  }

  forceUpdate() {
    this.setState({ refresh: !this.state.refresh });
  }

  handleName = (text) => {
    this.setState({ name: text });
  };

  handleQuantity = (text) => {
    this.setState({ quantity: text });
  };
  //Functions for modal
  showModal = () => {
    this.refs.portionModal.renderModal();
  };
  sendPortion = (portion, title) => {
    this.refs.portionModal.receivePortion(portion, title);
  };
  //Function to call unit selection modal
  showUnitSelectModal = (itemKey) => {
    this.refs.unitselectmodal.renderModal(itemKey);
  };

  //Functions to call hashFunctions
  callCombineFunction = (index) => {
    this.refs.hashFunctions.combineFunction(index);
  };
  callBulkGenerate = (startIndex) => {
    this.refs.hashFunctions.bulkGenerateKey(startIndex);
  };
  callgenerateKey = (recipeIndex, itemIndex) => {
    return this.refs.hashFunctions.generateKey(recipeIndex, itemIndex);
  };
  callhandleSingleItem = (name, index) => {
    this.refs.hashFunctions.handleSingleItem(name, index);
  };
  callDeleteItem = (key) => {
    let newLength = this.refs.hashFunctions.deleteItem(key);
    this.oldLength = newLength;
  };
  callDeleteSection = (title) => {
    let newLength = this.refs.hashFunctions.deleteSection(title);
    this.oldLength = newLength;
  };
  callClearHashTable = () => {
    this.refs.hashFunctions.clearHashTable();
  }

  //Handle Updating of variables in edit mode
  handleNameUpdate = (text, itemKey) => {
    let [name, recipeIndex, ingrIndex] = itemKey.split(".");
    let trimmedText = text.trim();
    RecipeList[recipeIndex].data[ingrIndex].name = trimmedText;
    this.updateEditArray(itemKey);
  }
  handleQuantityUpdate = (text, itemKey) => {
    let [name, recipeIndex, ingrIndex] = itemKey.split(".");
    //Number has to be in decimal for this function to work
    RecipeList[recipeIndex].data[ingrIndex].amount = Number(text);
    this.updateEditArray(itemKey);
  }
  handleUnitUpdate = (newUnit, itemKey) => {
    let unit = newUnit;
    if (unit === "No Units") {
      unit = "";
    }
    let [name, recipeIndex, ingrIndex] = itemKey.split(".");
    RecipeList[recipeIndex].data[ingrIndex].unit = unit;
    RecipeList[recipeIndex].data[ingrIndex].unitDetails.unit = unit;
    this.updateEditArray(itemKey);
  }
  updateEditArray = (itemKey) => {
    let tempEditArray = this.state.editList;
    tempEditArray.push(itemKey);
    //Set it as state
    this.setState({ editList: tempEditArray });
  }

  //Check if entered is valid
  _verifyInfo = (name, quantity) => {
    if (name) {
      verifyFlag = true;
      name = name.trim();
      let newRecipe = { title: name, data: [] };
      //Creating the empty slots to input ingredient info
      let count = Number(quantity);
      for (let i = 0; i < count; i++) {
        let defaultIngredientObject = { name: "", amount: "", unit: "", unitDetails: { unit: "", class: 0 } };
        newRecipe.data.push(defaultIngredientObject);
      }
      //Push into recipe list
      RecipeList.unshift(newRecipe);
      this.callBulkGenerate(0);
      for (let item of RecipeList[0].data) {
        this.updateEditArray(item.key);
      }
      if (this.state.editMode === false) {
        this.toggleEdit();
      }

      //REDACTED PART
      //Push the ingredient to "Added to list"
      //Don't await the promise to ensure UI fluidity
      //groceryListCustomPush({ [name]: ingredientToAdd });
      //END OF REDACTED

      //Clear fields
      this.hideAddItem();
      this.setState({ name: "", quantity: "", incompleteField: "" });
    } else this.setState({ incompleteField: "Please fill in all fields" });
  };

  //This function adds all the items in the hashtable into the combinedlist
  rebuildCombinedList = () => {
    //Clear item
    CombinedList[0].data.splice(0, CombinedList[0].data.length);
    //Repopulate combined list from hash table
    for (let i = 0; i < ArraySize; i++) {
      if (HashTable[i].name !== null) {
        CombinedList[0].data.push(HashTable[i]);
      }
    }
  };

  closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  renderHiddenItem = (data, rowMap) => {
    return (
      <TouchableOpacity
        style={styles.hiddenItem}
        onPress={async () => {
          //Delete from local cache
          this.callDeleteItem(data.item.key);

          //Delete from Firebase
          //section.title is the recipe name, item.name is ingredient name
          //Don't await the promise to ensure UI fluidity
          groceryListDelete(data.section.title, data.item.name);

          this.closeRow(rowMap, data.item.key);
          this.forceUpdate();
        }}
      >
        <MaterialCommunityIcons
          name="trash-can-outline"
          size={27}
          color="white"
        />
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {/* Menu Bar */}
        <MenuBar buttonClick={this.showAddItem} togglemenu={this.toggleMenu} toggleedit={this.toggleEdit} editState={this.state.editMode} />

        {/* Toggle menu for add item */}
        {this.state.showComponent ? (
          <DropMenu
            close={this.hideAddItem}
            name={this.state.name}
            quantity={this.state.quantity}
            handlename={this.handleName}
            handlequantity={this.handleQuantity}
            verifyinfo={this._verifyInfo}
            incomepletefield={this.state.incompleteField}
          />
        ) : null}

        {/* Determine whether to render edit mode, combined list or individual list */}
        {(this.state.editMode) ? (
          // Render Edit Mode
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "height" : "height"}
            style={styles.editView}
          >
            <SectionList
              stickySectionHeadersEnabled={true}
              sections={RecipeList}
              keyExtractor={(item, index) => item + index}
              renderItem={({ item }) => (
                <View>
                  <Item
                    title={item.name}
                    amounts={item.amount}
                    units={item.unit}
                    mark={item.mark}
                    editState={this.state.editMode}
                    itemKey={item.key}
                    handlenameupdate={this.handleNameUpdate}
                    handlequantityupdate={this.handleQuantityUpdate}
                    selectUnitModal={this.showUnitSelectModal}
                    index={item.index}
                    forceRefresh={this.forceUpdate}
                    updateeditarray={this.updateEditArray}
                  />
                </View>
              )}
              renderSectionHeader={({ section: { title } }) => (
                <View style={[styles.combinedHeader, styles.editHeaderColor]}>
                  <Text style={[styles.header]}>{title}</Text>
                </View>
              )}
              ItemSeparatorComponent={ItemSeparator}
            />
          </KeyboardAvoidingView>
        ) :
          (this.state.combine) ? (
            //Render Combined Item Cards
            <SectionList
              stickySectionHeadersEnabled={true}
              sections={CombinedList}
              keyExtractor={(item, index) => item + index}
              renderItem={({ item }) => (
                <TouchableWithoutFeedback
                  onPress={() => {
                    item.mark = item.mark === undefined ? true : !item.mark;
                    this.forceUpdate();
                  }}
                >
                  <View>
                    <Item
                      title={item.name}
                      amounts={item.amount}
                      units={item.unit}
                      mark={item.mark}
                      editState={this.state.editMode}
                      itemKey={item.key}
                      handlenameupdate={this.handleNameUpdate}
                      handlequantityupdate={this.handleQuantityUpdate}
                      selectUnitModal={this.showUnitSelectModal}
                      index={item.index}
                      forceRefresh={this.forceUpdate}
                      updateeditarray={this.updateEditArray}
                    />
                  </View>
                </TouchableWithoutFeedback>
              )}
              renderSectionHeader={({ section: { title } }) => (
                <View style={[styles.combinedHeader, styles.combinedHeaderColor]}>
                  <Text style={[styles.header, styles.text]}>{title}</Text>
                </View>
              )}
              ItemSeparatorComponent={ItemSeparator}
            />
          ) : (
              //Render normal item cards
              <SwipeListView
                useSectionList
                stickySectionHeadersEnabled={true}
                sections={RecipeList}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      item.mark = (item.mark === undefined) ? true : !item.mark;
                      this.forceUpdate();
                    }}
                  >
                    <View>
                      <Item
                        title={item.name}
                        amounts={item.amount}
                        units={item.unit}
                        mark={item.mark}
                        editState={this.state.editMode}
                        itemKey={item.key}
                        handlenameupdate={this.handleNameUpdate}
                        handlequantityupdate={this.handleQuantityUpdate}
                        selectUnitModal={this.showUnitSelectModal}
                        index={item.index}
                        forceRefresh={this.forceUpdate}
                        updateeditarray={this.updateEditArray}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                )}
                renderSectionHeader={({
                  section: { title, portion, portionText },
                }) => (
                    <View style={styles.titleCard}>
                      <Text
                        onPress={async () => {
                          this.callDeleteSection(title);
                          //Delete entire recipe from Firebase
                          await groceryListDelete(title);
                          this.forceUpdate();
                        }}
                        style={styles.header}
                      >
                        {title}
                      </Text>
                      {title === "Added to list" ? null : (
                        <Text
                          onPress={() => {
                            this.sendPortion(portion, title);
                            this.showModal();
                          }}
                          style={[styles.portionText, styles.text]}
                        >
                          <Entypo name="bowl" size={17} color="cornflowerblue" />:{" "}
                          {portionText}
                        </Text>
                      )}
                    </View>
                  )}
                renderHiddenItem={this.renderHiddenItem}
                ItemSeparatorComponent={ItemSeparator}
                disableRightSwipe
                rightOpenValue={-75}
                previewRowKey={"0"}
                previewOpenValue={-40}
                previewOpenDelay={3000}
              />
            )}
        <PortionModal
          ref={"portionModal"}
          MainRefresh={this.forceUpdate}
          rebuildList={this.rebuildCombinedList}
        />
        <UnitSelectModal
          ref={"unitselectmodal"}
          unitUpdate={this.handleUnitUpdate}
        />
        <HashFunctions
          ref={"hashFunctions"}
          rebuildList={this.rebuildCombinedList}
          OldLength={this.oldLength}
        />
      </View>
    );
  }
}
GroceryList.contextType = UserContext;

//StyleSheets
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  //Recipe Names
  header: {
    fontSize: 24,
    color: "#708090",
    flex: 1,
  },
  //Recipe headers
  titleCard: {
    backgroundColor: "#f8f8f8",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderLeftWidth: 6,
    borderLeftColor: "steelblue",
    padding: 10,
  },
  text: {
    fontFamily: "SourceSansPro",
  },
  separator: {
    height: 2,
    backgroundColor: "#E8E8E8",
  },
  hiddenItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "red",
    paddingHorizontal: 10,
  },
  combinedHeader: {
    borderLeftWidth: 6,
    borderTopRightRadius: 5,
    backgroundColor: "#f8f8f8",
    padding: 10,
  },
  portionText: {
    color: "cornflowerblue",
    fontSize: 17,
  },
  combinedHeaderColor: {
    borderLeftColor: "tomato",
  },
  editHeaderColor: {
    borderLeftColor: "rebeccapurple",
  },
  editView: {
    paddingBottom: 65,
  }
});
