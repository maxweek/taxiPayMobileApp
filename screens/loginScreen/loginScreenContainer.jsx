import React, { Component } from "react";
import {
  setUserUsernameValue,
  setUserPasswordValue,
  setUserLoggedIn,
  setUserLoadingOn,
  setUserLoadingOff,
  setUserNativeToken
} from "../../store/user/actions";
import { connect } from "react-redux";
import LoginScreen from "./loginScreen";

class LoginScreenContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <LoginScreen
        navigation={this.props.navigation}
        username={this.props.username}
        password={this.props.password}
        setUserUsernameValue={this.props.setUserUsernameValue}
        setUserPasswordValue={this.props.setUserPasswordValue}
        setUserLoggedIn={this.props.setUserLoggedIn}
        setUserLoadingOn={this.props.setUserLoadingOn}
        setUserLoadingOff={this.props.setUserLoadingOff}
        setUserNativeToken={this.props.setUserNativeToken}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.user.username,
    password: state.user.password,
  };
};

const mapDispatchToProps = {
  setUserUsernameValue,
  setUserPasswordValue,
  setUserLoggedIn,
  setUserLoadingOn,
  setUserLoadingOff,
  setUserNativeToken,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreenContainer);
