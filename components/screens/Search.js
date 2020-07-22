import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import LoadingIndicator from "../generic/LoadingIndicator"

import { firestoreDb, functions } from "../../config/Firebase/firebaseConfig";

import SearchList from "../screen-components/search/SearchList";
import LoadingAdditionalContext from "../context/LoadingAdditionalContext";

export default class Search extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      cardData: [],
      searchText: "",
    };
    this.additionalData = [];
  }

  async fetchSearch(text) {
    //this.state.loading is the flag for the card data
    //context stores flag for loading additional data and the actual additional data
    this.setState({ loading: true });
    this.context.changeLoadingStatus(true);

    //Replace spaces with %20, for insertion into search URL string
    text = text.replace(/\s+/g, "%20");

    //Scrape card data only
    const keywordSearch = functions.httpsCallable("allRecipesScraper");
    const response = await keywordSearch({ type: "search", keyword: text });
    this.setState({
      loading: false,
      cardData: response.data.data,
    });

    //Generate array of recipe URLs to scrape
    const URLarray = [];
    for (let recipe of this.state.cardData) {
      URLarray.push(recipe.recipeURL);
    }

    //Scrape additional data
    const fetchAdditionalData = functions.httpsCallable("allRecipesAdditional");
    const responseAdditional = await fetchAdditionalData({
      URLarray: URLarray,
    });

    //Add additional data to context, set loading additional flag to false.
    //Important: changeLoadingStatus must be called after changeAdditionalData, else 
    //it will screw up the rendering of Recipe.js
    this.context.changeAdditionalData(responseAdditional.data.data);
    this.context.changeLoadingStatus(false);
    //alert("Loaded additional info");
  }

  clearSearch() {
    this.setState({ cardData: [], searchText: "" });
    this.context.changeAdditionalData([]);
  }

  render() {
    return (
      <View style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Ionicons style={styles.icon} name="ios-search" size={18} color={"rgba(0,0,0,0.6)"}/>
          <TextInput
            style={[styles.input, styles.text]}
            onChangeText={(text) => {
              this.setState({ searchText: text });
            }}
            onSubmitEditing={({ nativeEvent: { text } }) => {
              //If not empty string, call search
              //Else, clear search data
              if (text.replace(/\s+/g, "") !== "") {
                this.fetchSearch(text);
              } else {
                this.clearSearch();
              }
            }}
            placeholder={"What would you like to eat?"}
            value={this.state.searchText}
          />

          {this.state.searchText === "" ? null : (
            <TouchableWithoutFeedback
              onPress={() => {
                this.clearSearch();
                //alert(this.additionalData);
              }}
            >
              <Ionicons
                style={styles.icon}
                name="ios-close"
                size={22}
                color="rgba(0,0,0,0.5)"
              />
            </TouchableWithoutFeedback>
          )}
        </View>

        {/* List view for search 
        If fetching card data from Firebase, show loading indicator.
        If searched empty string or on initial startup, display search hints*/}
        {this.state.loading ? (
          <LoadingIndicator />
        ) : this.state.cardData.length === 0 ? (
          <View style={styles.center}>
            <Text style={[styles.text, styles.searchHint]}>
              Search by recipe or ingredient name
            </Text>
          </View>
        ) : (
          <SearchList data={this.state.cardData} height={150} />
        )}
      </View>
    );
  }
}
Search.contextType = LoadingAdditionalContext;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {},
  input: {
    flex: 1,
    fontSize: 18,
    paddingHorizontal: 8,
  },
  text: {
    fontFamily: "SourceSansPro",
  },
  searchBar: {
    //size, color
    backgroundColor: "white",
    borderColor: "#BBBBBB",
    borderRadius: 25,
    borderWidth: 1,
    height: 45,
    //flex
    flexDirection: "row",
    alignItems: "center",
    //box
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  searchHint: {
    color: "#888888",
    fontSize: 22,
  },
});
