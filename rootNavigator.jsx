import React, { Component } from "react";
import { StyleSheet, Text, View, AppRegistry } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

import withDrawContainer from "./screens/withDrawScreen/withDrawContainer";
import confirmContainer from "./screens/confirmScreen/confirmContainer";
import homeScreenContainer from "./screens/homeScreen/homeScreenContainer";
import AgreeCardScreen from "./screens/agreeCardScreen";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";

const Stack = createStackNavigator();

class RootNavigator extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nav: props.navigation
        }

    }

    render() {
        return (
            <Stack.Navigator style={styles.container}>
                <Stack.Screen
                    name="Список аккаунтов"
                    component={homeScreenContainer}
                    options={{
                        headerStyle: { height: 60 },
                        headerTitleStyle: { marginTop: -20 },
                        headerLeftContainerStyle: { marginTop: -20 },
                        headerRightContainerStyle: { marginTop: -20},
                        // headerRight: (props) => {
                        //     return (
                        //         <TouchableOpacity style={{ display: 'flex', justifyContent: 'space-between', width: 60, height: '100%', padding: 20 }} onPress={() => { this.state.nav.openDrawer() }}>
                        //             <View style={{ width: '100%', height: 2, backgroundColor: 'black' }}></View>
                        //             <View style={{ width: '100%', height: 2, backgroundColor: 'black' }}></View>
                        //             <View style={{ width: '100%', height: 2, backgroundColor: 'black' }}></View>
                        //         </TouchableOpacity>
                        //     )
                        // }
                    }}
                />
                <Stack.Screen
                    name="Вывод средств"
                    component={withDrawContainer}
                    options={{
                        headerStyle: { height: 60 },
                        headerTitleStyle: { marginTop: -20 },
                        headerLeftContainerStyle: { marginTop: -20 }
                    }}
                // options={{
                //     headerBackTitle: "Назад",
                // }}
                />
                <Stack.Screen
                    name="Подтверждение"
                    component={confirmContainer}
                    options={{
                        headerStyle: { height: 60 },
                        headerTitleStyle: { marginTop: -20 },
                        headerLeftContainerStyle: { marginTop: -20 }
                    }}
                // options={{
                //     headerBackTitle: "Назад",
                // }}
                />
                <Stack.Screen name="Подтверждение карты" component={AgreeCardScreen} />
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
    // container: {
    //     flex: 1,
    //     backgroundColor: "#000",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     height: 100
    // },
});