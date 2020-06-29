import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  ScrollView,
  FlatList,
  useWindowDimensions,
} from "react-native";
import {
  Ionicons,
  Entypo,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Card from "../screen-components/homescreen-list/Card.js";
import FlavorText from "../screen-components/homescreen-list/FlavorText.js";
import HomeScreenRecipe from "../../data/HomeScreenRecipe.js";
import LoadingIndicator from "../generic/LoadingIndicator";

import { functions } from "../../config/Firebase/firebaseConfig";
import LoadingAdditionalContext from "../context/LoadingAdditionalContext.js";

const containerMarginHorizontal = 5;

const ItemSeparator = () => {
  return <View style={styles.separator} />;
};

const HomeScreenList = () => {
  const Window = useWindowDimensions();
  const [loading, setLoading] = useState(true);
  const [homeScreenList, setHomeScreenList] = useState([]);
  const context = useContext(LoadingAdditionalContext);

  //Equivalent to componentDidMount for functional components
  useEffect(() => {
    const fetchClockRecipe = async () => {
      //loading is the flag for the card data
      //context stores flag for loading additional data and the actual additional data
      setLoading(true);
      context.changeLoadingStatus(true);

      //Scrape card data only
      const response = await functions.httpsCallable("allRecipesScraper")({
        type: "breakfast",
      });
      setHomeScreenList(response.data.data);
      setLoading(false);
      //Generate array of recipe URLs to scrape
      const URLarray = [];
      for (let recipe of homeScreenList) {
        URLarray.push(recipe.recipeURL);
      }

      //Scrape additional data
      const fetchAdditionalData = functions.httpsCallable(
        "allRecipesAdditional"
      );
      const responseAdditional = await fetchAdditionalData({
        URLarray: URLarray,
      });

      //Add additional data to context, set loading additional flag to false.
      //Important: changeLoadingStatus must be called after changeAdditionalData, else
      //it will screw up the rendering of Recipe.js
      context.changeAdditionalData(responseAdditional.data.data);
      context.changeLoadingStatus(false);
      //alert("Loaded additional info");
    };

    fetchClockRecipe();
    //alert(Object.entries(homeScreenList))
  }, []);

  return (
    <View style={[styles.container, { width: Window.width - 10 }]}>
      {loading ? (
        <LoadingIndicator size={"large"} />
      ) : (
        <>
          <FlavorText name="James" />
          <FlatList
            showsVerticalScrollIndicator={false}
            data={homeScreenList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <Card
                name={item.name}
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
        </>
      )}
    </View>
  );
};

export default HomeScreenList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
