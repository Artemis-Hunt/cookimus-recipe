import React, { useContext } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import UserContext from "../context/UserContext";
import firebase from "../../config/Firebase/firebaseConfig";

const onLogOutPress = async () => {
  await firebase.auth().signOut();
  alert("Signed out!")
}
const Settings = () => {
  const user = useContext(UserContext);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logOut} onPress={onLogOutPress}>
        <Text>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  logOut: {
    alignItems: "center",
    borderWidth: 1,
    padding: 10,
    width: 100,
  },
});
