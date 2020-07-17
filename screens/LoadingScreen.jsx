import React, { Component } from "react";
import { ScrollView, Text, View, Button } from "react-native";
import MyButton from "../components/myButton";

export default class LoadingScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ fontSize: 27 }}>Загрузка</Text>
      </View>
    );
  }
}
