import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Modal from "react-native-modalbox";
import Button from "../../generic/Button";

import { FontAwesome5, Entypo } from "@expo/vector-icons";

let screen = Dimensions.get("window");

export default class ReportSubmitModal extends Component {
  constructor(props) {
    super(props);
  }
  renderModal() {
    this.refs.submittedModal.open();
  }
  render() {
    return (
      <Modal
        ref={"submittedModal"}
        style={styles.container}
        position="center"
        backdrop={true}
      >
        <View style={styles.viewContainer}>
          <View style={{ flexDirection: "row", paddingBottom: 10 }}>
            <Text style={[styles.text, styles.headerStyle]}>
              Report Submitted{" "}
            </Text>
            {/* <View style={styles.iconStyle}>
                            <FontAwesome5 name="check" size={24} color="green" />
                        </View> */}
          </View>
          <Text style={styles.bodyText}>
            Your report has been submitted and we will be looking at it shortly.
          </Text>
          <Text></Text>
          <Text style={styles.bodyText}>Thank you for your feedback!</Text>
        </View>
        <View style={{flex: 1, justifyContent: "center"}}>
          <Button
            style={styles.closeButton}
            onPress={() => this.refs.submittedModal.close()}
            text={`Close`}
            textStyle={[styles.text, styles.buttonText]}
          />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    shadowRadius: 10,
    width: screen.width - 80,
    height: 220,
    alignItems: "center",
  },
  viewContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerStyle: {
    fontSize: 25,
    color: "#778899",
  },
  text: {
    fontFamily: "SourceSansPro",
  },
  bodyText: {
    color: "dimgray",
  },
  iconStyle: {
    justifyContent: "center",
  },
  closeButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "dodgerblue",
    marginTop: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
  },
  closeIcon: {
    justifyContent: "center",
    paddingTop: 3,
  },
});
