import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View, Dimensions, TouchableOpacity, Button } from 'react-native';
import Modal from 'react-native-modalbox';

let screen = Dimensions.get('window');

const DATA = [
    { title: 'Triple', value: 3, text: "3" }
]

export default class UnitSelectModal extends Component {
    constructor(props) {
        super(props);
    }
    renderModal = () => {
        this.refs.unitselectmodal.open();
    }
    render() {
        return (
            <Modal
                ref={'unitselectmodal'}
                style={styles.container}
                postion='center'
                backdrop={true}
            >
                <View style={styles.contents}>
                    <Text style={styles.headerText}>Edit Units</Text>
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
        height: 300,
        alignItems: 'center',
    },
    contents: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 15,
    },
    headerText: {
        fontSize: 25,
        marginBottom: 10,
        color: '#778899',
    },
})