import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDTXUV75AR15LKKO-q5ABiuhtcbiqAe71A",
  authDomain: "cookimus-3800d.firebaseapp.com",
  databaseURL: "https://cookimus-3800d.firebaseio.com",
  projectId: "cookimus-3800d",
  storageBucket: "cookimus-3800d.appspot.com",
  messagingSenderId: "203582863498",
  appId: "1:203582863498:web:0851ee329d1ba9a6709573",
  measurementId: "G-KTRJWRDV38",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
