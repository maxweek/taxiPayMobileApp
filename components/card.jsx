import React, { Component } from "react";
import { View, Text, StyleSheet, Animated, Dimensions } from "react-native";
import { TextInput } from "react-native";
import {
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPressed: false,
    };
    this._animatedScale = new Animated.Value(0);
    this.status = "";

    if (this.props.item.status.id === 1) {
      this.status = "#bbf224";
    }
    if (this.props.item.status.id === 2) {
      this.status = "#f2ae24";
    }
    if (this.props.item.status.id === 3) {
      this.status = "#f24a24";
    }
  }

  componentDidMount() { }

  componentDidUpdate() {
    Animated.timing(this._animatedScale, {
      toValue: this.state.isPressed ? 1 : 0,
      duration: 50,
    }).start();
  }

  onPress = (evt) => {
    this.props.setUserSelectedAccount(this.props.item);
    this.props.navigation.navigate("Вывод средств", {
      item: this.props.item
    });
  };
  touchStartEvent = () => {
    this.setState({ isPressed: true });
  };
  touchEndEvent = () => {
    this.setState({ isPressed: false });
  };

  render() {
    const cardBox = {
      transform: [
        {
          scale: this._animatedScale.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0.95],
          }),
        },
      ],
      opacity: this._animatedScale.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.5],
      }),
      width: Dimensions.get("window").width - 20,
      marginHorizontal: 10,
      marginTop: 5,
      marginBottom: 5,
      backgroundColor: "white",
      flexDirection: "row",
      borderRadius: 10,
      paddingVertical: 15,
      paddingHorizontal: 17,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: this._animatedScale.interpolate({
          inputRange: [0, 1],
          outputRange: [2, 0],
        }),
      },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 5,
    };
    return (
      <TouchableWithoutFeedback
        onPress={this.onPress}
        onPressIn={this.touchStartEvent}
        onPressOut={this.touchEndEvent}
      >
        <Animated.View style={cardBox}>
          <View style={{ flex: 1 }}>
            <View style={{ marginBottom: 5 }}>
              <Text style={{ fontSize: 20, fontWeight: "600" }}>
                {this.props.item.aggregator.name}
              </Text>
            </View>
            <View style={{ borderBottomColor: "#e0e0e0", borderStyle: 'solid', borderBottomWidth: 1, paddingBottom: 6, marginBottom: 6, marginRight: 20 }}>
              <Text style={{ color: "#7f7f7f" }}>
                {this.props.item.park.name}
              </Text>
              <Text style={{ color: "#7f7f7f" }}>
                {this.props.item.park.telephone}
              </Text>
            </View>
            <View>
              <Text style={{ color: "#7f7f7f" }}>{this.props.item.name}</Text>
            </View>
          </View>
          <View
            style={{ justifyContent: "space-between", alignItems: "flex-end" }}
          >
            <View style={{ alignItems: "flex-end", flexDirection: "row" }}>
              <Text style={{ fontSize: 20, fontWeight: "600" }}>
                {this.props.item.balance}
              </Text>
              <Text
                style={{
                  color: "#7f7f7f",
                  fontSize: 12,
                  marginBottom: 2,
                  marginLeft: 3,
                }}
              >
                руб.
              </Text>
            </View>
            {this.props.item.available_requests !== null ? (
              <View>
                <Text>
                  Заявок: {this.props.item.available_requests}
                </Text>
              </View>
            ) : null}
            <View
              style={{
                marginTop: 3,
                paddingVertical: 2,
                paddingHorizontal: 10,
                borderRadius: 5,
                backgroundColor: this.status,
              }}
            >
              <Text style={{ color: this.props.item.status.id !== 3 ? "black" : 'white' }}>
                {this.props.item.status.name}
              </Text>
            </View>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}
