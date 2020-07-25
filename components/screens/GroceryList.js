import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  SectionList,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";

import DropMenu from "../screen-components/grocery-list/DropMenu.js";
import MenuBar from "../screen-components/grocery-list/MenuBar.js";
import Item from "../screen-components/grocery-list/Item.js";
import PortionModal from "../screen-components/grocery-list/PortionModal.js";
import UnitSelectModal from "../screen-components/grocery-list/UnitSelectModal.js";
import TitleEditModal from "../screen-components/grocery-list/TitleEditModal.js";
import RecipeList from "../../data/RecipeList";
import CombinedList from "../../data/CombinedList.js";
import HashTable from "../../data/HashTable.js";
import AddedToGroceryList from "../../data/AddedToGroceryList.js";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";

import HashFunctions from "../screen-components/grocery-list/HashFunctions.js";

import UserContext from "../context/UserContext";

import {
  groceryListPush,
  groceryListDelete,
  groceryListIngredientUpdate,
  groceryListRecipeUpdate,
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
    };
    this.editedItemsFlag = false;
    this.showAddItem = this.showAddItem.bind(this);
    this.hideAddItem = this.hideAddItem.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleNameUpdate = this.handleNameUpdate.bind(this);
    this.handleQuantityUpdate = this.handleQuantityUpdate.bind(this);
    this.handleUnitUpdate = this.handleUnitUpdate.bind(this);
    this.triggerEditedItemsFlag = this.triggerEditedItemsFlag.bind(this);
    this.toggleEditModeDelete = this.toggleEditModeDelete.bind(this);
    this.handleQuantity = this.handleQuantity.bind(this);
    this.showModal = this.showModal.bind(this);
    this.showUnitSelectModal = this.showUnitSelectModal.bind(this);
    this.showEditTitleModal = this.showEditTitleModal.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
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
  }

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
    if (this.state.editMode === true) {
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
      if (this.editedItemsFlag === true) {
        for (let i = RecipeList.length - 1; i >= 0; i--) {
          for (let j = RecipeList[i].data.length - 1; j >= 0; j--) {
            let ingredient = RecipeList[i].data[j];
            //Delete ingredients with blank name or are marked for deletion
            if (ingredient.name === "" || ingredient.toDelete === true) {
              groceryListDelete(RecipeList[i].title, ingredient.originalName);
              RecipeList[i].data.splice(j, 1);
              continue;
            }

            if (ingredient.edited === true) {
              groceryListIngredientUpdate(
                RecipeList[i].title,
                ingredient.originalName,
                ingredient.name,
                {
                  name: ingredient.name,
                  amount: ingredient.amount,
                  unit: ingredient.unit,
                }
              );
              ingredient.originalName = ingredient.name;
            }
          }

          //Remove empty recipes
          if (RecipeList[i].data.length === 0) {
            delete AddedToGroceryList[RecipeList[i].url];
            groceryListDelete(RecipeList[i].title);
            RecipeList.splice(i, 1);
          }
        }
        //Redo combine function, regenerate all keys
        this.callClearHashTable();
        this.callCombineFunction(RecipeList.length);
        this.callBulkGenerate(0);
        this.oldLength = RecipeList.length;
        //Reset EditList
        this.editedItemsFlag = false;
        verifyFlag = false;
      }
    } else {
      let indexCount = 0;
      for (let item of RecipeList) {
        let addItemObject = { name: "Add Item...", index: indexCount };
        item.data.push(addItemObject);
        indexCount++;
      }
    }
  }

  forceUpdate() {
    this.setState({ refresh: !this.state.refresh });
  }

  //Handle States for Adding of Custom Recipe
  handleName = (text) => {
    this.setState({ name: text });
  };
  handleQuantity = (text) => {
    this.setState({ quantity: text });
  };

  //Functions for portion modal
  showModal = () => {
    this.refs.portionModal.renderModal();
  };
  sendPortion = (portion, title) => {
    this.refs.portionModal.receivePortion(portion, title);
  };

  //Function to call unit selection modal
  showUnitSelectModal = (item) => {
    this.refs.unitselectmodal.renderModal(item);
  };

  //Function to call modal on long press of Recipe Titles
  showEditTitleModal = (title) => {
    this.refs.titleeditmodal.renderModal(title);
  };
  //Handle Editing of Recipe Title
  handleChangeTitle = (newTitle, originalTitle) => {
    for (let recipe of RecipeList) {
      if (recipe.title === originalTitle) {
        //Update RecipeList title
        recipe.title = newTitle;
        groceryListRecipeUpdate(originalTitle, newTitle, null, null, recipe)
        break;
      }
    }
    this.forceUpdate();
  };
  sectionDelete = async (title) => {
    this.callDeleteSection(title);
    //Delete entire recipe from Firebase
    await groceryListDelete(title);
    this.forceUpdate();
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
  };

  //Handle Updating of variables in edit mode
  handleNameUpdate = (item, text) => {
    item.name = text.trim();
    this.triggerEditedItemsFlag();
  };
  handleQuantityUpdate = (item, text) => {
    item.amount = Number(text);
    this.triggerEditedItemsFlag();
  };
  handleUnitUpdate = (item, unit) => {
    if (unit === "No Units") {
      unit = "";
    }
    item.unit = unit;
    item.unitDetails.unit = unit;
    this.triggerEditedItemsFlag();
    this.forceUpdate();
  };
  toggleEditModeDelete = (item) => {
    item.toDelete = !item.toDelete;
    this.triggerEditedItemsFlag();
  };

  triggerEditedItemsFlag = () => {
    if (this.editedItemsFlag === false) {
      this.editedItemsFlag = true;
    }
  };

  //Check if entered is valid
  _verifyInfo = (name, quantity) => {
    if (name) {
      verifyFlag = true;
      name = name.trim();
      let newRecipe = { title: name, data: [], portion: 1, portionText: "1" };
      //Creating the empty slots to input ingredient info
      let count = Number(quantity);
      for (let i = 0; i < count; i++) {
        let defaultIngredientObject = {
          name: "",
          originalName: "",
          amount: "",
          unit: "",
          unitDetails: { unit: "", class: 0 },
          edited: true,
        };
        newRecipe.data.push(defaultIngredientObject);
      }
      //Push into recipe list
      RecipeList.unshift(newRecipe);
      this.callBulkGenerate(0);
      this.triggerEditedItemsFlag();
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
        <MenuBar
          buttonClick={this.showAddItem}
          togglemenu={this.toggleMenu}
          toggleedit={this.toggleEdit}
          editState={this.state.editMode}
        />

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
        {this.state.editMode ? (
          // Render Edit Mode
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
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
                    item={item}
                    editState={this.state.editMode}
                    itemKey={item.key}
                    handlenameupdate={this.handleNameUpdate}
                    handlequantityupdate={this.handleQuantityUpdate}
                    showunitselectmodal={this.showUnitSelectModal}
                    index={item.index}
                    forceRefresh={this.forceUpdate}
                    triggerediteditemsflag={this.triggerEditedItemsFlag}
                    editmodedelete={this.toggleEditModeDelete}
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
        ) : this.state.combine ? (
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
                    showunitselectmodal={this.showUnitSelectModal}
                    index={item.index}
                    forceRefresh={this.forceUpdate}
                    triggerediteditemsflag={this.triggerEditedItemsFlag}
                    editmodedelete={this.toggleEditModeDelete}
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
                    showunitselectmodal={this.showUnitSelectModal}
                    index={item.index}
                    forceRefresh={this.forceUpdate}
                    triggerediteditemsflag={this.triggerEditedItemsFlag}
                    editmodedelete={this.toggleEditModeDelete}
                  />
                </View>
              </TouchableWithoutFeedback>
            )}
            renderSectionHeader={({
              section: { title, portion, portionText },
            }) => (
              <View style={styles.titleCard}>
                <Text
                  onPress={() => {
                    alert("Navigate to Recipe Page");
                  }}
                  onLongPress={() => {
                    this.showEditTitleModal(title);
                  }}
                  style={[styles.header, styles.text]}
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
        <TitleEditModal
          ref={"titleeditmodal"}
          saveChangeTitle={this.handleChangeTitle}
          titleDelete={this.sectionDelete}
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
    backgroundColor: "#F9F9F9",
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
    flex: 1,
  },
});
