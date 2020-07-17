import React, { Component } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class MyButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this._animatedPress = new Animated.Value(0);
    this._animateEnabling = new Animated.Value(0);

    Animated.timing(this._animateEnabling, {
      toValue: this.props.status == "active" ? 0 : 1,
      duration: 200,
    }).start();
  }
  handlePress = () => {
    if (this.props.status == "active") {
      if (this.props.withLoading) {
        setTimeout(() => {
          this.setState({
            isPressed: false,
          });
        }, 2000);
      } else {
        this.setState({
          isPressed: false,
        });
      }
      this.props.onPress();
    }
  };
  componentDidUpdate() {
    if (this.props.status == "active") {
      Animated.timing(this._animateEnabling, {
        toValue: this.props.status == "active" ? 0 : 1,
        duration: 200,
      }).start();
    }
  }
  render() {
    const outerStyles = {
      opacity: this._animateEnabling.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.5],
      }),
    };
    return (
      <TouchableOpacity onPress={this.handlePress}>
        <Animated.View
          style={[
            styles.button,
            this.props.classType == "primary"
              ? styles.btnPrimary
              : styles.btnSecondary,
            outerStyles,
          ]}
        >
          <Text
            style={[
              styles.text,
              this.props.classType == "primary"
                ? styles.txtPrimary
                : styles.txtSecondary,
            ]}
          >
            {this.props.title}
          </Text>
        </Animated.View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    minWidth: 100,
    margin: 5,
    alignItems: "center",
    borderRadius: 5,
  },
  text: {
    fontSize: 20,
  },
  btnPrimary: {
    backgroundColor: "#bbf224",
  },
  btnSecondary: {
    backgroundColor: "transparent",
  },
  txtPrimary: {
    color: "black",
  },
  txtSecondary: {
    color: "black",
  },
  blocked: {
    opacity: 0.5,
  },
  unBlocked: {
    opacity: 1,
  },
});
