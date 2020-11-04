import React, { Component } from "react";
import { StyleSheet, Text, View, Button, Animated, Dimensions } from "react-native";
import MyButton from "../components/myButton";
import FloatingLabelInput from "../components/floatingLabelInput";
import API, { API_USER_BANKCARD_STORAGE_CHECK, API_USER_RECOVERY_CHECK, API_USER_RECOVERY_SET } from "../API";
import WebView from "react-native-webview";
let timer;
export default class AgreeCardScreen extends Component {
  constructor(props) {
    super(props);
  }
  sendRequest = () => {
    return API.post(API_USER_BANKCARD_STORAGE_CHECK + '/' + this.props.route.params.data.id)
  }
  setPolling = () => {
    
    timer = setTimeout(() => {
      let request = this.sendRequest()
      request.then(res => {
        console.log(res.data)
        if(res.data.type === 'success' || res.data.type === 'error'){
          clearTimeout(timer)
          this.props.navigation.navigate("Вывод средств", {status: true})
        } else {
          this.setPolling()
        }
      })
    }, 3000)
  }
  componentWillUnmount() {
    clearTimeout(timer)
  }
  render() {
    this.setPolling()
    return (
      <View style={{ flex: 1 }}>
        <WebView
          source={{
            uri: this.props.route.params.data.url
          }}
        ></WebView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
});
