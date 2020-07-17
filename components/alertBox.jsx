import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";

export default class AlertBox extends Component {
  constructor(props) {
    super(props);

    if(this.props.status){
      this.statusIcon = require("../assets/okIcon.png");
    } else {
      this.statusIcon = require("../assets/closeIcon.png");
    }

    this.styles = StyleSheet.create({
        box: {
          backgroundColor: this.props.status ? "#bbf224" : "#f24a24",
          width: 20,
          height: 20,
          borderRadius: 30,
          borderStyle: 'solid',
          borderWidth: 0.5,
          borderColor: '#dedede',
          alignItems: 'center',
          justifyContent: 'center'
        },
        text: {
          color: this.props.status ? 'black' : 'white',
        }
      });
  }


  render() {
    return (
      <View style={this.styles.box}>
        <Image style={this.styles.image} source={this.statusIcon} />
          {/* <Text style={this.styles.text}>{this.statusIcon}</Text> */}
      </View>
    );
  }
}



// ? "#bbf224"
//                     : "#f24a24",