import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import Modal from 'react-native-modalbox';
import { Feather, Entypo } from '@expo/vector-icons';

let screen = Dimensions.get('window');
let originalTitle;

export default class TitleEditModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipeTitle: "",
            errorText: false,
        }
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
            this.setState({ errorText: true });
        } else {
            this.props.saveChangeTitle(this.state.recipeTitle, originalTitle);
        }
    }

    render() {
        return (
            <Modal
                ref={'titleeditmodal'}
                style={styles.container}
                postion='center'
                backdrop={true}
                onClosed={() => {
                    this.setState({ errorText: false, recipeTitle: "" });
                }}
            >
                <View style={styles.contents}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerText}>Edit Recipe Title</Text>
                        <View style={styles.iconStyle}>
                            <Feather name="edit" size={22} color="#AAA" />
                        </View>
                    </View>
                    <TextInput
                        style={styles.textInput}
                        placeholder={this.state.recipeTitle}
                        value={this.state.recipeTitle}
                        onChangeText={(text) => { this.handleTitleChange(text) }}
                    />
                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress={() => {
                            this.verifyTitle();
                        }}
                    >
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.saveButtonText}>Save Title </Text>
                            <Entypo name="save" size={18} color="dodgerblue" />
                        </View>
                    </TouchableOpacity>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        borderRadius: 20,
        shadowRadius: 10,
        width: screen.width - 80,
        height: 200,
        alignItems: 'center',
    },
    contents: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 15,
    },
    headerContainer: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "cornflowerblue",
        marginBottom: 10,
    },
    headerText: {
        fontSize: 23,
        marginBottom: 5,
        color: '#778899',
    },
    iconStyle: {
        paddingHorizontal: 10,
    },
    textInput: {
        height: 35,
        padding: 5,
        borderColor: "#CCC",
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: "white",
        width: 250,
    },
    saveButton: {
        paddingVertical: 10,
    },
    saveButtonText: {
        fontSize: 18,
        color: "dodgerblue",
    }
})