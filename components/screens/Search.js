import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SearchCard from "../screen-components/search/SearchCard.js";

//Temp JSON files
import scrapedList from "../../data/allRecipesScraped.json";
import scrapedListAdditional from "../../data/allRecipesAdditional.json";
const combinedData = [];

import { firestoreDb } from "../../config/Firebase/firebaseConfig";

import SearchList from "../screen-components/search/SearchList";

export default class Search extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      filtered: [],
      searchText: "",
    };
    this.data = [];
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    for (let object of scrapedList.data) {
      let tempObject = object;
      tempObject.additionalInfo =
        scrapedListAdditional.data[object.id].additionalInfo;
      tempObject.prepInstructions =
        scrapedListAdditional.data[object.id].prepInstructions;
      combinedData.push(tempObject);
    }
    this.setState({ loading: false, filtered: combinedData });
    this.data = combinedData;

    //For testing
    // for(let i = 0; i < 3 ; i++) {
    //   firestoreDb.collection("AllRecipes").doc(`${scrapedList.data[i].name}`).set(scrapedList.data[i])
    // }
  };

  //Search the array with the specified term
  filterArray(text) {
    this.setState({ loading: true });
    this.setState({
      filtered: this.data.filter((item) => {
        const itemName = item.name.toLowerCase();
        const textName = text.toLowerCase();
        return itemName.indexOf(textName) !== -1;
      }),
      loading: false,
    });
    if (this.state.filtered.isEmpty) {
    }
  }

  clearSearch() {
    this.setState({ filtered: this.data, searchText: "" });
  }

  render() {
    return (
      <View style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Ionicons style={styles.icon} name="ios-search" size={18} />
          <TextInput
            style={[styles.input, styles.text]}
            onChangeText={(text) => {
              this.setState({ searchText: text });
              if (text === "") this.clearSearch();
            }}
            onSubmitEditing={({ nativeEvent: { text } }) => {
              if (text !== "") {
                this.filterArray(text);
              }
            }}
            placeholder={"What would you like to eat?"}
            value={this.state.searchText}
          />

          {this.state.searchText === "" ? null : (
            <TouchableWithoutFeedback onPress={() => this.clearSearch()}>
              <Ionicons
                style={styles.icon}
                name="ios-close"
                size={22}
                color="rgba(0,0,0,0.5)"
              />
            </TouchableWithoutFeedback>
          )}
        </View>

        {/* List view for search */}
        {this.state.loading ? (
          <View>
            <ActivityIndicator />
          </View>
        ) : (
          <SearchList data={this.state.filtered} height={150} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  icon: {},
  input: {
    flex: 1,
    fontSize: 18,
    height: 50,
    paddingHorizontal: 8,
  },
  text: {
    fontFamily: "SourceSansPro",
  },
  searchBar: {
    //size, color
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 1,
    height: 40,
    //flex
    flexDirection: "row",
    alignItems: "center",
    //box
    marginVertical: 5,
    paddingHorizontal: 10,
  },
});
