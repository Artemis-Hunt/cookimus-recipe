import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import Modal from 'react-native-modalbox';

const DATA = [];

export default class ConfirmItemModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            launchModal: false,
        }
    }

    componentDidUpdate() {
        if (this.props.modalState === true) {
            this.refs.confirmItemModal.open();
        }
    }

    render() {
        return (
            <Modal
                ref={'confirmItemModal'}
                style={styles.container}
            >
                <Text>TEST MODAL</Text>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
})