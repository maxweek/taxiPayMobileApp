import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, Image, RefreshControl } from "react-native";
import {
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import FloatingLabelInput from "../../components/floatingLabelInput";
import MyButton from "../../components/myButton";
import Animated from "react-native-reanimated";
import Method from "../../components/method";
import API, { API_GET_METHODS } from "../../API";

export default class WithDrawScreen extends Component {
  constructor(props) {
    super(props);
    this.setUserSelectedPayMethod = this.props.setUserSelectedPayMethod.bind(this);

    this.item = this.props.item;
    this.state = {
      refreshing: false,
      selectedMethod: null,
      methods: [],
      continueButtonStatus: 'disabled',
      balanceBoxStatus: true,
      moneyToPayValue: this.props.moneyToPay
    };
    this.cardLogo = "";
    switch (this.item.aggregator.type) {
      case 1:
        this.cardLogo = require("../../assets/yandexLogo.png");
        break;
      // case 2:
      //   this.cardLogo = require("../../assets/citimobilLogo.png");
      //   break;
      // case 3:
      //   this.cardLogo = require("../../assets/uberLogo.png");
      //   break;
      // case 4:
      //   this.cardLogo = require("../../assets/gettaxiLogo.png");
      //   break;
      default:
        this.cardLogo = require("../../assets/taxiAppLogo.png");
        break;
    }
  }

  refresh = () => {
    this.setState({ refreshing: true, methods: [], selectedMethod: null });

    API.get(API_GET_METHODS + '/' + this.item.id).then(res => {
      console.log(res.data)
      this.setState({ refreshing: false, methods: res.data })
    });
  };

  componentDidMount() {
    this.refresh();
    this.checkContinueButtonStatus()
  }

  setUserMoneyToPayValue = (newText) => {
    this.props.setUserMoneyToPayValue(newText);
    this.setState({ moneyToPayValue: newText },
      () => { this.checkContinueButtonStatus() });
  };
  setUserCardNumberValue = (newText) => {
    this.props.setUserCardNumberValue(newText);
    this.checkContinueButtonStatus();
  };
  setUserMoneyToPayValueRaw = (newText) => {
    this.props.setUserMoneyToPayValueRaw(newText);
  };
  setUserCardNumberValueRaw = (newText) => {
    this.props.setUserCardNumberValueRaw(newText);
  };

  onMethodSelect = (id) => {
    let methods = [...this.state.methods];

    let selectedMethodInArr = methods.filter((method) => method.type === id)[0];
    let nonSelectedMethodInArr = methods.filter((method) => method.type !== id);

    selectedMethodInArr.isSelected = true;
    nonSelectedMethodInArr.map((method) => {
      method.isSelected = false;
    });

    this.setState({ methods: methods });
    this.setState({ selectedMethod: selectedMethodInArr }, () => {
      this.checkContinueButtonStatus();
    });
    this.props.setUserSelectedPayMethod(selectedMethodInArr);
  };

  checkContinueButtonStatus = () => {
    if (this.state.moneyToPayValue < this.item.balance) {
      this.setState({ balanceBoxStatus: "" })
      if (this.state.selectedMethod !== null) {
        if (this.props.moneyToPay !== '') {
          if (this.props.cardNumber !== '') {
            this.setState({ continueButtonStatus: "active" })
          } else {
            this.setState({ continueButtonStatus: "disabled" })
          }
        } else {
          this.setState({ continueButtonStatus: "disabled" })
        }
      } else {
        this.setState({ continueButtonStatus: "disabled" })
      }
    } else {
      this.setState({ continueButtonStatus: "disabled", balanceBoxStatus: "Сумма не должна превышать ваш текущий баланс" })
    }
  }

  render() {
    let commissionBox = "";
    let cardNumberLabel = null;
    if (this.state.selectedMethod === null) {
      commissionBox = (
        <Text style={{ width: "100%", textAlign: "center" }}>
          Не выбран способ оплаты
        </Text>
      );
    } else {
      commissionBox = (
        <View style={styles.commissionBoxText}>
          <View
            style={{ justifyContent: "space-between", flexDirection: "row" }}
          >
            <Text style={styles.commissionText}>
              Комиссия: {this.state.selectedMethod.commission} %
            </Text>
            <Text style={styles.commissionText}>
              Фикс. комиссия: {this.state.selectedMethod.fixed_commission} ₽
            </Text>
          </View>
          <View>
            <View style={styles.comissionLine}>
              <Text style={styles.commissionText}>
                Мин. выплата: {this.state.selectedMethod.min_payout} ₽
              </Text>
            </View>
            <View style={styles.comissionLine}>
              <Text style={styles.commissionText}>
                Макс. выплата: {this.state.selectedMethod.max_payout} ₽
              </Text>
            </View>
            <View style={styles.comissionLine}>
              <Text style={styles.commissionText}>
                Мин. остаток: {this.state.selectedMethod.min_residue} ₽
              </Text>
            </View>
          </View>
        </View>
      );
      cardNumberLabel = (
        <View style={styles.moduleWithInput}>
          <FloatingLabelInput
            maskType="custom"
            mask={this.state.selectedMethod.mask}
            label={this.state.selectedMethod.label}
            value={this.props.cardNumber}
            keyboardType="numeric"
            onChangeText={this.setUserCardNumberValue}
            onChangeTextRaw={this.setUserCardNumberValueRaw}
          />
        </View>
      )
    }
    return (
      <ScrollView
        contentContainerStyle={{ paddingTop: 50, paddingBottom: 300 }}
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.refresh}
          />
        }
      >
        <View style={styles.pageHeaderBox}>
          <Text style={styles.pageHeader}>{this.item.aggregator.name}</Text>
          <Image style={styles.pageHeaderImage} source={this.cardLogo} />
        </View>

        <View style={styles.module}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <Text style={styles.balanceBoxText}>{this.item.balance}</Text>
            <Text style={styles.balanceBoxExt}>₽</Text>
          </View>
        </View>
        <View style={styles.module}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text>{this.item.name}</Text>
          </View>
        </View>
        <View style={styles.moduleWithDraw}>
          <View style={styles.moduleHeaderWithDrawBox}>
            <Text style={styles.moduleHeaderWithDraw}>Способы вывода</Text>
          </View>
          {this.state.methods.map((method) => (
            <Method
              method={method}
              key={method.type}
              onPress={() => this.onMethodSelect(method.type)}
            />
          ))}
        </View>
        <View style={styles.moduleWithInput}>
          <FloatingLabelInput
            maskType="money"
            maskTypeOptions={{
              precision: 0,
              separator: ' ',
              delimiter: ' ',
              unit: '',
              suffixUnit: ''
            }}
            label="Сумма вывода"
            value={this.props.moneyToPay}
            onChangeText={this.setUserMoneyToPayValue}
            onChangeTextRaw={this.setUserMoneyToPayValueRaw}
            keyboardType="numeric"
          />
          <Text style={styles.balanceBoxStatusStyle}>{this.state.balanceBoxStatus}</Text>
        </View>
        <View style={styles.module}>
          <View style={styles.moduleHeaderBox}>
            <Text style={styles.moduleHeader}>Комиссия</Text>
          </View>
          {commissionBox}
        </View>
        {cardNumberLabel}
        <View style={{ margin: 20 }}>
          <MyButton
            title="Продолжить"
            classType="primary"
            withLoading="true"
            status="active"
            onPress={() => this.props.navigation.navigate('Подтверждение')}
          />
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  pageHeaderBox: {
    position: "relative",
  },
  pageHeader: {
    fontSize: 30,
    fontWeight: "300",
    padding: 10,
    textAlign: "right",
    position: "relative",
    zIndex: 20,
  },
  pageHeaderImage: {
    position: "absolute",
    width: 170,
    height: 170,
    top: -32,
    right: -20,
    opacity: 0.2,
  },
  module: {
    width: Dimensions.get("window").width - 20,
    margin: 10,
    backgroundColor: "white",
    marginHorizontal: 10,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 17,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  moduleWithDraw: {
    width: Dimensions.get("window").width - 20,
    margin: 10,
    backgroundColor: "white",
    marginHorizontal: 10,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 7,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  moduleWithInput: {
    width: Dimensions.get("window").width - 40,
    marginHorizontal: 20,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  moduleHeader: {
    fontWeight: "600",
    fontSize: 16,
    textAlign: "right",
    width: "100%",
  },
  moduleHeaderWithDraw: {
    fontWeight: "600",
    fontSize: 16,
    textAlign: "right",
  },
  moduleHeaderWithDrawBox: {
    marginTop: 6,
    marginBottom: 10,
    paddingBottom: 12,
    marginHorizontal: 10,
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
    borderStyle: "solid",
  },
  moduleHeaderBox: {
    marginTop: 0,
    marginBottom: 10,
    paddingBottom: 12,
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
    borderStyle: "solid",
  },
  balanceBoxText: {
    fontSize: 50,
    fontWeight: "300",
  },
  balanceBoxExt: {
    fontSize: 22,
    color: "#7f7f7f",
    marginBottom: 6,
    marginLeft: 4,
  },
  commissionBoxText: {},
  commissionText: {
    color: "#7f7f7f",
    fontSize: 12,
  },
  comissionLine: {
    width: "100%",
    borderTopColor: "#ededed",
    borderTopWidth: 1,
    borderStyle: "solid",
    marginTop: 4,
    paddingTop: 4,
  },
  balanceBoxStatusStyle: {
    fontSize: 12,
    color: "#f22424",
    height: 14
  }
});
