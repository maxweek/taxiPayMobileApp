import React, { Component } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  View,
  Animated,
  Button,
  Image,
  StyleSheet,
} from "react-native";
import FloatingLabelInput from "../../components/floatingLabelInput";
import MyButton from "../../components/myButton";
import API, { API_USER_LOGIN, API_CHECK, apiSetSID } from "../../API";

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
    // fetch('http://127.0.0.1:8000/blabla').then(res => res.json()).then(res => console.log(res));
    //   fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
    // .then(response => response.json())
    // .then(commits => alert(commits[0].author.login));

    // var formData = new FormData();
    // formData.append('telephone', '89288254353');
    // formData.append('password', '2602630604');

    // fetch('http://cp.taxipay.antonov.site/api/login/driver', { 
    //   method: 'POST',
    //   body: formData
    // })
    // .then((res) => res.text())
    // .then((res) => console.log(res))
    // .catch((res) => console.log(res));

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
      .catch((res) => {
        console.log(res);
      });
    // 
    setTimeout(() => {
    }, 2000);
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
            source={require("../../assets/taxiAppLogo.png")}
          />
          <Text style={styles.title}>Вход</Text>
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
                this.props.navigation.navigate("Восстановление пароля");
              }}
            />
          </View>
        </View>
        <View style={styles.copyright}>
          <Text style={{ color: "#e0e0e0" }}>Powered by Maxim Nedelko</Text>
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
    width: 64,
    height: 64,
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
  copyright: {
    position: "absolute",
    bottom: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
  },
  copyrightText: {},
});
