import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import Modal from 'react-native-modalbox';

let screen = Dimensions.get('window');

//This class will check with firebase if the input password is the same as the saved password to allow for more actions
export default class PasswordCheck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            enteredPassword: "",
        }
    }
    renderModal() {
        this.refs.passwordCheckModal.open();
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
                <Text>Verify Password</Text>
                <Text>In order to make changes, please enter your Cookimus account password.</Text>
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
    viewContainer: {
        padding: 10,
    }
})