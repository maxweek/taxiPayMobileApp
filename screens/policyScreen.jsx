import React, { Component } from "react";
import { StyleSheet, Text, View, Button, Animated, Dimensions } from "react-native";
import MyButton from "../components/myButton";
import FloatingLabelInput from "../components/floatingLabelInput";
import API, { API_USER_RECOVERY_CHECK, API_USER_RECOVERY_SET } from "../API";
import WebView from "react-native-webview";

export default class PolicyScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <WebView
            source={{
                uri: 'https://github.com/facebook/react-native'
              }}
        ></WebView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
});
