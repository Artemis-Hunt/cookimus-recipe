import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  SectionList,
  View,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from "react-native";
import Constants from "expo-constants";

import DropMenu from "../screen-components/grocery-list/DropMenu.js";
import MenuBar from "../screen-components/grocery-list/MenuBar.js";
import Item from "../screen-components/grocery-list/Item.js";
import RecipeList from "../../data/RecipeList.js";

const ItemSeparator = () => {
  return <View style={styles.separator} />;
};

export default class GroceryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false,
      name: "",
      quantity: "",
      units: "",
      incompleteField: "",
      refresh: false,
      combinedList: false
    };
    this._handleButtonClick = this._handleButtonClick.bind(this);
    this._handleCloseClick = this._handleCloseClick.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleQuantity = this.handleQuantity.bind(this);
    this.handleUnits = this.handleUnits.bind(this);
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
      combinedList: !this.state.combinedList
    })
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

  //DELETE FUNCTION FOR LIST (Possibly use filter method)
  deleteItem = (id) => {
    alert(id);
    for (let i = 0; i < RecipeList.length; i++) {
      for (let j = 0; j < RecipeList[i].data.length; j++) {
        if (id === RecipeList[i].data[j].key) {
          RecipeList[i].data.splice(j, 1);
        }
      }
    }
  };

  //Check if entered is valid
  _verifyInfo = (name, quantity, units) => {
    if (name && quantity) {
      let newObject = { name: "", amount: "", unit: "" };

      newObject.name = this.state.name;
      newObject.amount = this.state.quantity;
      newObject.unit = this.state.units;

      RecipeList[RecipeList.length - 1].data.push(newObject);

      //Set key value for the new added item
      newObject.key = this.state.name + (RecipeList.length - 1) + (RecipeList[RecipeList.length - 1].data.length - 1);
      alert(newObject.key);

      //Clear fields
      this.setState({ name: "", quantity: "", units: "", incompleteField: "" });

    } else this.setState({ incompleteField: "Please fill in all fields" });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleCard}>
          <ImageBackground
            source={{
              uri:
                "https://www.healthline.com/hlcmsresource/images/AN_images/fruits-and-vegetables-thumb.jpg",
            }}
            style={styles.image}
          >
            <Text style={[styles.title, styles.text]}>Grocery List</Text>
          </ImageBackground>
        </View>

        {/* Menu Bar */}
        <MenuBar buttonClick={this._handleButtonClick} togglemenu={this.toggleMenu} />

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
        {this.state.combinedList ? null :
          <SectionList
            stickySectionHeadersEnabled={true}
            sections={RecipeList}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  this.deleteItem(item.key)
                  this.setState({
                    refresh: !this.state.refresh
                  })
                }}
              >
                <Item title={item.name} amounts={item.amount} units={item.unit} />
              </TouchableOpacity>
            )}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={[styles.header, styles.text]}>{title}</Text>
            )}
            ItemSeparatorComponent={ItemSeparator}
          />
        }
      </View>
    );
  }
}

//StyleSheets
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    paddingTop: 80,
    width: null,
    height: 85,
  },
  //Recipe Names
  header: {
    padding: 10,
    fontSize: 32,
    backgroundColor: "#fff",
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
    backgroundColor: "#CCCCCC",
  },
});
