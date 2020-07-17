import React, { Component } from "react";
import { StyleSheet, Text, View, AppRegistry } from "react-native";
// import LoginScreen from "./screens/loginScreen/loginScreen";
// import SecuredScreen from "./screens/securedScreen";

import { createStackNavigator } from "@react-navigation/stack";
import RecoveryScreen from "./screens/recoveryScreen";
import SplashScreen from "./screens/splashScreen";
import LoadingScreen from "./screens/LoadingScreen";
import LoginScreenContainer from "./screens/loginScreen/loginScreenContainer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import homeScreenContainer from "./screens/homeScreen/homeScreenContainer";
import { connect } from "react-redux";
import withDrawContainer from "./screens/withDrawScreen/withDrawContainer";
import confirmContainer from "./screens/confirmScreen/confirmContainer";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

class AppNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.state;
  }

  componentDidUpdate() {
  }

  render() {
    // if(this.props.state.user.info.isLoading){
    //   return <LoadingScreen />
    // }
    if (!this.props.state.user.info.isLoggedIn) {
      return (
        <Stack.Navigator style={styles.container}>
          <Stack.Screen
            name="Вход"
            component={LoginScreenContainer}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Восстановление пароля"
            component={RecoveryScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      );
    } else {
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
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    state: state,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
