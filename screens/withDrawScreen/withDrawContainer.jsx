import React, { Component } from "react";
import {
  setUserMoneyToPayValue,
  setUserMoneyToPayValueRaw,
  setUserCardNumberValue,
  setUserCardNumberValueRaw,
  setUserSelectedPayMethod,
  setUserStoreBankCard,
  setUserForcePay,
  setUserSelectedBankCard,
} from "../../store/user/actions";
import { connect } from "react-redux";
import WithDrawScreen from "./WithDrawScreen";

class WithDrawContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <WithDrawScreen
        navigation={this.props.navigation}
        route={this.props.route}
        item={this.props.route.params.item}
        moneyToPay={this.props.moneyToPay}
        moneyToPayRaw={this.props.moneyToPayRaw}
        forcePay={this.props.forcePay}
        cardNumber={this.props.cardNumber}
        storeBankCard={this.props.storeBankCard}
        setUserMoneyToPayValue={this.props.setUserMoneyToPayValue}
        setUserMoneyToPayValueRaw={this.props.setUserMoneyToPayValueRaw}
        setUserCardNumberValue={this.props.setUserCardNumberValue}
        setUserCardNumberValueRaw={this.props.setUserCardNumberValueRaw}
        setUserSelectedPayMethod={this.props.setUserSelectedPayMethod}
        setUserSelectedBankCard={this.props.setUserSelectedBankCard}
        setUserForcePay={this.props.setUserForcePay}
        setUserStoreBankCard={this.props.setUserStoreBankCard}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    moneyToPay: state.user.info.moneyToPay,
    moneyToPayRaw: state.user.info.moneyToPayRaw,
    cardNumber: state.user.info.cardNumber,
    forcePay: state.user.info.forcePay,
    storeBankCard: state.user.info.storeBankCard,
  };
};

const mapDispatchToProps = {
  setUserMoneyToPayValue,
  setUserMoneyToPayValueRaw,
  setUserCardNumberValue,
  setUserCardNumberValueRaw,
  setUserSelectedPayMethod,
  setUserStoreBankCard,
  setUserSelectedBankCard,
  setUserForcePay
};

export default connect(mapStateToProps, mapDispatchToProps)(WithDrawContainer);
