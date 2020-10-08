import React, { Component } from "react";
import { StyleSheet, Text, View, AppRegistry, Dimensions } from "react-native";
// import LoginScreen from "./screens/loginScreen/loginScreen";
// import SecuredScreen from "./screens/securedScreen";
// import { useWindowDimensions } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import RecoveryScreen from "./screens/recoveryScreen";
import PolicyScreen from "./screens/policyScreen"
import LoginScreenContainer from "./screens/loginScreen/loginScreenContainer";
import { connect } from "react-redux";
import RootNavigator from "./rootNavigator"

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
    // if(this.props.state.user.info.isLoading){
    //   return <LoadingScreen />
    // }
    console.log(Dimensions.get('window').width)
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
        </Stack.Navigator>
      );
    } else {
      return (
        <Drawer.Navigator
          drawerPosition="right"
          drawerType="front"
          overlayColor="#290d40d6"
          edgeWidth={Dimensions.get('window').width}
          drawerStyle={styles.drawerWindow}
        >
          <Drawer.Screen name="Главная" component={RootNavigator} />
          <Drawer.Screen name="Тест" component={PolicyScreen}/>
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
    backgroundColor: '#f2f2f2'
  }
});
