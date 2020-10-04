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

export default class Method extends Component {
  constructor(props) {
    super(props);
    this.state = {
      method: this.props.method,
    };

    this.daysNames = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
    this.allDays = [1, 2, 3, 4, 5, 6, 7];
    this.weekDays = [1, 2, 3, 4, 5];
    this.now = new Date();
    this._animateSelected = new Animated.Value(0);
  }

  componentDidUpdate() {
    Animated.timing(this._animateSelected, {
      toValue: this.state.method.isSelected ? 1 : 0,
      duration: 200,
    }).start();
  }
  handlePress = () => {
    if (this.state.method.active === true) {
      this.props.onPress()
    }
  }

  setActivity = () => {
    this.state.method.active = false;
    this.state.method.isAllDays = 1;
    this.state.method.isWeekDays = 0;
    this.state.method.isFullDay = 0;
    let methodStartDate = new Date();
    let methodEndDate = new Date();

    let currDay = this.now.getDay();
    if (currDay === 0) {
      currDay = 7;
    }
    let inDay = this.state.method.days.indexOf(currDay) !== -1 ? true : false;
    let startTime = this.state.method.start_time.split(":");
    let endTime = this.state.method.end_time.split(":");

    if (this.state.method.start_time === this.state.method.end_time) {
      this.state.method.isFullDay = 1;
    }

    startTime[0] = parseInt(startTime[0]);
    startTime[1] = parseInt(startTime[1]);
    endTime[0] = parseInt(endTime[0]);
    endTime[1] = parseInt(endTime[1]);

    methodStartDate.setHours(startTime[0]);
    methodStartDate.setMinutes(startTime[1]);
    methodEndDate.setHours(endTime[0]);
    methodEndDate.setMinutes(endTime[1]);

    this.allDays.map((day) => {
      if (this.state.method.days.indexOf(day) === -1) {
        this.state.method.isAllDays = 0;
      }
    });

    if (this.state.method.isAllDays === 0) {
      this.state.method.isWeekDays = 1;
      this.weekDays.map((day) => {
        if (this.state.method.days.indexOf(day) === -1) {
          this.state.method.isWeekDays = 0;
        }
      });
      let additionalDay = "";
      if (this.state.method.days.indexOf(6) !== -1) {
        additionalDay = this.daysNames[5];
      }
      if (this.state.method.days.indexOf(7) !== -1) {
        additionalDay = this.daysNames[6];
      }
      let add = additionalDay !== "" ? ", " + additionalDay : "";
      this.state.method.weekDays =
        this.daysNames[0] + " - " + this.daysNames[4] + add;
    }

    if (inDay === true) {
      if (this.state.method.isFullDay === 1) {
        this.state.method.active = true;
      } else {
        if (
          this.now.getTime() > methodStartDate.getTime() &&
          this.now.getTime() < methodEndDate.getTime()
        ) {
          this.state.method.active = true;
        }
      }
    }
  };

  render() {
    let i = 0;
    this.setActivity(this.state.method);
    let methodStyleSelected = {
      position: "absolute",
      width: "100%",
      height: "100%",
      backgroundColor: "#ebf5d0",
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
      borderRadius: 5,
    };
    return (
      <TouchableWithoutFeedback onPress={this.handlePress}>
        <Animated.View style={methodStyleSelected}></Animated.View>
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
                source={require("../assets/taxiAppLogo.png")}
              />
              <View>
                <Text style={styles.withDrawText}>
                  {this.state.method.name}
                </Text>
              </View>
            </View>
            <View style={{ alignItems: "flex-end", marginVertical: 4 }}>
              <View
                style={{
                  alignItems: "flex-end",
                  marginTop: 3,
                  paddingVertical: 2,
                  paddingHorizontal: 10,
                  borderRadius: 5,
                  backgroundColor: this.state.method.active
                    ? "#bbf224"
                    : "#f24a24",
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: this.state.method.active ? "black" : "white",
                  }}
                >
                  {this.state.method.active ? "Доступен" : "Недоступен"}
                </Text>
              </View>
              <Text style={{ fontSize: 10, color: "#7f7f7f", marginTop: 4 }}>
                {this.state.method.isAllDays === 1
                  ? "Каждый день"
                  : this.state.method.isWeekDays === 1
                    ? this.state.method.weekDays
                    : this.state.method.days.map((day) => {
                      i++;
                      let divider = "";
                      if (i !== 1) {
                        divider = ",";
                      }
                      return divider + this.daysNames[day - 1];
                    })}
              </Text>
              <Text style={{ fontSize: 10, color: "#7f7f7f" }}>
                {this.state.method.isFullDay === 1 ? 'Круглосуточно' : this.state.method.start_time + ' - ' + this.state.method.end_time}
              </Text>
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
  },
  withDrawImage: {
    marginRight: 20,
    width: 40,
    height: 40
  },
  withDrawText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
