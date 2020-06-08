import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
} from "react-native";

const roundedRadius = 10;

const SearchCard = (props) => {
  const Window = useWindowDimensions();
  return (
    <View style={styles.card}>
      <Image
        style={[
          styles.image,
          { height: Window.height / 7, width: Window.width / 4 },
        ]}
        source={{ uri: `${props.image}` }}
      />
      <View style={styles.descriptionBox}>
        <Text style={[styles.title, styles.text]}>{props.data.title}</Text>
      </View>
    </View>
  );
};

export default SearchCard;

const styles = StyleSheet.create({
  //Card container
  card: {
    borderRadius: roundedRadius,
    backgroundColor: "white",
    flex: 1,
    flexDirection: "row",
    marginVertical: 5,

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
    margin: 5,
  },
  text: {
    fontFamily: "SourceSansPro",
    textAlign: "center",
  },
  title: {
    fontSize: 27,
  },
  site: {
    fontSize: 15,
    fontStyle: "italic",
  },
});
