import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import UserContext from "../context/UserContext";
import { auth, userDataDelete } from "../../config/Firebase/firebaseConfig";
import Button from "../generic/Button";

import { useNavigation, useRoute } from "@react-navigation/native";

import {
  AntDesign,
  FontAwesome,
  Entypo,
  MaterialIcons,
  Foundation,
} from "@expo/vector-icons";

const Settings = () => {
  const user = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const route = useRoute();
  const navigation = useNavigation();

  const isAnonymous = auth.currentUser.isAnonymous;

  const onLogOutPress = async () => {
    setLoading(true);
    if (isAnonymous) {
      userDataDelete();
    } else {
      await firebase.auth().signOut();
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <View style={styles.iconStyle}>
          <FontAwesome name="user" size={28} color="cornflowerblue" />
        </View>
        <Text
          style={[
            styles.text,
            styles.headerText,
            { color: "black", fontWeight: "bold" },
          ]}
        >
          Welcome,
        </Text>
        <Text
          style={[
            styles.text,
            styles.headerText,
            { color: "dimgray", fontWeight: "bold" },
          ]}
        >{`${user.firstName}`}</Text>
      </View>
      {isAnonymous ? null : (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ProfileEdit");
          }}
        >
          <View style={styles.profileButton}>
            <View style={styles.profileIcon}>
              <AntDesign name="profile" size={24} color="#778899" />
            </View>
            <Text style={[styles.text, styles.menuText]}>Profile</Text>
          </View>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("InfoPage");
        }}
      >
        <View style={styles.infoButton}>
          <View style={styles.infoIcon}>
            <Foundation name="info" size={26} color="#778899" />
          </View>
          <Text style={[styles.text, styles.menuText]}>About Us</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ReportPage");
        }}
      >
        <View style={styles.bugButton}>
          <View style={styles.bugIcon}>
            <MaterialIcons name="bug-report" size={26} color="#778899" />
          </View>
          <Text style={[styles.text, styles.menuText]}>
            Feedback / Report an issue
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onLogOutPress}>
        <View style={styles.profileButton}>
          <Text
            style={[
              styles.text,
              styles.menuText,
              { color: "crimson", marginRight: 10 },
            ]}
          >
            Log Out
          </Text>
          {loading ? <ActivityIndicator /> : null}
        </View>
      </TouchableOpacity>
      {/* <View style={styles.buttonView}>
        <Button
          text={"Sign out"}
          onPress={onLogOutPress}
          loading={loading}
          style={styles.logOutButton}
          textStyle={styles.logOutText}
        />
      </View> */}
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    //alignItems: "center",
    //justifyContent: "center",
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  headerBar: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 13,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "white",
    borderBottomWidth: 4,
    borderBottomColor: "lightblue",
  },
  buttonView: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    fontFamily: "SourceSansPro",
  },
  menuText: {
    fontSize: 20,
    color: "#222222",
  },
  headerText: {
    fontSize: 28,
    padding: 3,
  },
  logOutButton: {
    alignItems: "center",
    backgroundColor: "dodgerblue",
    borderRadius: 20,
    padding: 10,
    width: 100,
  },
  logOutText: {
    fontSize: 17,
  },
  iconStyle: {
    paddingRight: 10,
    paddingTop: 4,
  },
  profileIcon: {
    paddingRight: 10,
    paddingTop: 3,
  },
  profileButton: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: "white",
    marginTop: 2,
    flexDirection: "row",
  },
  bugButton: {
    paddingVertical: 15,
    paddingLeft: 7,
    backgroundColor: "white",
    marginTop: 2,
    flexDirection: "row",
  },
  bugIcon: {
    paddingRight: 10,
  },
  infoIcon: {
    paddingRight: 13,
  },
  infoButton: {
    paddingVertical: 15,
    paddingLeft: 11,
    backgroundColor: "white",
    marginTop: 2,
    flexDirection: "row",
  },
  exitIcon: {
    paddingRight: 10,
  },
});
