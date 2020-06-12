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
import * as scrapedList from "../../data/allRecipesScraped.json" 

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      searchText: "",
      filtered: [],
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
        const itemName = item.title.toLowerCase();
        const textName = text.toLowerCase();
        return itemName.indexOf(textName) !== -1;
      }),
      searchText: text,
    });
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
        {/* <TextInput
          style={[styles.searchBar, styles.text]}
          onChangeText={(text) => this.setState({ searchText: text })}
          onSubmitEditing={(event) => this.filterArray(event.nativeEvent.text)}
          placeholder={"What would you like to eat?"}
          value={this.state.searchText}
        /> */}
        <View style={styles.searchBar}>
          <Ionicons style={styles.icon} name="ios-search" size={18} />
          <TextInput
            style={[styles.input, styles.text]}
            onChangeText={(text) => {
              this.setState({ searchText: text });
              if (text === "") this.setState({ filtered: this.data });
            }}
            onSubmitEditing={(event) =>
              this.filterArray(event.nativeEvent.text)
            }
            placeholder={"What would you like to eat?"}
            value={this.state.searchText}
          />
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={this.state.filtered}
          renderItem={({ item }) => (
            <SearchCard
              data={item}
              image={`${item.recipeImageURL}`}
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
    height: 40,
    paddingLeft: 10,
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
