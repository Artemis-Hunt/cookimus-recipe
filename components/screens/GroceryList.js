import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  SectionList,
  View,
  TouchableOpacity,
  TextInput,
  TouchableHighlight,
} from "react-native";

import DropMenu from "../screen-components/grocery-list/DropMenu.js";
import MenuBar from "../screen-components/grocery-list/MenuBar.js";
import Item from "../screen-components/grocery-list/Item.js";
import PortionModal from "../screen-components/grocery-list/PortionModal.js";
import RecipeList from "../../data/RecipeList";
import CombinedList from "../../data/CombinedList.js";
import HashTable from "../../data/HashTable.js";
import scrapedList from "../../data/allRecipesScraped.json";
import Animated, { diff } from "react-native-reanimated";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";

import { SwipeListView } from "react-native-swipe-list-view";

import HashFunctions from "../screen-components/grocery-list/HashFunctions.js";

import UserContext from "../context/UserContext";

import {
  groceryListPush,
  groceryListDelete,
  firestoreDb,
  getUserDataRef,
  fetchGroceryList,
} from "../../config/Firebase/firebaseConfig";

//Size of hash table
const ArraySize = 100;

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
      groceryList: [],
    };
    this.showAddItem = this.showAddItem.bind(this);
    this.hideAddItem = this.hideAddItem.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleQuantity = this.handleQuantity.bind(this);
    this.handleUnits = this.handleUnits.bind(this);
    this.showModal = this.showModal.bind(this);
    this.sendPortion = this.sendPortion.bind(this);
    this.forceUpdate = this.forceUpdate.bind(this);
    this.rebuildCombinedList = this.rebuildCombinedList.bind(this);
    this.callCombineFunction = this.callCombineFunction.bind(this);
    this.callBulkGenerate = this.callBulkGenerate.bind(this);
    this.callgenerateKey = this.callgenerateKey.bind(this);
    this.callhandleSingleItem = this.callhandleSingleItem.bind(this);
    this.callDeleteItem = this.callDeleteItem.bind(this);
    this.callDeleteSection = this.callDeleteSection.bind(this);
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
      this.callCombineFunction(index);
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

  forceUpdate() {
    this.setState({ refresh: !this.state.refresh });
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

  //Functions for modal
  showModal = () => {
    this.refs.portionModal.renderModal();
  };
  sendPortion = (portion, title) => {
    this.refs.portionModal.receivePortion(portion, title);
  };

  //Functions to call hashFunctions
  callCombineFunction = (index) => {
    this.refs.hashFunctions.combineFunction(index);
  };
  callBulkGenerate = (startIndex) => {
    this.refs.hashFunctions.bulkGenerateKey(startIndex);
  };
  callgenerateKey = (recipeIndex, itemIndex) => {
    this.refs.hashFunctions.generateKey(recipeIndex, itemIndex);
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

  //Check if entered is valid
  _verifyInfo = (name, quantity, units) => {
    if (name && quantity) {
      //Index of last item
      let RecipeIndex = RecipeList.length - 1;

      //If added to list section doesn't exist, create it
      if(RecipeList[RecipeIndex].title !== "Added to list") {
        RecipeList.push({ title: "Added to list"})
        RecipeIndex++;
      }
      //itemIndex
      let itemIndex = RecipeList[RecipeIndex].data.length;

      RecipeList[RecipeIndex].data.push({name: name, amount: quantity, unit: units});
      RecipeList[RecipeIndex].data[itemIndex].key = this.callgenerateKey(
        RecipeIndex,
        itemIndex
      );

      this.callhandleSingleItem(newObject.name, itemIndex);

      //Clear fields
      this.setState({ name: "", quantity: "", units: "", incompleteField: "" });
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
        onPress={() => {
          this.callDeleteItem(data.item.key);
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
        <MenuBar buttonClick={this.showAddItem} togglemenu={this.toggleMenu} />

        {/* Toggle menu for add item */}
        {this.state.showComponent ? (
          <DropMenu
            close={this.hideAddItem}
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
              <TouchableOpacity
                onPress={() => {
                  item.mark = item.mark === undefined ? true : !item.mark;
                  this.forceUpdate();
                }}
              >
                <Item
                  title={item.name}
                  amounts={item.amount}
                  units={item.unit}
                  mark={item.mark}
                />
              </TouchableOpacity>
            )}
            renderSectionHeader={({ section: { title } }) => (
              <View style={styles.combineBorder}>
                <Text style={[styles.header, styles.text]}>{title}</Text>
              </View>
            )}
            ItemSeparatorComponent={ItemSeparator}
          />
        ) : (
          <SwipeListView
            useSectionList
            stickySectionHeadersEnabled={true}
            sections={RecipeList}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  item.mark = item.mark === undefined ? true : !item.mark;
                  this.forceUpdate();
                }}
              >
                <Item
                  title={item.name}
                  amounts={item.amount}
                  // units={item.unit}
                  units={item.unit}
                  mark={item.mark}
                />
              </TouchableOpacity>
            )}
            renderSectionHeader={({
              section: { title, portion, portionText },
            }) => (
              <View style={[styles.titleCard, styles.cardBorder]}>
                <TouchableOpacity
                  style={{ flex: 10 }}
                  onPress={() => {
                    this.callDeleteSection(title);
                    this.forceUpdate();
                  }}
                >
                  <Text style={styles.header}>{title}</Text>
                </TouchableOpacity>
                {title === "Added to list" ? null : (
                  <TouchableOpacity
                    style={{ flex: 1, alignItems: "flex-end" }}
                    onPress={() => {
                      this.sendPortion(portion, title);
                      this.showModal();
                    }}
                  >
                    <Text style={[styles.portionText, styles.text]}>
                      <Entypo name="bowl" size={17} color="cornflowerblue" />:{" "}
                      {portionText}
                    </Text>
                  </TouchableOpacity>
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
    margin: 10,
    fontSize: 24,
    color: "#708090",
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
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#f8f8f8",
    alignItems: "center",
    marginRight: 10,
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
    alignItems: "flex-end",
    paddingHorizontal: 25,
    paddingTop: 7,
    backgroundColor: "red",
  },
  cardBorder: {
    borderLeftWidth: 6,
    borderLeftColor: "steelblue",
    borderTopRightRadius: 5,
  },
  combineBorder: {
    borderLeftWidth: 6,
    borderLeftColor: "tomato",
    borderTopRightRadius: 5,
    backgroundColor: "#f8f8f8",
  },
  portionText: {
    color: "cornflowerblue",
    fontSize: 17,
  },
});
