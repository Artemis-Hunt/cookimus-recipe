import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { Rating } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const roundedRadius = 10;

const SearchCard = (props) => {
  const Window = useWindowDimensions();
  const navigation = useNavigation();
  const scaledSize = sizeScaler(15, Window);
  const scaledHeight = Window.height / 7.5;

  return (
    <View style={{ height: props.height }}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          navigation.navigate("Recipe", {
            ...props,
          });
        }}
        style={styles.card}
      >
        <Image
          style={[styles.image, { width: props.height - 20 }]}
          source={{ uri: `${props.image}` }}
        />
        <View style={styles.descriptionBox}>
          <Text
            style={[styles.title, styles.text, { fontSize: scaledSize }]}
            numberOfLines={3}
          >
            {props.name}
          </Text>
          <Text style={[styles.site, styles.text]}>AllRecipes.com</Text>
          <View style={styles.extraDetailsBox}>
            <Rating
              imageSize={scaledSize - 5}
              readonly={true}
              startingValue={props.rating}
            />
            <Text style={[styles.text, styles.rating]}>({props.review})</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SearchCard;

const sizeScaler = (baseSize, Window) => {
  const ratio = Window.height / 800;
  const scaledSize = Math.round(ratio * baseSize);
  return scaledSize;
};

const styles = StyleSheet.create({
  //Card container
  card: {
    borderRadius: roundedRadius,
    backgroundColor: "white",
    flex: 1,
    flexDirection: "row",
    marginVertical: 5,
    marginHorizontal: 5,

    //Android shadow
    elevation: 5,
    //iOS Shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  //Image
  image: {
    borderTopLeftRadius: roundedRadius,
    borderBottomLeftRadius: roundedRadius,
  },

  //Text
  descriptionBox: {
    flex: 1,
    justifyContent: "space-between",
    margin: 8,
  },
  extraDetailsBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "SourceSansPro",
    textAlign: "center",
  },
  title: {},
  site: {
    color: "grey",
    fontSize: 13,
    fontStyle: "italic",
    marginVertical: 10,
  },
  rating: {
    color: "grey",
    fontSize: 11,
    fontStyle: "italic",
    flex: 0,
    marginHorizontal: 5,
  },
});
