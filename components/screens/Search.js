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

//Temp JSON files
import scrapedList from "../../data/allRecipesScraped.json";
import scrapedListAdditional from "../../data/allRecipesAdditional.json";
const combinedData = [];

import { firestoreDb, functions } from "../../config/Firebase/firebaseConfig";

import SearchList from "../screen-components/search/SearchList";

export const LoadingAdditionalContext = React.createContext(true);

export default class Search extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      loadingAdditional: false,
      cardData: [],
      searchText: "",
    };
    this.additionalData = [];
  }

  async fetchSearch(text) {
    this.setState({ loading: true, loadingAdditional: true });

    //Replace spaces with %20, for insertion into search URL
    text = text.replace(/\s+/g, "%20");

    //Scrape card data only
    const keywordSearch = functions.httpsCallable("allRecipesScraper");
    const response = await keywordSearch({ type: "search", keyword: text });
    this.setState({
      loading: false,
      cardData: response.data.cardData.data,
    });

    //Generate array of recipe URLs to scrape
    const URLarray = [];
    for (let recipe of this.state.cardData) {
      URLarray.push(recipe.recipeURL);
    }

    //Scrape additional data
    const fetchAdditionalData = functions.httpsCallable("allRecipesAdditional");
    const responseAdditional = await fetchAdditionalData({ URLarray: URLarray });
    this.additionalData = responseAdditional.data.data;
    this.setState({ loadingAdditional: false });
    alert(this.additionalData[0].recipeURL)
  }

  clearSearch() {
    this.setState({ searchText: "" });
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
              //If not empty string, call search
              //Else, clear search data
              if (text.replace(/\s+/g, "") !== "") {
                this.fetchSearch(text);
              } else {
                this.setState({ cardData: [] });
                this.additionalData = [];
              }
            }}
            placeholder={"What would you like to eat?"}
            value={this.state.searchText}
          />

          {this.state.searchText === "" ? null : (
            <TouchableWithoutFeedback
              onPress={() => {
                this.clearSearch();
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
          <View style={styles.center}>
            <ActivityIndicator />
          </View>
        ) : this.state.cardData.length === 0 ? (
          <View style={styles.center}>
            <Text style={styles.searchHint}>
              Search by recipe or ingredient name
            </Text>
          </View>
        ) : (
          <LoadingAdditionalContext.Provider
            value={this.state.loadingAdditional}
          >
            <SearchList
              data={this.state.cardData}
              additionalData={this.additionalData}
              height={150}
            />
          </LoadingAdditionalContext.Provider>
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
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    borderColor: "#778899",
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
  searchHint: {
    color: "#777777",
    fontSize: 22,
  },
});
