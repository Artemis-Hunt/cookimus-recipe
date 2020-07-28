import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import Modal from "react-native-modalbox";

let screen = Dimensions.get("window");

export default class TableFullModal extends Component {
    constructor(props) {
        super(props);
    }
    renderModal() {
        this.refs.TableFullModal.open();
    }

    render() {
        return (
            <Modal
                ref={"Tablefullmodal"}
                style={styles.container}
                position="center"
                backdrop={true}
            >
                <View>
                    <Text>Array Full</Text>
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
        height: 220,
        alignItems: "center",
    },
})