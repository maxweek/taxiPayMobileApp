import React, { Component } from "react";
import {
  setUserMoneyToPayValue,
  setUserCardNumberValue,
  setUserSelectedPayMethod,
} from "../../store/user/actions";
import { connect } from "react-redux";
import ConfirmScreen from "./confirmScreen";

class ConfirmContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ConfirmScreen
        navigation={this.props.navigation}
        state={this.props.state}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state
  };
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmContainer);