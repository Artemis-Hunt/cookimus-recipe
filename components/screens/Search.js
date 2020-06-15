import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SearchCard from "../screen-components/search/SearchCard.js";
import * as scrapedList from "../../data/allRecipesScraped.json";
import {
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

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

  fetchData() {
    this.setState({ loading: false, filtered: scrapedList.data });
    this.data = scrapedList.data;
  }

  filterArray(text) {
    this.setState({
      filtered: this.data.filter((item) => {
        const itemName = item.name.toLowerCase();
        const textName = text.toLowerCase();
        return itemName.indexOf(textName) !== -1;
      }),
    });
  }

  clearSearch() {
    this.setState({ filtered: this.data, searchText: "" });
  }

  render() {
    if (this.state.loading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={styles.container}>
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
        <FlatList
          showsVerticalScrollIndicator={false}
          data={this.state.filtered}
          renderItem={({ item }) => (
            <SearchCard
              name={item.name}
              image={item.recipeImageURL}
              rating={4.3}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
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
