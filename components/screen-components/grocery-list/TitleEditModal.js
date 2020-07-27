import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Modal from "react-native-modalbox";
import { Feather, Entypo, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import Button from "../../generic/Button";

let screen = Dimensions.get("window");
let originalTitle;

export default class TitleEditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeTitle: "",
      errorText: "",
    };
  }
  //Renders modal when called
  renderModal(title) {
    //Title is passed in as a object in .title param
    this.setState({ recipeTitle: title });
    originalTitle = title;
    this.refs.titleeditmodal.open();
  }
  //Handles the changing of title
  handleTitleChange(text) {
    this.setState({ recipeTitle: text });
  }
  //Verify if title is not a blank string
  verifyTitle() {
    if (this.state.recipeTitle === "") {
      this.setState({ errorText: "Title cannot be an empty field" });
    } else {
      this.props.saveChangeTitle(this.state.recipeTitle, originalTitle);
      this.refs.titleeditmodal.close();
    }
  }

  render() {
    return (
      <Modal
        ref={"titleeditmodal"}
        style={styles.container}
        postion="center"
        backdrop={true}
        onClosed={() => {
          this.setState({ errorText: false, recipeTitle: "" });
        }}
      >
        <View style={styles.contents}>
          <View style={styles.headerContainer}>
            <Text style={[styles.text, styles.headerText]}>
              Change recipe name
            </Text>
            {/* <View style={styles.iconStyle}>
              <Feather name="edit" size={22} color="#AAA" />
            </View> */}
          </View>
          <TextInput
            style={[styles.text, styles.textInput]}
            placeholder={this.state.recipeTitle}
            value={this.state.recipeTitle}
            onChangeText={(text) => {
              this.handleTitleChange(text);
            }}
          />
          <View style={{ flexDirection: "row", marginVertical: 10,}}>
            <Button
              style={styles.cancelButton}
              onPress={() => {
                this.refs.titleeditmodal.close();
              }}
            >
              <Text style={[styles.text, styles.cancelButtonText]}>Cancel</Text>
              {/* <Ionicons
                name="ios-close"
                size={30}
                color="grey"
              /> */}
            </Button>
            <View style={{width: 35}}/>
            <Button
              style={styles.saveButton}
              onPress={() => {
                this.verifyTitle();
              }}
            >
              <Text style={[styles.text, styles.saveButtonText]}>Save</Text>
              {/* <Entypo name="save" size={19} color="white" /> */}
            </Button>
          </View>
          <Text style={[styles.text, styles.invalidField]}>
            {this.state.errorText}
          </Text>
          <Button
            style={styles.deleteButton}
            onPress={() => {
              this.props.titleDelete(originalTitle);
              this.refs.titleeditmodal.close();
            }}
          >
            <Text style={[styles.text, styles.deleteButtonText]}>
              Delete Recipe{" "}
            </Text>
            <MaterialCommunityIcons
              name="delete-forever"
              size={20}
              color="red"
            />
          </Button>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    borderRadius: 20,
    shadowRadius: 10,
    width: screen.width - 80,
    height: 280,
    alignItems: "center",
  },
  contents: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 15,
  },
  headerContainer: {
    flexDirection: "row",
    borderBottomWidth: 3,
    borderBottomColor: "cornflowerblue",
    marginBottom: 10,
  },
  headerText: {
    fontSize: 25,
    marginBottom: 5,
    color: "#778899",
  },
  text: {
    fontFamily: "SourceSansPro",
  },
  iconStyle: {
    paddingHorizontal: 10,
    justifyContent: "center",
    marginBottom: 4,
  },
  textInput: {
    height: 40,
    padding: 5,
    borderColor: "#CCC",
    borderBottomWidth: 1,
    borderRadius: 5,
    backgroundColor: "white",
    width: screen.width - 100,
    fontSize: 18,
    textAlign: "center",
    },
  saveButton: {
    marginVertical: 10,
    backgroundColor: "dodgerblue",
    height: 40,
    width: 110,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 18,
    color: "white",
  },
  cancelButton: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "grey",
    height: 40,
    width: 110,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 18,
    color: "grey",
  },
  deleteButton: {
    height: 40,
    width: 180,
    borderWidth: 1,
    borderColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: {
    fontSize: 16,
    color: "red",
  },
  invalidField: {
    color: "red",
  },
});
