import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  RefreshControl,
} from "react-native";
import {
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import FloatingLabelInput from "../../components/floatingLabelInput";
import MyButton from "../../components/myButton";
import Animated from "react-native-reanimated";
import Method from "../../components/method";
import AlertBox from "../../components/alertBox";
import API, { API_USER_GET_MONEY } from "../../API";

export default class ConfirmScreen extends Component {
  constructor(props) {
    super(props);

    this.state = this.props.state;
    this.cardLogo = require("../../assets/taxiAppLogo_coloredMin.png");
    let i = 0;
    this.cardNumberRaw = this.state.user.info.cardNumberRaw ? this.state.user.info.cardNumberRaw : this.state.user.info.selectedBankCard.number;
    this.cardNumberFormatted = this.state.user.info.cardNumber ? this.state.user.info.cardNumber : this.state.user.info.selectedBankCard.number;
    for (let char of this.cardNumberFormatted) {
      i++;
      if (i === 4) {
        char = char + " ";
        i = 0;
      }
    }

    // switch (this.state.user.info.account.aggregator.id) {
    //   case 1:
    //     this.cardLogo = require("../../assets/yandexLogo.png");
    //     break;
    //   case 2:
    //     this.cardLogo = require("../../assets/citimobilLogo.png");
    //     break;
    //   case 3:
    //     this.cardLogo = require("../../assets/uberLogo.png");
    //     break;
    //   case 4:
    //     this.cardLogo = require("../../assets/gettaxiLogo.png");
    //     break;
    //   default:
    //     this.cardLogo = require("../../assets/taxiAppLogo.png");
    //     break;
    // }
  }
  setUserMoneyToPayValueRaw = text => {
    this.props.setUserMoneyToPayValueRaw(text);
  }
  setUserCardNumberValueRaw = text => {
    this.props.setUserCardNumberValueRaw(text);
  }
  setUserMoneyToPayValue = text => {
    this.props.setUserMoneyToPayValue(text);
  }
  setUserCardNumberValue = text => {
    this.props.setUserCardNumberValue(text);
  }

  onPress = () => {
    let request = this.sendRequest();
    request.then(res => {
      console.log(res.data)
      if (res.data.type === 'success') {
        this.props.navigation.navigate("Список аккаунтов", {
          status: {
            type: 1,
            endSumm: this.getEndSummToPay(),
            showModal: true,
            showModalInner: true,
            showed: false,
            message: res.data.message
          }
        });
        this.setUserMoneyToPayValueRaw('')
        this.setUserCardNumberValueRaw('')
        this.setUserMoneyToPayValue('')
        this.setUserCardNumberValue('')
      }
      if (res.data.type === 'error') {
        this.props.navigation.navigate("Список аккаунтов", {
          status: {
            type: 2,
            endSumm: this.getEndSummToPay(),
            showModal: true,
            showModalInner: true,
            showed: false,
            message: res.data.message
          }
        });
      }
    });
  };
  sendRequest = () => {
    const formData = new FormData();
    formData.append('create_form[amount]', this.state.user.info.moneyToPayRaw)
    formData.append('create_form[type]', this.state.user.info.selectedMethod.type)
    formData.append('create_form[card]', this.cardNumberRaw)
    if (!this.state.user.info.selectedMethod.has_storage && this.state.user.info.cardNumber !== '') {
      formData.append('create_form[saveCard]', this.state.user.info.storeBankCard)
    }

    return API.post(API_USER_GET_MONEY + '/' + this.state.user.info.account.id, formData);
  }
  getComission = () => {
    return (
      (this.state.user.info.moneyToPayRaw *
        parseInt(this.state.user.info.selectedMethod.commission)) /
      100
    );
  };
  getEndSummToPay = () => {
    let summ = (
      this.state.user.info.moneyToPayRaw +
      this.getComission() +
      this.state.user.info.selectedMethod.fixed_commission
    );
    summ = Math.ceil(summ * 100) / 100
    return summ;
  };
  render() {
    let edge = {
      down: this.state.user.info.selectedMethod.min_payout === 0 ? true : (this.state.user.info.selectedMethod.min_payout <= this.state.user.info.moneyToPayRaw ? true : false),
      up: this.state.user.info.selectedMethod.max_payout === 0 ? true : (this.state.user.info.selectedMethod.max_payout >= this.state.user.info.moneyToPayRaw ? true : false),
    }
    let isErrorMin = {
      color: edge.down ? '#8ebd0c' : '#f24a24'
    }
    let isErrorMax = {
      color: edge.up ? '#8ebd0c' : '#f24a24'
    }
    let commissionBox = "";
    let buttonBox = "";
    if (this.state.user.info.selectedMethod === "") {
      commissionBox = (
        <Text style={{ width: "100%", textAlign: "center" }}>
          Не выбран способ оплаты
        </Text>
      );
    } else {
      commissionBox = (
        <View style={styles.commissionBoxText}>
          <View style={styles.comissionLine}>
            <Text style={styles.commissionText}>Итоговая комиссия: </Text>
            <Text>{this.getComission()} ₽</Text>
          </View>
          <View style={styles.comissionLine}>
            <Text style={styles.commissionText}>Фиксированная комиссия:</Text>
            <Text>
              {this.state.user.info.selectedMethod.fixed_commission} ₽
            </Text>
          </View>
          <View style={styles.comissionLine}>
            <Text style={[styles.commissionText, isErrorMin]}>Минимальная сумма вывода:</Text>
            <Text style={isErrorMin}>
              {this.state.user.info.selectedMethod.min_payout === 0 ? (
                'Без ограничений'
              ) : this.state.user.info.selectedMethod.min_payout + ' ₽'}
            </Text>
          </View>
          <View style={styles.comissionLine}>
            <Text style={[styles.commissionText, isErrorMax]}>Максимальная сумма вывода:</Text>
            <Text style={isErrorMax}>
              {this.state.user.info.selectedMethod.max_payout === 0 ? (
                'Без ограничений'
              ) : this.state.user.info.selectedMethod.max_payout + ' ₽'}
            </Text>
          </View>
        </View>
      );
    }
    return (
      <ScrollView
        contentContainerStyle={{ paddingTop: 50, paddingBottom: 300 }}
        style={{ flex: 1, backgroundColor: 'white' }}
      >
        <View style={styles.pageHeaderBox}>
          {/* <Text style={styles.pageHeader}>
            {this.state.user.info.account.aggregator.name}
          </Text> */}
          <Image style={styles.pageHeaderImage} source={this.cardLogo} />
        </View>
        <View style={styles.module}>
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "flex-end",
              borderBottomColor: "#dedede",
              borderBottomWidth: 1,
              borderStyle: "solid",
            }}
          >
            <Text style={{ marginBottom: 10 }}>Сумма к выводу:</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              <Text style={styles.balanceBoxText}>
                {this.state.user.info.moneyToPay}
              </Text>
              <Text style={styles.balanceBoxExt}>₽</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Text>Аккаунт:</Text>
            <Text>{this.state.user.info.account.name}</Text>
          </View>
        </View>

        <View style={styles.moduleWithDraw}>
          <View style={styles.moduleHeaderWithDrawBox}>
            <AlertBox status={this.state.user.info.selectedMethod !== '' ? true : false} />
            <Text style={styles.moduleHeaderWithDraw}>
              Выбранный способ вывода
            </Text>
          </View>
          {this.state.user.info.selectedMethod !== "" ? (
            <Method method={this.state.user.info.selectedMethod} onPress={() => false} />
          ) : (
              <Text style={{ width: "100%", textAlign: "center", marginBottom: 7 }}>
                Не выбран способ оплаты
              </Text>
            )}
        </View>

        <View style={styles.module}>
          <View style={styles.moduleHeaderBox}>
            <AlertBox status={this.cardNumberFormatted !== '' ? true : false} />
            <Text style={styles.moduleHeader}>{this.state.user.info.selectedMethod.label}</Text>
          </View>
          <Text style={{ fontSize: 20, textAlign: "right" }}>
            {this.cardNumberFormatted !== '' ? this.cardNumberFormatted : 'Номер не указан'}
          </Text>
        </View>
        <View style={styles.module}>
          <View style={styles.moduleHeaderBox}>
            <AlertBox status={
              this.state.user.info.selectedMethod !== '' ? (edge.down && edge.up ? true : false) : false} />
            <Text style={styles.moduleHeader}>Данные</Text>
          </View>
          {commissionBox}
        </View>
        <View style={styles.module}>
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "flex-end",
            }}
          >
            <Text style={{ marginBottom: 3 }}>Сумма списания:</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              <Text style={styles.balanceBoxTextEnd}>
                {!isNaN(this.getEndSummToPay()) ? this.getEndSummToPay() : 0}
              </Text>
              <Text style={styles.balanceBoxExtEnd}>₽</Text>
            </View>
          </View>
        </View>
        <View style={{ margin: 20 }}>
          <MyButton
            title={edge.down && edge.up && this.cardNumberFormatted !== '' ? "Подвердить" : "Назад"}
            classType="primary"
            withLoading="true"
            status="active"
            onPress={edge.down && edge.up && this.cardNumberFormatted !== '' ? this.onPress : () => { this.props.navigation.goBack() }}
          />
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  pageHeaderBox: {
    position: "relative",
    alignItems: 'center'
  },
  pageHeader: {
    fontSize: 30,
    fontWeight: "300",
    padding: 10,
    textAlign: "right",
    position: "relative",
    zIndex: 20,
  },
  pageHeaderImage_old: {
    position: "relative",
    width: 170,
    height: 170,
    top: -32,
    right: -20,
    opacity: 0.2,
  },
  pageHeaderImage: {
    width: 220,
    height: 66,
    marginBottom: 5,
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
    elevation: 5,
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
    elevation: 5,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  moduleHeaderBox: {
    marginTop: 0,
    marginBottom: 10,
    paddingBottom: 12,
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
    borderStyle: "solid",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  balanceBoxText: {
    fontSize: 50,
    fontWeight: "300",
  },
  balanceBoxTextEnd: {
    fontSize: 30,
    fontWeight: "300",
  },
  balanceBoxExt: {
    fontSize: 22,
    color: "#7f7f7f",
    marginBottom: 6,
    marginLeft: 4,
  },
  balanceBoxExtEnd: {
    fontSize: 16,
    color: "#7f7f7f",
    marginBottom: 3,
    marginLeft: 4,
  },
  commissionBoxText: {},
  commissionText: {
    color: "#7f7f7f",
    fontSize: 12,
  },
  comissionLine: {
    width: "100%",
    borderBottomColor: "#ededed",
    borderBottomWidth: 1,
    borderStyle: "solid",
    marginBottom: 4,
    paddingBottom: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
});
