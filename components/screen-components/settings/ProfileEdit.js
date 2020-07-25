import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
} from "react-native";
import PasswordCheck from "./PasswordCheck.js"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import UserContext from "../../context/UserContext.js";

let selectedFirstName = false;
let selectedLastName = false;
let selectedEmail = false;

//Edit profile names
export default class ProfileEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refresh: false,
            newFirstName: "",
            newLastName: "",
            newEmail: "",
            emailEditable: false,
        }
        this.firstName = this.context.firstName;
        this.lastName = this.context.lastName;
        this.email = this.context.email;

        this.renderPasswordCheckModal = this.renderPasswordCheckModal.bind(this);
        this.verifiedPassword = this.verifiedPassword.bind(this);
    }
    //Set Variables on mount
    componentDidMount() {
        this.setState({ newFirstName: this.firstName });
        this.setState({ newLastName: this.lastName });
        this.setState({ newEmail: this.email });
    }
    //Refresh current page
    forceRefresh() {
        this.setState({ refresh: !this.state.refresh });
    }
    //Render modal for password verification
    renderPasswordCheckModal() {
        this.refs.passwordCheck.renderModal();
    }
    //Toggle border colors when text input is selected
    toggleNameSelected() {
        selectedFirstName = !selectedFirstName;
        this.forceRefresh();
    }
    toggleLastNameSelected() {
        selectedLastName = !selectedLastName;
        this.forceRefresh();
    }
    toggleEmailSelected() {
        selectedEmail = !selectedEmail;
        this.forceRefresh();
    }
    //Handle Changes for changing of first name
    handleFNChange(text) {
        this.setState({ newFirstName: text });
    }
    //Handle Changes for changing of last name
    handleLNChange(text) {
        this.setState({ newLastName: text });
    }
    //Handle changes for changing of email
    handleEmailChange(text) {
        this.setState({ newEmail: text });
    }
    //This function will determine if the input field is totally blank, if it is, re-insert original data
    verifyField(inputField) {
        switch (inputField) {
            case 1:
                let tempFirstName = this.state.newFirstName.trim();
                if (tempFirstName === "") {
                    this.setState({ newFirstName: this.firstName });
                }
                break;
            case 2:
                let tempLastName = this.state.newLastName.trim();
                if (tempLastName === "") {
                    this.setState({ newLastName: this.lastName });
                }
                break;
            case 3:
                let tempEmail = this.state.newEmail.trim();
                if (tempEmail === "") {
                    this.setState({ newEmail: this.email });
                }
                break;
        }
    }
    //Enables changes to email when verified
    verifiedPassword(verify) {
        if (verify) {
            this.setState({ emailEditable: true });
            this.refs.emailEditBox.focus();
        }
    }
    //Verify fields if valid and update name and email on Firebase
    verifyAndUpdate() {
        //After updating, need to ensure app is pulling new user info
        //Set states as updated to reflect change - has to repull from firebase
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerBar}>
                    <Text style={styles.titleText}>Personal Details  </Text>
                    <View style={styles.iconStyle}>
                        <MaterialCommunityIcons name="account-card-details-outline" size={26} color="black" />
                    </View>
                </View>
                <Text style={[styles.subHeading, styles.fontBody]}>Account Name</Text>
                <View style={styles.editZone}>
                    <Text style={[styles.subFooter, styles.fontBody]}>First Name</Text>
                    <TextInput
                        style={[styles.textInput, (selectedFirstName) ? styles.textInputSelectedColor : styles.textInputNormalColor]}
                        placeholder={this.state.newFirstName}
                        value={this.state.newFirstName}
                        onChangeText={(text) => this.handleFNChange(text)}
                        onFocus={() => this.toggleNameSelected()}
                        onEndEditing={() => {
                            this.toggleNameSelected();
                            this.verifyField(1);
                        }}
                    />
                </View>
                <View style={styles.editZone}>
                    <Text style={[styles.subFooter, styles.fontBody]}>Last Name</Text>
                    <TextInput
                        style={[styles.textInput, (selectedLastName) ? styles.textInputSelectedColor : styles.textInputNormalColor]}
                        placeholder={this.state.newLastName}
                        value={this.state.newLastName}
                        onChangeText={(text) => this.handleLNChange(text)}
                        onFocus={() => this.toggleLastNameSelected()}
                        onEndEditing={() => {
                            this.toggleLastNameSelected();
                            this.verifyField(2);
                        }}
                    />
                </View>
                <Text style={[styles.subHeading, styles.fontBody]}>Contact Information</Text>
                <View styles={styles.editZone}>
                    <Text style={[styles.subFooter, styles.fontBody]}>Registered Email</Text>
                    <TextInput
                        ref={"emailEditBox"}
                        style={[styles.textInput, (selectedEmail) ? styles.textInputSelectedColor : (this.state.emailEditable) ? styles.textInputNormalColor : styles.nonEditableTextColor]}
                        placeholder={this.state.newEmail}
                        value={this.state.newEmail}
                        editable={this.state.emailEditable}
                        selectTextOnFocus={true}
                        onChangeText={(text) => this.handleEmailChange(text)}
                        onFocus={() => this.toggleEmailSelected()}
                        onEndEditing={() => {
                            this.toggleEmailSelected();
                            this.verifyField(3);
                        }}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            //alert(this.refs.emailEditBox.isFocused());
                            this.renderPasswordCheckModal();
                        }}
                        disabled={this.state.emailEditable}
                    >
                        <Text style={(this.state.emailEditable) ? styles.disabledEditEmailButton : styles.editEmailButton}>Edit Email</Text>
                    </TouchableOpacity>
                </View>

                {/* Just for the Lolz - Delete when necessary*/}
                <Text style={[styles.subHeading, styles.fontBody]}>Payment Details</Text>
                <View styles={styles.editZone}>
                    <Text style={[styles.subFooter, styles.fontBody]}>Credit Card Number</Text>
                    <Text style={{ fontSize: 16, color: "gray" }}>XXXX-XXXX-XXXX-0000 (VISA ending in 0000)</Text>
                </View>
                {/* Just for the Lolz - Delete when necessary*/}

                <View style={styles.updateBox}>
                    <TouchableOpacity
                        style={styles.updateButton}
                        onPress={() => this.verifyAndUpdate()}
                    >
                        <Text style={[styles.fontBody,styles.updateText]}>Update Info</Text>
                    </TouchableOpacity>
                </View>
                <PasswordCheck
                    ref={"passwordCheck"}
                    verifyPassword={this.verifiedPassword}
                />
            </View>
        )
    }
}
ProfileEdit.contextType = UserContext;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9F9F9",
        padding: 10,
    },
    titleText: {
        fontSize: 27,
        fontWeight: "bold"
    },
    headerBar: {
        flexDirection: "row",
        paddingVertical: 10,
        borderBottomWidth: 4,
        borderBottomColor: "#CCC"
    },
    iconStyle: {
        justifyContent: "center"
    },
    subHeading: {
        fontSize: 23,
        paddingTop: 20,
        paddingBottom: 10,
        color: "#778899"
    },
    editZone: {
        marginVertical: 5,
    },
    fontBody: {
        fontFamily: "SourceSansPro",
    },
    textInput: {
        height: 30,
        fontSize: 17,
        borderBottomWidth: 2,
        backgroundColor: "#F9F9F9",
    },
    textInputSelectedColor: {
        borderBottomColor: "cornflowerblue",
    },
    textInputNormalColor: {
        borderBottomColor: "#CCC",
    },
    nonEditableTextColor: {
        borderBottomColor: "#CCC",
        color: "#888888"
    },
    subFooter: {
        fontSize: 16,
        color: "#686868",
    },
    updateButton: {
        paddingVertical: 5,
        backgroundColor: "white",
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: "dodgerblue",
        height: 47,
        width: 125,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
    },
    updateText: {
        color: "white",
        fontSize: 17,
    },
    updateBox: {
        flex: 1,
        justifyContent: "flex-end"
    },
    editEmailButton: {
        paddingTop: 5,
        color: "dodgerblue",
    },
    disabledEditEmailButton: {
        paddingTop: 5,
        color: "#999999",
    }
})