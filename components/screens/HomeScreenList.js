import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  ScrollView,
  FlatList,
  useWindowDimensions,
  Dimensions,
} from "react-native";
import {
  Ionicons,
  AntDesign
} from "@expo/vector-icons";
import Card from "../screen-components/homescreen-list/Card.js";
import FlavorText from "../screen-components/homescreen-list/FlavorText.js";
import LoadingIndicator from "../generic/LoadingIndicator";

import {
  functions,
  getUserDataRef,
} from "../../config/Firebase/firebaseConfig";
import LoadingAdditionalContext from "../context/LoadingAdditionalContext.js";
import AlgoliaRecipesIndex from "../../config/Algolia/algoliaConfig";

const containerMarginHorizontal = 5;
const Window = Dimensions.get("window");

const ItemSeparator = () => {
  return <View style={styles.separator} />;
};

class HomeScreenList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      cardData: [],
      timeSegment: "",

      //sliderIndex: 0,
      //maxSlider: 20,
    };
    this.user = "";
    this.timeoutID;
    //this.scrollToIndex = this.scrollToIndex.bind(this);
  }

  //Fetch time-appropriate recipes
  componentDidMount() {
    this.getTime();
    this.fetchClockRecipe();

    // //FUNCTIONS FOR SCROLLING
    // setInterval(function() {
    //   const { sliderIndex, maxSlider } = this.state
    //   let nextIndex = 0
 
    //   if (sliderIndex < maxSlider) {
    //     nextIndex = sliderIndex + 1
    //   }
 
    //   this.scrollToIndex(nextIndex, true)
    //   this.setState({sliderIndex: nextIndex})
    // }.bind(this), 10000)
    // //FUNCTIONS FOR SCROLLING
  }
  // //FUNCTIONS FOR SCROLLING
  // //Scroll flatlist
  // scrollToIndex(index, animated) {
  //   this.refs.timeList && this.refs.timeList.scrollToIndex({ index, animated })
  // }
  // // //FUNCTIONS FOR SCROLLING

  //Clean up timeouts to prevent memory leak
  componentWillUnmount() {
    clearTimeout(this.timeoutID)
  }

  //Gets the current time and sets the appropriate time segment
  //Also sets a timeout to update the time segment automatically
  getTime() {
    let time = new Date()
    let hours = time.getHours();
    let minutes = time.getMinutes();
    if (hours <= 4) {
      this.setState({ timeSegment: "evening" });
      this.timeoutID = setTimeout(() => { this.getTime() }, this.calculateInterval(hours, minutes, 5))
    } else if (hours >= 5 && hours <= 10) {
      this.setState({ timeSegment: "morning" });
      this.timeoutID = setTimeout(() => { this.getTime() }, this.calculateInterval(hours, minutes, 11))
    } else if (hours >= 11 && hours <= 13) {
      this.setState({ timeSegment: "noon" });
      this.timeoutID = setTimeout(() => { this.getTime() }, this.calculateInterval(hours, minutes, 14))
    } else if (hours >= 14 && hours <= 16) {
      this.setState({ timeSegment: "afternoon" });
      this.timeoutID = setTimeout(() => { this.getTime() }, this.calculateInterval(hours, minutes, 17))
    } else if (hours >= 17) {
      this.setState({ timeSegment: "evening" });
      this.timeoutID = setTimeout(() => { this.getTime() }, this.calculateInterval(hours, minutes, 29))
    }
  }

  //calculates the interval, in milliseconds, before the app should change the time segment
  calculateInterval(hours, minutes, changeTime) {
    return ((changeTime - hours) * 60 - minutes) * 60 * 1000;
  }

  async fetchClockRecipe() {
    this.user = (await getUserDataRef().get()).data().firstName;
    if (this.user === "Guest") {
      this.user = "";
    }
    //this.state.loading is the flag for the card data
    //context stores flag for loading additional data and the actual additional data
    // this.setState({ loading: true });
    // this.context.changeLoadingStatus(true);

    // let queryResponse = await AlgoliaRecipesIndex.search(text, {
    //   hitsPerPage: 1000,
    // });
    // const response = await fetchCardData({ type: this.state.timeSegment });
    // this.setState({
    //   loading: false,
    //   cardData: queryResponse.hits,
    // });

    // let additionalData = [];

    // for (let item of this.state.cardData) {
    //   additionalData.push({
    //     ingredient: item.ingredient,
    //     originalIngredient: item.originalIngredient,
    //     additionalInfo: item.additionalInfo,
    //     prepInstructions: item.prepInstructions,
    //   });
    // }

    //Add additional data to context, set loading additional flag to false.
    //Important: changeLoadingStatus must be called after changeAdditionalData, else
    //it will screw up the rendering of Recipe.js
    // this.context.changeAdditionalData(additionalData);
    // this.context.changeLoadingStatus(false);
  }

  render() {
    return (
      <View style={[styles.container, { width: Window.width - 10 }]}>
        {this.state.loading ? (
          <View style={styles.loadingView}>
            <LoadingIndicator size={"large"} />
          </View>
        ) : (
            <>
              <View style={{ marginBottom: 5, }}>
                <FlavorText name={this.user} time={this.state.timeSegment} />
              </View>
              <View style={{ marginBottom: 10, }}>
                <View style={styles.subHeadingBar}>
                  <Text style={styles.subHeadingText}>Based On The Time </Text>
                  <Ionicons name="md-time" size={24} color="#778899" />
                </View>
                <FlatList
                  //ref={"timeList"}
                  showsHorizontalScrollIndicator={false}
                  data={this.state.cardData}
                  horizontal={true}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => (
                    <Card
                      name={item.name}
                      url={item.recipeURL}
                      image={item.recipeImageURL}
                      index={index}
                      Window={Window}
                    />
                  )}
                  // renderSectionHeader={({ section }) => (
                  //   <Text style={styles.heading}>{section.heading}</Text>
                  // )}
                  ItemSeparatorComponent={ItemSeparator}
                />
              </View>
              <View style={{ marginBottom: 5, }}>
                <View style={styles.subHeadingBar}>
                  <Text style={styles.subHeadingText}>Recommended For You </Text>
                  <AntDesign name="star" size={24} color="gold" />
                </View>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  data={this.state.cardData}
                  horizontal={true}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => (
                    <Card
                      name={item.name}
                      url={item.recipeURL}
                      image={item.recipeImageURL}
                      index={index}
                      Window={Window}
                    />
                  )}
                  // renderSectionHeader={({ section }) => (
                  //   <Text style={styles.heading}>{section.heading}</Text>
                  // )}
                  ItemSeparatorComponent={ItemSeparator}
                />
              </View>
            </>
          )}
      </View>
    );
  }
}
HomeScreenList.contextType = LoadingAdditionalContext;

export default HomeScreenList;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    marginHorizontal: 15,
  },
  heading: {
    fontFamily: "SourceSansPro-SemiBold",
    fontSize: 25,
    letterSpacing: 0,
    marginVertical: 5,
  },
  separator: {
    height: 15,
  },
  loadingView: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    marginHorizontal: 15,
    marginTop: (Window.height / 2) - 30,
  },
  subHeadingBar: {
    paddingBottom: 5,
    flexDirection: "row"
  },
  subHeadingText: {
    fontSize: 22,
    color: "dimgray"
  }
});
