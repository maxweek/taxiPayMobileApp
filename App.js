import React, { Component } from "react";
import { AppRegistry, StatusBar } from "react-native";
import AppNavigator from "./AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./store/reducers";

const store = createStore(rootReducer);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <StatusBar
            barStyle="light-content"
            hidden={false}
            backgroundColor="#7f3cb5"
            translucent={true}
          />
          <AppNavigator />
        </NavigationContainer>
      </Provider>
    );
  }
}

AppRegistry.registerComponent(App, () => App);
