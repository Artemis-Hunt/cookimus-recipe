import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const roundedRadius = 10;

const SavedCard = (props) => {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          navigation.navigate("Recipe", {
            ...props,
          });
        }}
        style={styles.card}
      >
        <Image style={styles.image} source={{ uri: `${props.image}` }} />
        <Text>{props.name}</Text>
      </TouchableOpacity>
    </View>
  );
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
    aspectRatio: 1,
    flex: 1 / 2,
    height: 100,
  },
  text: {
    flex: 1,
    fontFamily: "SourceSansPro",
    textAlign: "center",
  },
});

export default SavedCard;
