import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import firebase from "../../config/Firebase/firebaseConfig";
import Button from "../generic/Button";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [anonLoading, setAnonLoading] = useState(false);

  const onSignupLinkPress = () => {
    navigation.navigate("Signup");
  };

  const onLoginPress = async () => {
    setLoading(true);
    try {
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      const uid = response.user.uid;
      const usersRef = firebase.firestore().collection("users");
      const firestoreDoc = await usersRef.doc(uid).get();
      if (!firestoreDoc.exists) {
        alert("User does not exist!");
        return;
      }
      const user = firestoreDoc.data();
    } catch (err) {
      switch (err.code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
          alert("Incorrect username or password");
          break;
        case "auth/invalid-email":
          alert("Invalid email");
          break;
        default:
          alert(err.code);
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  const onAnonLoginPress = async () => {
    setAnonLoading(true);
    try {
      const response = await firebase.auth().signInAnonymously();
      const uid = response.user.uid;
      const data = {
        id: uid,
        email: "",
        firstName: "Guest",
        lastName: "",
      };
      const usersRef = firebase.firestore().collection("users");
      await usersRef.doc(uid).set(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setAnonLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Image
          style={styles.logo}
          source={require("../../assets/splash.png")}
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <Button
          text={"Log in"}
          onPressHandle={onLoginPress}
          loading={loading}
          style={styles.button}
        />
        <View style={styles.footerView}>
          <Text style={[styles.footerText, styles.text]}>
            Don't have an account?{" "}
            <Text onPress={onSignupLinkPress} style={styles.footerLink}>
              Sign up
            </Text>
            {`

            Or continue as Guest
            `}
          </Text>
        </View>
        <Button
          text={"Guest login"}
          onPressHandle={onAnonLoginPress}
          loading={anonLoading}
          style={styles.button}
        />
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 30,
  },
  title: {},
  logo: {
    flex: 1,
    width: 100,
    height: 200,
    alignSelf: "center",
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 16,
    fontFamily: "SourceSansPro",
  },
  button: {
    backgroundColor: "#788eec",
    width: 200,
    marginTop: 20,
    height: 48,
  },
  footerView: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  text: {
    fontFamily: "SourceSansPro",
  },
  footerText: {
    fontSize: 16,
    color: "#2e2e2d",
  },
  footerLink: {
    color: "#788eec",
    fontWeight: "bold",
    fontSize: 16,
  },
});
