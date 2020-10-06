import React, { Component } from "react";
import { StyleSheet, Text, View, AppRegistry } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

import withDrawContainer from "./screens/withDrawScreen/withDrawContainer";
import confirmContainer from "./screens/confirmScreen/confirmContainer";
import homeScreenContainer from "./screens/homeScreen/homeScreenContainer";
import { connect } from "react-redux";

const Stack = createStackNavigator();

class RootNavigator extends React.Component {
    render() {
        return (
            <Stack.Navigator style={styles.container}>
                <Stack.Screen
                    name="Список аккаунтов"
                    component={homeScreenContainer}
                />
                <Stack.Screen
                    name="Вывод средств"
                    component={withDrawContainer}
                    options={{
                        headerBackTitle: "Назад",
                    }}
                />
                <Stack.Screen
                    name="Подтверждение"
                    component={confirmContainer}
                    options={{
                        headerBackTitle: "Назад",
                    }}
                />
            </Stack.Navigator>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state: state,
    };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RootNavigator);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});