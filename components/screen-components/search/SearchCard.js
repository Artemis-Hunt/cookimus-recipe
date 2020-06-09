import React from "react";
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

const SearchCard = (props) => {
  const Window = useWindowDimensions();
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        activeOpacity={1}
        delayPressIn={5}
        delayPressOut={5}
        delayLongPress={5}
        onPress={() => navigation.navigate("Recipe", {...props, Window, name: `${props.data.title}`})}
        style={styles.card}
      >
        <Image
          style={[
            styles.image,
            { height: Window.height / 7, width: Window.width / 4 },
          ]}
          source={{ uri: `${props.image}` }}
        />
        <View style={styles.descriptionBox}>
          <Text
            style={[
              styles.title,
              styles.text,
              { fontSize: sizeScaler(22, Window) },
            ]}
            numberOfLines={2}
          >
            {props.data.title}
          </Text>
          <Text style={[styles.site, styles.text]}>website.com</Text>
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
    margin: 8,
  },
  text: {
    flex: 1,
    fontFamily: "SourceSansPro",
    textAlign: "center",
  },
  title: {},
  site: {
    color: "grey",
    fontSize: 15,
    fontStyle: "italic",
  },
});
