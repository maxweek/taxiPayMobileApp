import React, { Component } from "react";
import { StyleSheet, Text, View, Button, Animated, Dimensions } from "react-native";
import WebView from "react-native-webview"; 
export default class PolicyScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <WebView
          source={{
            uri: 'https://drivermoney.ru/policy'
          }}
        ></WebView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
});
