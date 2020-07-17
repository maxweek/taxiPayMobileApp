import React, { Component } from "react";
import { StyleSheet, Text, View, Button, Animated, Dimensions } from "react-native";
import MyButton from "../components/myButton";
import FloatingLabelInput from "../components/floatingLabelInput";

export default class RecoveryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneValue: "",
      code: "",
      showCodeInput: false,
      step: 1
    };
    this._animatedCodeInput = new Animated.Value(0);
  }
  componentDidMount() {
    this.setState({
      phoneValue: "",
      code: "",
      showCodeInput: false
    });
  }
  componentDidUpdate() {
    Animated.timing(this._animatedCodeInput, {
      toValue: this.state.showCodeInput ? 1 : 0,
      duration: 200,
    }).start();
  }
  handlePhoneChange = (newText) => {
    this.setState({ phoneValue: newText });
  };
  handleCodeChange = (newText) => {
    console.log(newText);
    this.setState({ code: newText });
  };
  onPress = () => {
    if(this.state.step === 1){
      this.setState({
        showCodeInput: true,
        step: 2,
      })
    }
    if(this.state.step === 2){
      this.props.navigation.goBack();
    }
  }
  render() {
    const verificateCodeStyleBox = {
      width: Dimensions.get('window').width - 20,
      padding: 0,
      margin: 0,
      marginVertical: this._animatedCodeInput.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 5],
      }),
      height: this._animatedCodeInput.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 80],
      }),
      overflow: "hidden"
    }
    const verificateCodeStyleBoxInner = {
      width: Dimensions.get('window').width - 40,
      padding: 0,
      margin: 0,
    }
    return (
      <View style={styles.container}>
        <View style={styles.inner}>
          <Text style={styles.title}>Восстановление пароля</Text>
          <FloatingLabelInput
            label="Телефон"
            value={this.state.phoneValue}
            onChangeText={this.handlePhoneChange}
            mask="+7(999)999-99-99"
            maskType="custom"
            autoCompleteType="tel"
            keyboardType="phone-pad"
          />
          <Animated.View style={verificateCodeStyleBox}>

            <View style={verificateCodeStyleBoxInner}>
              <FloatingLabelInput
                label="Код подтверждения"
                value={this.state.code}
                onChangeText={this.handleCodeChange}
                mask="999-999"
                maskType="custom"
                autoCompleteType="tel"
                keyboardType="phone-pad"
              />
            </View>
          </Animated.View>
          <MyButton
            onPress={this.onPress}
            title={this.state.step !== 2 ? "Запросить" : "Отправить"}
            classType="primary"
            withLoading="true"
            status={this.state.phoneValue != "" ? "active" : "disabled"}
          />
          <MyButton
            onPress={() => {
              this.props.navigation.goBack();
            }}
            title="Отменить"
            status="active"
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: "100%",
    minHeight: "100%",
    minHeight: 600,
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
  },
  inner: {
    marginTop: "14%",
    alignItems: "center",
    height: "100%",
    padding: 20,
  },

  title: {
    marginTop: 39,
    fontSize: 27,
    marginBottom: 30,
  },
  btnBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  copyright: {
    color: "#e0e0e0",
    position: "absolute",
    bottom: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
  },
});
