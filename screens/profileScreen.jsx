import React, { Component } from "react";
import { ScrollView, Text, View, Button } from "react-native";
import MyButton from "../components/myButton";

export default class ProfileScreen extends Component {
  render() {
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 27 }}>Профиль</Text>
        <MyButton onPress={this.props.onLogoutPress} title="Logout" />
      </View>
    );
  }
}
