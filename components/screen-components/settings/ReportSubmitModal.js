import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import Modal from 'react-native-modalbox';

import { FontAwesome5, Entypo } from '@expo/vector-icons';

let screen = Dimensions.get('window');

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
                ref={'submittedModal'}
                style={styles.container}
                position='center'
                backdrop={true}
            >
                <View style={styles.viewContainer}>
                    <View style={{ flexDirection: "row", paddingBottom: 10, }}>
                        <Text style={styles.headerStyle}>Report Submitted </Text>
                        <View style={styles.iconStyle}>
                            <FontAwesome5 name="check" size={24} color="green" />
                        </View>
                    </View>
                    <Text style={styles.bodyText}>
                        Your report has been submitted and we will be looking at it shortly.
                    </Text>
                    <Text></Text>
                    <Text style={styles.bodyText}>Thank you for your feedback!</Text>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => this.refs.submittedModal.close()}
                    >
                        <Text style={styles.buttonText}>Close</Text>
                        <View style={styles.closeIcon}>
                            <Entypo name="cross" size={26} color="dodgerblue" />
                        </View>
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
    bodyText: {
        color: "dimgray"
    },
    iconStyle: {
        justifyContent: "center",
    },
    closeButton: {
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 25,
        backgroundColor: "white",
        flexDirection: "row",
    },
    buttonText: {
        fontSize: 21,
        color: "dodgerblue",
    },
    closeIcon: {
        justifyContent: "center",
        paddingTop: 3,
    }
})