import React, { Component } from "react";
import { StyleSheet, Text, View, Button, Animated, Dimensions } from "react-native";
import MyButton from "../components/myButton";
import FloatingLabelInput from "../components/floatingLabelInput";
import API, { API_USER_RECOVERY_CHECK, API_USER_RECOVERY_SET } from "../API";

export default class RecoveryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneValue: "",
      code: "",
      newPass: "",
      showCodeInput: false,
      step: 1,
      status: null,
      message: '',
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
  handlePassChange = (newText) => {
    console.log(newText);
    this.setState({ newPass: newText });
  };
  onPress = () => {
    if (this.state.step === 1) {
      let formData = new FormData();
      formData.append('telephone', this.state.phoneValue)
      API.post(API_USER_RECOVERY_CHECK, formData).then(res => {
        console.log(res.data)
        if (res.data.type === 'success') {
          this.setState({
            showCodeInput: true,
            step: 2,
            status: true,
            message: res.data.message
          })
        }
        if (res.data.type === 'error') {
          this.setState({
            showCodeInput: true,
            step: 2,
            status: false,
            message: res.data.message
          })
        }
      })

    }
    if (this.state.step === 2) {
      if (this.state.newPass.length < 8) {
        this.setState({
          status: false,
          message: 'Пароль должен быть больше 8 символов'
        })
      } else {
        let formData = new FormData();
        formData.append('telephone', this.state.phoneValue)
        formData.append('code', this.state.code)
        formData.append('password', this.state.newPass)
        API.post(API_USER_RECOVERY_SET, formData).then(res => {
          console.log(res.data)
          if (res.data.type === 'success') {
            this.setState({
              showCodeInput: false,
              step: 0,
              status: true,
              message: res.data.message
            })
            setTimeout(() => {
              this.props.navigation.goBack();
            }, 5000)
          }
          if (res.data.type === 'error') {
            this.setState({
              status: false,
              message: res.data.message
            })
          }
        })

        // this.props.navigation.goBack();
      }
    }
    if(this.state.step === 0) {
      this.props.navigation.goBack();
    }
  }
  render() {
    const verificateCodeStyleBox = {
      width: Dimensions.get('window').width - 20,
      padding: 0,
      margin: 0,
      marginVertical: this._animatedCodeInput.interpolate({
        inputRange: [0, 0],
        outputRange: [0, 0],
      }),
      height: this._animatedCodeInput.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 70],
      }),
      overflow: "hidden"
    }
    const verificateCodeStyleBoxInner = {
      width: Dimensions.get('window').width - 40,
      padding: 0,
      margin: 0,
    }
    const statusBarBox = {
      backgroundColor: this.state.status ? "#bbf224" : '#f24a24',
      paddingVertical: 2,
      paddingHorizontal: 10,
      borderRadius: 5,
      opacity: this.state.status !== null ? 1 : 0,
      marginBottom: 10,
    };
    const statusBarText = {
      color: this.state.status ? 'black' : 'white',
    }
    return (
      <View style={styles.container}>
        <View style={styles.inner}>
          <Text style={styles.title}>Восстановление пароля</Text>
          <View style={statusBarBox}>
            <Text style={statusBarText}>{this.state.message}</Text>
          </View>
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
                mask="9999"
                maskType="custom"
                autoCompleteType="tel"
                keyboardType="phone-pad"
              />
            </View>
          </Animated.View>
          <Animated.View style={verificateCodeStyleBox}>
            <View style={verificateCodeStyleBoxInner}>
              <FloatingLabelInput
                label="Новый пароль"
                value={this.state.newPass}
                onChangeText={this.handlePassChange}
                keyboardType="default"
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
    marginTop: "4%",
    alignItems: "center",
    height: "100%",
    padding: 20,
  },
  title: {
    marginTop: 39,
    fontSize: 27,
    marginBottom: 10,
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
