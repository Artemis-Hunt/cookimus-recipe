import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput
} from "react-native";
import Button from "../../generic/Button"
import ReportSubmitModal from "./ReportSubmitModal.js"
import {sendFeedback} from "../../../config/Firebase/firebaseConfig"
import { MaterialIcons } from '@expo/vector-icons';

//Page to submit bug reports for the app
export default class ReportPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feedbackContent: "",
        }
        this.launchModal = this.launchModal.bind(this);
    }
    handleTextChange(text) {
        this.setState({ feedbackContent: text });
    }
    //Function to handle submission of report
    submitReport() {
        let report = this.state.feedbackContent.trim();
        if (report !== "") {
            //Submit report
            sendFeedback(report);
            this.refs.feedbackInput.blur();
            this.launchModal();
            this.setState({ feedbackContent: "" });
        }
    }
    //Open modal to show that feedback has been submitted
    launchModal() {
        this.refs.confirmModal.renderModal();
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerBar}>
                    <Text style={styles.titleText}>Report An Issue </Text>
                    <View style={styles.reportIcon}>
                        <MaterialIcons name="report-problem" size={26} color="black" />
                    </View>
                </View>
                <Text style={styles.bodyText}>
                    We are sorry that you have run into issues with our app! Please leave
                    a description of the issue that you have faced with the app.
                </Text>
                <Text></Text>
                <Text style={styles.bodyText}>
                    Your feedback is valuable and appreciated in improving our app.
                </Text>
                <TextInput
                    ref={"feedbackInput"}
                    style={styles.textInput}
                    multiline={true}
                    blurOnSubmit={true}
                    placeholder={"Enter Description of Issue"}
                    value={this.state.feedbackContent}
                    onChangeText={(text) => this.handleTextChange(text)}
                />
                <Button 
                    style={styles.submitButton}
                    onPress={() => this.submitReport()}
                    text={`Submit Report`}
                    textStyle={[styles.text, styles.buttonText]}
                />
                <ReportSubmitModal
                    ref={"confirmModal"}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9F9F9",
        padding: 10,
    },
    headerBar: {
        flexDirection: "row",
        paddingVertical: 10,
        borderBottomWidth: 4,
        borderBottomColor: "orange",
        marginBottom: 10,
    },
    titleText: {
        fontSize: 27,
        fontWeight: "bold"
    },
    reportIcon: {
        justifyContent: "center",
        paddingTop: 1,
    },
    text: {
        fontFamily: "SourceSansPro"
    },
    bodyText: {
        color: "dimgray",
        fontSize: 14
    },
    subHeading: {
        fontSize: 16,
        color: "#778899",
        fontWeight: "bold"
    },
    textInput: {
        height: 150,
        fontSize: 15,
        borderWidth: 1,
        borderColor: "#ccc",
        backgroundColor: "white",
        marginTop: 20,
        marginBottom: 20,
        padding: 5,
        textAlignVertical: "top",
    },
    submitButton: {
        paddingVertical: 5,
        backgroundColor: "white",
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: "dodgerblue",
        height: 47,
        width: 150,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
    }
})