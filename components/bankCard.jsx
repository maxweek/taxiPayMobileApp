import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Image,
} from "react-native";
import { TextInput } from "react-native";
import {
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

export default class BankCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bankCard: this.props.bankCard,
    };

    this._animateSelected = new Animated.Value(0);

    this.cardLogo = require("../assets/ico_method_card.png");

  }

  componentDidUpdate() {
    Animated.timing(this._animateSelected, {
      toValue: this.state.bankCard.isSelected ? 1 : 0,
      duration: 200,
    }).start();
  }
  handlePress = () => {
    this.props.onPress()
  }
  delete = () => {
    this.props.delete()
  }

  render() {
    let styleSelected = {
      opacity: this._animateSelected.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
      transform: [
        {
          scale: this._animateSelected.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5, 1],
          }),
        },
      ],
    };
    let deleteBox = null;
    if (this.state.bankCard.isSelected) {
      deleteBox = (
        <TouchableOpacity
          onPress={this.delete}>
          <Animated.View
            style={[styleSelected, {
              alignItems: "flex-end",
              marginTop: 3,
              paddingVertical: 4,
              paddingHorizontal: 10,
              borderRadius: 5,
              backgroundColor: "#f24a24",
            }]}
          >
            <Text
              style={{
                fontSize: 14,
                color: "white",
              }}
            >
              Удалить
        </Text>
          </Animated.View>
        </TouchableOpacity>
      )
    }
    return (
      <TouchableWithoutFeedback onPress={this.handlePress}>
        <Animated.View style={[styleSelected, {
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "#f6e7ff",
          borderRadius: 5,
        }]}></Animated.View>
        <Animated.View>
          <View style={styles.withDrawCard}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                style={styles.withDrawImage}
                source={this.cardLogo} />
              <View>
                <Text style={styles.withDrawText}>
                  {this.state.bankCard.number}
                </Text>
              </View>
            </View>
            <View style={{ alignItems: "flex-end", marginVertical: 4 }}>
              {deleteBox}
            </View>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  withDrawCard: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  withDrawImage: {
    marginRight: 20,
    width: 46,
    height: 46
  },
  withDrawText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
