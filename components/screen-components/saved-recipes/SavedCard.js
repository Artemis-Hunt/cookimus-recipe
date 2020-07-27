import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const roundedRadius = 10;

const SavedCard = (props) => {
  const Window = useWindowDimensions();
  let imageSize = (Window.width - 80) / 2;
  const navigation = useNavigation();
  return (
    // <View>
    //   <TouchableOpacity
    //     activeOpacity={1}
    //     onPress={() => {
    //       // navigation.navigate("Recipe", {
    //       //   ...props,
    //       // });
    //       alert(props.image);
    //     }}
    //     style={[styles.card, {width: imageSize, height: imageSize + 50}]}
    //   >
    //     <Image style={[styles.image, {width: imageSize, height: imageSize}]} source={{ uri: `${props.image}` }} />
    //     <Text>{props.name}</Text>
    //     <Text></Text>
    //   </TouchableOpacity>
    // </View>
    <View style={[styles.card, { flex: 1 / 2, aspectRatio: 1.5 }]}>
      <TouchableOpacity
        activeOpacity={0.9}
        delayPressIn={5}
        delayPressOut={5}
        delayLongPress={5}
        onPress={() =>
          navigation.navigate("Recipe", {
            name: props.name,
            url: props.url,
            image: props.image,
            index: props.index,
          })
        }
        onLongPress={() => props.rendertitleeditmodal(props.name)}
        delayLongPress={180}
      >
        <Image
          style={[styles.image, { width: "100%", height: "100%" }]}
          source={{
            uri: `${props.image}`,
          }}
        />
        <LinearGradient
          colors={["transparent", "#00000088"]}
          style={styles.overlay}
          start={[0, 0.6]}
        />
        <View style={[styles.overlay, styles.details]}>
          <Text style={styles.name}>{props.name}</Text>
        </View>
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
    marginHorizontal: 8,
    marginVertical: 15,

    //Android shadow
    elevation: 2,
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
    borderRadius: roundedRadius,
  },
  text: {
    flex: 1,
    fontFamily: "SourceSansPro",
    textAlign: "center",
  },
  name: {
    fontFamily: "SourceSansPro",
    fontSize: 18,
    margin: 10,
    color: "white",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
    textShadowColor: "black",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: roundedRadius,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
});

export default SavedCard;
