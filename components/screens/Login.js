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
import { firestoreDb, auth } from "../../config/Firebase/firebaseConfig";
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
      const response = await auth.signInWithEmailAndPassword(email, password);
      const uid = response.user.uid;
      const usersRef = firestoreDb.collection("users");
      const firestoreDoc = await usersRef.doc(uid).get();
      if (!firestoreDoc.exists) {
        alert("User does not exist!");
        return;
      }
      const user = firestoreDoc.data();
    } catch (err) {
      switch (err.code) {
        case "auth/user-not-found":
          alert("User does not exist");
          break;
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
    }
    setEmail("");
    setPassword("");
    setLoading(false);
  };

  const onAnonLoginPress = async () => {
    setAnonLoading(true);
    try {
      const response = await auth.signInAnonymously();
      const uid = response.user.uid;
      const data = {
        id: uid,
        email: "",
        firstName: "Guest",
        lastName: "",
      };
      const usersRef = firestoreDb.collection("users");
      await usersRef.doc(uid).set(data);
    } catch (err) {
      alert(err.message);
    }
    setAnonLoading(false);
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Image
          style={styles.logo}
          source={require("../../assets/images/Logo.png")}
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
          onPress={onLoginPress}
          loading={loading}
          style={styles.button}
          textStyle={styles.loginText}
        />
        <View style={styles.footerView}>
          <Text style={[styles.footerText, styles.text]}>
            Don't have an account?{" "}
            <Text onPress={onSignupLinkPress} style={styles.footerLink}>
              Sign up
            </Text>
            {`




            Or continue as Guest`}
          </Text>
        </View>
        <Button
          text={"Guest login"}
          onPress={onAnonLoginPress}
          loading={anonLoading}
          style={styles.button}
          textStyle={styles.loginText}
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
    margin: 30,
    width: 100,
    alignSelf: "center",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#CCCCCC",
    overflow: "hidden",
    marginVertical: 18,
    fontFamily: "SourceSansPro",
    fontSize: 18,

  },
  button: {
    backgroundColor: "dodgerblue",
    marginTop: 20,
    paddingHorizontal: 25,
    paddingVertical: 8,
  },
  footerView: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  text: {
    fontFamily: "SourceSansPro",
  },
  loginText: {
    fontSize: 18,
  },
  footerText: {
    fontSize: 16,
    color: "#2e2e2d",
  },
  footerLink: {
    color: "dodgerblue",
    fontWeight: "bold",
    fontSize: 16,
  },
});
