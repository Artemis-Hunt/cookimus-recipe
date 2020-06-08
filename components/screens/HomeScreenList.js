import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  ScrollView,
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
import FlavorText from "../screen-components/homescreen-list/FlavorText.js"
import HomeScreenRecipe from "../../data/HomeScreenRecipe.js"

const containerMarginHorizontal = 5;

const ItemSeparator = () => {
  return (
    <View style={styles.separator} />
  )
}

const HomeScreenList = () => {
  const Window = useWindowDimensions();
  return (
    <View style={[styles.container, { width: Window.width - 10}]}>
      <SectionList
        ListHeaderComponent={()=> <FlavorText name="James"/>}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
        sections={HomeScreenRecipe}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Card name={item.name} image={item.image} Window={Window} />}
        renderSectionHeader={({ section }) => (
        <Text style={styles.heading}>{section.heading}</Text>
        )}
        ItemSeparatorComponent={ItemSeparator}
      />
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
