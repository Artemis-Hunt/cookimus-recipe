import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import UserContext from "../context/UserContext";
import firebase, {getUserDataRef} from "../../config/Firebase/firebaseConfig";
import Button from "../generic/Button"

const Settings = () => {
  const user = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const onLogOutPress = async () => {
    setLoading(true)
    if(user.isAnonymous) {
      const usersRef = firebase.firestore().collection("users")
      await usersRef.doc(user.uid).delete();
      await user.delete();
    }
    else {
      await firebase.auth().signOut();
    }
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <Text style = {styles.text}>
        {`Current user is ${user.firstName}.`}
      </Text>
      <Button
          text={"Sign out"}
          onPressHandle={onLogOutPress}
          loading={loading}
          style={styles.logOut}
        />
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
  text: {
    fontFamily: "SourceSansPro",
    margin: 10,
  },
  logOut: {
    alignItems: "center",
    backgroundColor: "#788eec",
    padding: 10,
    width: 100,
  },
});
