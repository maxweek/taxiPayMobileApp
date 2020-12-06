import React, { Component } from "react";
import {
  setUserMoneyToPayValue,
  setUserCardNumberValue,
  setUserSelectedPayMethod,
  setUserMoneyToPayValueRaw,
  setUserCardNumberValueRaw,
  setUserStoreBankCard,
  setUserForcePay
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
        setUserMoneyToPayValueRaw={this.props.setUserMoneyToPayValueRaw}
        setUserCardNumberValueRaw={this.props.setUserCardNumberValueRaw}
        setUserMoneyToPayValue={this.props.setUserMoneyToPayValue}
        setUserCardNumberValue={this.props.setUserCardNumberValue}
        setUserStoreBankCard={this.props.setUserStoreBankCard}
        setUserForcePay={this.props.setUserForcePay}
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
  setUserCardNumberValueRaw,
  setUserMoneyToPayValueRaw,
  setUserMoneyToPayValue,
  setUserCardNumberValue,
  setUserStoreBankCard,
  setUserForcePay
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmContainer);
