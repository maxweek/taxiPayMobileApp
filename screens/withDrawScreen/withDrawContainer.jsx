import React, { Component } from "react";
import {
  setUserMoneyToPayValue,
  setUserMoneyToPayValueRaw,
  setUserCardNumberValue,
  setUserCardNumberValueRaw,
  setUserSelectedPayMethod,
  setUserStoreBankCard,
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
        item={this.props.route.params.item}
        moneyToPay={this.props.moneyToPay}
        cardNumber={this.props.cardNumber}
        storeBankCard={this.props.storeBankCard}
        setUserMoneyToPayValue={this.props.setUserMoneyToPayValue}
        setUserMoneyToPayValueRaw={this.props.setUserMoneyToPayValueRaw}
        setUserCardNumberValue={this.props.setUserCardNumberValue}
        setUserCardNumberValueRaw={this.props.setUserCardNumberValueRaw}
        setUserSelectedPayMethod={this.props.setUserSelectedPayMethod}
        setUserSelectedBankCard={this.props.setUserSelectedBankCard}
        setUserStoreBankCard={this.props.setUserStoreBankCard}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    moneyToPay: state.user.info.moneyToPay,
    cardNumber: state.user.info.cardNumber,
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
  setUserSelectedBankCard
};

export default connect(mapStateToProps, mapDispatchToProps)(WithDrawContainer);
