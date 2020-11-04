import React, { Component } from "react";
import { StyleSheet, Text, View, AppRegistry, Dimensions } from "react-native";
// import LoginScreen from "./screens/loginScreen/loginScreen";
// import SecuredScreen from "./screens/securedScreen";
// import { useWindowDimensions } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import RecoveryScreen from "./screens/recoveryScreen";
import PolicyScreen from "./screens/policyScreen"
import AgreeCardScreen from "./screens/agreeCardScreen"
import PassCodeScreen from "./screens/passCodeScreen"
import LoginScreenContainer from "./screens/loginScreen/loginScreenContainer";
import RequisitesScreenContainer from "./screens/requisitesScreen/requisitesScreenContainer";
import { connect } from "react-redux";
import RootNavigator from "./rootNavigator"
import requisitesNavigator from "./requisitesNavigator";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

class AppNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.state;
  }

  componentDidUpdate() {
  }

  render() {
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
            name="Получить пароль"
            component={RecoveryScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Договор"
            component={PolicyScreen}
            options={{
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="Код доступа"
            component={PassCodeScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      );
    } else {
      return (
        // <RootNavigator />
        <Drawer.Navigator
          drawerPosition="right"
          drawerType="front"
          overlayColor="#290d40d6"
          edgeWidth={Dimensions.get('window').width / 5}
          drawerStyle={styles.drawerWindow}
          drawerContentOptions={{
            activeTintColor: '#7f3cb5',
            itemStyle: { paddingVertical: 5, marginVertical: 0 },
          }}
        > 
          <Drawer.Screen name="Список аккаунтов" component={RootNavigator} />
          <Drawer.Screen name="Справка" component={PolicyScreen} />
          {/* <Drawer.Screen name="Информация" component={PolicyScreen} /> */}
        </Drawer.Navigator>
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
  drawerWindow: {
    backgroundColor: '#fff'
  }
});
