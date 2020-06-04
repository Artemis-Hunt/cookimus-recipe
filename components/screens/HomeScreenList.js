import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import Card from "../screen-components/homescreen-list/Card.js";
import FlavorText from "../screen-components/homescreen-list/FlavorText.js"

const containerMarginHorizontal = 5;

const DATA = [
  {
    heading: "Breakfast ideas",
    data: [
      {
        name: "American Breakfast",
        image:
          "https://sethlui.com/wp-content/uploads/2016/04/chengs-9747-1280x720.jpg",
      },
      {
        name: "Ground Beef Tacos, Mexican-style",
        image:
          "https://www.cookingclassy.com/wp-content/uploads/2019/03/ground-beef-tacos-01.jpg",
      },
    ],
  },
  {
    heading: "Recommended for you",
    data: [
      {
        name: "Spaghetti",
        image:
          "https://www.inspiredtaste.net/wp-content/uploads/2019/03/Spaghetti-with-Meat-Sauce-Recipe-1-1200.jpg",
      },
    ],
  },
  {
    heading: "Recommended for you",
    data: [
      {
        name: "Spaghetti",
        image:
          "https://www.inspiredtaste.net/wp-content/uploads/2019/03/Spaghetti-with-Meat-Sauce-Recipe-1-1200.jpg",
      },
    ],
  },
];

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
        showsVerticalScrollIndicator={false}
        sections={DATA}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Card {...item} Window={Window} />}
        renderSectionHeader={({ section: { heading } }) => (
          <Text style={styles.heading}>{heading}</Text>
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
