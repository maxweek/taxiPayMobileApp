import React, { Component } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  View,
  Animated,
  Button,
  Image,
  StyleSheet, Linking, Alert
} from "react-native";
import FloatingLabelInput from "../../components/floatingLabelInput";
import MyButton from "../../components/myButton";
import API, { API_USER_LOGIN, API_CHECK, apiSetSID } from "../../API";
import { expo } from "../../app.json";
import WebView from "react-native-webview";
import InAppBrowser from "react-native-inappbrowser-reborn";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: "",
      notification: "Жопа",
      notificationVisible: false,
      notificationColor: "#bbf224"
    };
    this._animatedNotification = new Animated.Value(0);
    this.setUserUsernameValue = this.props.setUserUsernameValue.bind(this);
    this.setUserPasswordValue = this.props.setUserPasswordValue.bind(this);
    this.props.setUserLoadingOff();
  }

  handleUsernameChange = (newText) => {
    this.props.setUserUsernameValue(newText);
  };
  handlePasswordChange = (newText) => {
    this.props.setUserPasswordValue(newText);
  };
  handleUserLoggedIn = () => {

    const formData = new FormData();
    formData.append('telephone', this.props.username);
    formData.append('password', this.props.password);

    API.post(API_USER_LOGIN, formData)
      .then(res => {
        console.log(res)
        if (typeof res.data['sid'] !== "undefined") {
          this.setState({ notification: 'Успешно', notificationColor: '#bbf224', notificationVisible: true })
          apiSetSID(res.data.sid);
          this.props.setUserLoggedIn();
        } else {
          this.setState({ notification: 'Данные не верны', notificationColor: '#f22424', notificationVisible: true })
        }
        setTimeout(() => {
          this.setState({ notificationVisible: false })
        }, 3000)
      })
  };
  componentDidUpdate() {
    Animated.timing(this._animatedNotification, {
      toValue: this.state.notificationVisible ? 1 : 0,
      duration: 200,
    }).start();
  }
  render() {
    const notificationBox = {
      backgroundColor: this.state.notificationColor,
      borderRadius: 4,
      opacity: this._animatedNotification.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
      paddingHorizontal: 6,
      paddingVertical: 2
    }
    const notificationText = {
      color: this._animatedNotification.interpolate({
        inputRange: [0, 1],
        outputRange: ["black", "white"],
      }),
    }
    return (
      <View style={styles.container}>
        <View style={styles.inner}>
          <Image
            style={styles.imageLogo}
            source={require("../../assets/taxiAppLogo_coloredMin.png")}
          />
          {/* <Text style={styles.title}>Вход</Text> */}
          <Animated.View style={notificationBox}>
            <Animated.Text style={notificationText}>{this.state.notification}</Animated.Text>
          </Animated.View>
          <FloatingLabelInput
            mask="+7(999)999-99-99"
            maskType="custom"
            label="Телефон"
            value={this.props.username}
            onChangeText={this.handleUsernameChange}
            autoCompleteType="tel"
            keyboardType="phone-pad"
          />
          <FloatingLabelInput
            label="Пароль"
            value={this.props.password}
            onChangeText={this.handlePasswordChange}
            autoCorrect={false}
            secureTextEntry={true}
          />

          <View style={styles.btnBox}>
            <MyButton
              onPress={this.handleUserLoggedIn}
              title="Вход"
              classType="primary"
              withLoading="true"
              status={
                this.props.username != "" && this.props.password != ""
                  ? "active"
                  : "disabled"
              }
            />
            <MyButton
              title="Забыл пароль"
              status="active"
              onPress={() => {
                this.props.navigation.navigate("Получить пароль");
              }}
            />
          </View>
          <View style={styles.btnBoxRegister}>
            <MyButton
              title="Регистрация"
              classType="primary"
              status="active"
              style={{ width: '100%' }}
              onPress={() => {
                this.props.navigation.navigate("Получить пароль");
              }}
            />
          </View>
        </View>
        <View style={styles.copyright}>
          <Text style={styles.act}>Продолжая пользоваться данным приложением я соглашаюсь с <Text style={{ color: '#656565', textDecorationLine: 'underline', }} onPress={() => {
            this.props.navigation.navigate("Договор");
          }}>
            договором</Text>.</Text>
          <Text style={styles.version}>v. {expo.version}</Text>
          <Text style={styles.copyrightText}>drivermoney.online</Text>
          {/* <Text style={styles.copyrightText}>Powered by Maxim Nedelko</Text> */}
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

  imageLogo: {
    width: 220,
    height: 66,
    marginBottom: 5,
  },
  title: {
    fontSize: 27,
  },
  btnBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  btnBoxRegister: {
    display: 'flex',
    width: "100%",
    marginTop: 30
  },
  copyright: {
    position: "absolute",
    bottom: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
  },
  imageCopyright: {
    width: 220,
    marginBottom: 5
  },
  version: {
    color: "#e0e0e0"
  },
  copyrightText: {
    color: "#e0e0e0"
  },
  act: {
    color: "#b5b5b5",
    textAlign: 'center',
    marginBottom: 5
  }
});
