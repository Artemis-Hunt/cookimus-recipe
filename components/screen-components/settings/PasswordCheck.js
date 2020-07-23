import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import Modal from 'react-native-modalbox';

import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

let screen = Dimensions.get('window');

//This class will check with firebase if the input password is the same as the saved password to allow for more actions
export default class PasswordCheck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            enteredPassword: "",
            hiddenText: true,
            incorrectPassword: "",
        }
    }
    renderModal() {
        this.refs.passwordCheckModal.open();
    }
    //Handles when the password is being typed in by the user
    handleEnterPassword(text) {
        this.setState({ enteredPassword: text });
    }
    //Toggles whether the password text is hidden
    toggleHiddenState() {
        this.setState({ hiddenText: !this.state.hiddenText })
    }
    //Verify entered password with password on FireBase
    verifyPassword() {
        //Testing Variable
        const userPassword = "Test"
        if (this.state.enteredPassword === userPassword) {
            //Sends reply to profileEdit page
            this.props.verifyPassword(true);
            //Clear States
            this.setState({ enteredPassword: "" });
            this.setState({ incorrectPassword: "" })
            this.refs.passwordCheckModal.close();
        } else {
            this.setState({ incorrectPassword: "Incorrect Password Entered" })
        }
    }
    render() {
        return (
            <Modal
                ref={'passwordCheckModal'}
                style={styles.container}
                position='center'
                backdrop={true}
            >
                <View style={styles.viewContainer}>
                    <View style={{ flexDirection: "row", paddingBottom: 3, }}>
                        <Text style={styles.headerStyle}>Verify Password</Text>
                        <View style={styles.iconStyle}>
                            <FontAwesome5 name="key" size={18} color="#778899" />
                        </View>
                    </View>
                    <Text style={{ fontSize: 13 }}>In order to make changes, please enter your Cookimus account password.</Text>
                    <View style={styles.passwordArea}>
                        <TextInput
                            style={styles.textInput}
                            secureTextEntry={this.state.hiddenText}
                            placeholder={"Enter Password"}
                            value={this.state.enteredPassword}
                            onChangeText={(text) => this.handleEnterPassword(text)}
                        />
                        <View style={styles.hideIcon}>
                            <TouchableOpacity
                                onPress={() => this.toggleHiddenState()}
                            >
                                {(this.state.hiddenText) ? <MaterialCommunityIcons name="eye-off" size={24} color="#CCC" /> : <MaterialCommunityIcons name="eye" size={24} color="dodgerblue" />}
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={{color: "red"}}>{this.state.incorrectPassword}</Text>
                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={() => this.verifyPassword()}
                    >
                        <Text style={styles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        shadowRadius: 10,
        width: screen.width - 80,
        height: 200,
        alignItems: 'center',
    },
    viewContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    headerStyle: {
        fontSize: 25,
        color: "#778899"
    },
    iconStyle: {
        justifyContent: "center",
        paddingLeft: 5,
    },
    textInput: {
        flex: 7,
        height: 30,
        fontSize: 17,
        borderBottomWidth: 2,
        backgroundColor: "white",
        borderBottomColor: "dimgray"
    },
    passwordArea: {
        paddingTop: 10,
        paddingBottom: 5,
        flexDirection: "row",
    },
    hideIcon: {
        paddingLeft: 5,
        justifyContent: "center",
        marginTop: 3,
    },
    buttonArea: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    submitButton: {
        marginTop: 7,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
    },
    submitButtonText: {
        fontSize: 18,
        color: "dodgerblue"
    }
})