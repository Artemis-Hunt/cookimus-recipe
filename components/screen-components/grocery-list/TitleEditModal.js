import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import Modal from 'react-native-modalbox';
import { Feather, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

let screen = Dimensions.get('window');
let originalTitle;

export default class TitleEditModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipeTitle: "",
            errorText: "",
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
            this.setState({ errorText: "Title cannot be an empty field" });
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
                    <Text style={styles.invalidField}>{this.state.errorText}</Text>
                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress={() => {
                            this.verifyTitle();
                        }}
                    >
                        <View style={{ flexDirection: "row", justifyContent: 'center' }}>
                            <Text style={styles.saveButtonText}>Save </Text>
                            <Entypo name="save" size={19} color="white" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => {
                            this.props.titleDelete(originalTitle);
                            this.refs.titleeditmodal.close();
                        }}
                    >
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.deleteButtonText}>Delete Recipe </Text>
                            <MaterialCommunityIcons name="delete-forever" size={20} color="white" />
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
        height: 225,
        alignItems: 'center',
    },
    contents: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 15,
    },
    headerContainer: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "cornflowerblue",
        marginBottom: 10,
    },
    headerText: {
        fontSize: 25,
        marginBottom: 5,
        color: '#778899',
    },
    iconStyle: {
        paddingHorizontal: 10,
        justifyContent: "center",
        marginBottom: 4,
    },
    textInput: {
        height: 30,
        padding: 5,
        borderColor: "#CCC",
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: "white",
        width: 250,
        fontSize: 16
    },
    saveButton: {
        marginTop: 10,
        marginBottom: 15,
        backgroundColor: "dodgerblue",
        height: 40,
        width: screen.width - 200,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    saveButtonText: {
        fontSize: 18,
        color: "white",
    },
    deleteButtonText: {
        fontSize: 17,
        color: "white",
    },
    deleteButton: {
        backgroundColor: "red",
        height: 40,
        width: screen.width - 200,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    invalidField: {
        color: "red"
    }
})