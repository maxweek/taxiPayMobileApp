import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
} from "react-native";
import {
    ScrollView,
} from "react-native-gesture-handler";

export default class RequisitesScreen extends Component {
    constructor(props) {
        super(props);

        this.state = this.props.state;
    }

    render() {
        return (
            <ScrollView
                contentContainerStyle={{ paddingTop: 50, paddingBottom: 300 }}
                style={{ flex: 1 }}
            >
                <View>
                    <Text>123</Text>
                </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    pageHeaderBox: {
        position: "relative",
    },
    pageHeader: {
        fontSize: 30,
        fontWeight: "300",
        padding: 10,
        textAlign: "right",
        position: "relative",
        zIndex: 20,
    },
    pageHeaderImage: {
        position: "absolute",
        width: 170,
        height: 170,
        top: -32,
        right: -20,
        opacity: 0.2,
    },
    module: {
        width: Dimensions.get("window").width - 20,
        margin: 10,
        backgroundColor: "white",
        marginHorizontal: 10,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 17,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
    },
    moduleWithDraw: {
        width: Dimensions.get("window").width - 20,
        margin: 10,
        backgroundColor: "white",
        marginHorizontal: 10,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 10,
        paddingVertical: 7,
        paddingHorizontal: 7,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
    },
    moduleWithInput: {
        width: Dimensions.get("window").width - 40,
        marginHorizontal: 20,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    moduleHeader: {
        fontWeight: "600",
        fontSize: 16,
        textAlign: "right",
    },
    moduleHeaderWithDraw: {
        fontWeight: "600",
        fontSize: 16,
        textAlign: "right",
    },
    moduleHeaderWithDrawBox: {
        marginTop: 6,
        marginBottom: 10,
        paddingBottom: 12,
        marginHorizontal: 10,
        borderBottomColor: "#dedede",
        borderBottomWidth: 1,
        borderStyle: "solid",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    moduleHeaderBox: {
        marginTop: 0,
        marginBottom: 10,
        paddingBottom: 12,
        borderBottomColor: "#dedede",
        borderBottomWidth: 1,
        borderStyle: "solid",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    balanceBoxText: {
        fontSize: 50,
        fontWeight: "300",
    },
    balanceBoxTextEnd: {
        fontSize: 30,
        fontWeight: "300",
    },
    balanceBoxExt: {
        fontSize: 22,
        color: "#7f7f7f",
        marginBottom: 6,
        marginLeft: 4,
    },
    balanceBoxExtEnd: {
        fontSize: 16,
        color: "#7f7f7f",
        marginBottom: 3,
        marginLeft: 4,
    },
    commissionBoxText: {},
    commissionText: {
        color: "#7f7f7f",
        fontSize: 12,
    },
    comissionLine: {
        width: "100%",
        borderBottomColor: "#ededed",
        borderBottomWidth: 1,
        borderStyle: "solid",
        marginBottom: 4,
        paddingBottom: 4,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
    },
});
