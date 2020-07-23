import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import UserContext from "../context/UserContext";
import firebase, { getUserDataRef } from "../../config/Firebase/firebaseConfig";
import Button from "../generic/Button"

import { useNavigation, useRoute } from "@react-navigation/native";

import { AntDesign, FontAwesome, Entypo, MaterialIcons, Foundation } from '@expo/vector-icons';


const Settings = () => {
  const user = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const route = useRoute();
  const navigation = useNavigation();

  const onLogOutPress = async () => {
    setLoading(true)
    if (user.isAnonymous) {
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
      <View style={styles.headerBar}>
        <View style={styles.iconStyle}>
          <FontAwesome name="user" size={28} color="cornflowerblue" />
        </View>
        <Text style={[styles.headerText, { color: "black", fontWeight: "bold" }]}>Welcome,</Text>
        <Text style={[styles.headerText, { color: "dimgray", fontWeight: "bold" }]}>{`${user.firstName}`}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ProfileEdit", {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          })
        }}
      >
        <View style={styles.profileButton}>
          <View style={styles.profileIcon}>
            <AntDesign name="profile" size={24} color="#778899" />
          </View>
          <Text style={styles.menuText}>Profile</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("InfoPage")
        }}
      >
        <View style={styles.infoButton}>
          <View style={styles.infoIcon}>
            <Foundation name="info" size={26} color="#778899" />
          </View>
          <Text style={styles.menuText}>About Us</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ReportPage")
        }}
      >
        <View style={styles.bugButton}>
          <View style={styles.bugIcon}>
            <MaterialIcons name="bug-report" size={26} color="#778899" />
          </View>
          <Text style={styles.menuText}>Report An Issue</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => alert("LOGOUT")}
      >
        <View style={styles.profileButton}>
          <View style={styles.exitIcon}>
            <Entypo name="log-out" size={24} color="#778899" />
          </View>
          <Text style={styles.menuText}>Log Out</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.buttonView}>
        <Button
          text={"Sign out"}
          onPressHandle={onLogOutPress}
          loading={loading}
          style={styles.logOut}
        />
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    //alignItems: "center",
    //justifyContent: "center",
    flex: 1,
    backgroundColor: "#F9F9F9"
  },
  headerBar: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "white",
    height: 60,
    borderBottomWidth: 4,
    borderBottomColor: "lightblue"
  },
  buttonView: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    fontFamily: "SourceSansPro",
  },
  menuText: {
    fontSize: 23,
    color: "#888888"
  },
  headerText: {
    fontSize: 28,
    padding: 3,
  },
  logOut: {
    alignItems: "center",
    backgroundColor: "#788eec",
    padding: 10,
    width: 100,
  },
  iconStyle: {
    paddingRight: 10,
    paddingTop: 4,
  },
  profileIcon: {
    paddingRight: 10,
    paddingTop: 3
  },
  profileButton: {
    padding: 10,
    backgroundColor: "white",
    marginTop: 2,
    flexDirection: "row",
    borderBottomWidth: 1.5,
    borderBottomColor: "#CCC",
  },
  bugButton: {
    paddingVertical: 10,
    paddingLeft: 7,
    backgroundColor: "white",
    marginTop: 2,
    flexDirection: "row",
    borderBottomWidth: 1.5,
    borderBottomColor: "#CCC"
  },
  bugIcon: {
    paddingRight: 10,
  },
  infoIcon: {
    paddingRight: 13,
  },
  infoButton: {
    paddingVertical: 10,
    paddingLeft: 11,
    backgroundColor: "white",
    marginTop: 2,
    flexDirection: "row",
    borderBottomWidth: 1.5,
    borderBottomColor: "#CCC"
  },
  exitIcon: {
    paddingRight: 10,
  }
});
