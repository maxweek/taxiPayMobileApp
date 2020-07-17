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

export default class ConfirmScreen extends Component {
  constructor(props) {
    super(props);

    this.state = this.props.state;
    this.cardLogo = "";
    switch (this.state.user.info.account.aggregator.id) {
      case 1:
        this.cardLogo = require("../../assets/yandexLogo.png");
        break;
      case 2:
        this.cardLogo = require("../../assets/citimobilLogo.png");
        break;
      case 3:
        this.cardLogo = require("../../assets/uberLogo.png");
        break;
      case 4:
        this.cardLogo = require("../../assets/gettaxiLogo.png");
        break;
      default:
        this.cardLogo = require("../../assets/taxiAppLogo.png");
        break;
    }
    let i = 0;
    this.cardNumberFormatted = this.state.user.info.cardNumber;
    for (let char of this.cardNumberFormatted) {
      i++;
      if (i === 4) {
        char = char + " ";
        i = 0;
      }
    }
  }

  onPress = () => {
    let type = true;
    if (type) {
      this.props.navigation.navigate("Список аккаунтов", {
        status: {
          type: 1,
          endSumm: this.getEndSummToPay(),
          showModal: true,
          showModalInner: true,
          showed: false
        }
      });
    } else {
      this.props.navigation.navigate("Список аккаунтов", {
        status: {
          type: 2,
          endSumm: this.getEndSummToPay(),
          showModal: true,
          showModalInner: true,
          showed: false
          // TODO kek
        }
      });
    }
  };
  getComission = () => {
    return (
      (this.state.user.info.moneyToPayRaw *
        parseInt(this.state.user.info.selectedMethod.commission)) /
      100
    );
  };
  getEndSummToPay = () => {
    return (
      this.state.user.info.moneyToPayRaw -
      this.getComission() -
      this.state.user.info.selectedMethod.fixed_commission
    );
  };
  render() {
    let commissionBox = "";
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
        </View>
      );
    }
    return (
      <ScrollView
        contentContainerStyle={{ paddingTop: 50, paddingBottom: 300 }}
        style={{ flex: 1 }}
      >
        <View style={styles.pageHeaderBox}>
          <Text style={styles.pageHeader}>
            {this.state.user.info.account.aggregator.name}
          </Text>
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
              <Text
                style={{ width: "100%", textAlign: "center", marginBottom: 7 }}
              >
                Не выбран способ оплаты
              </Text>
            )}
        </View>

        <View style={styles.module}>
          <View style={styles.moduleHeaderBox}>
            <AlertBox status={this.cardNumberFormatted !== '' ? true : false} />
            <Text style={styles.moduleHeader}>Номер карты</Text>
          </View>
          <Text style={{ fontSize: 20, textAlign: "right" }}>
            {this.cardNumberFormatted !== '' ? this.cardNumberFormatted : 'Номер не указан'}
          </Text>
        </View>
        <View style={styles.module}>
          <View style={styles.moduleHeaderBox}>
            <AlertBox status={this.state.user.info.selectedMethod !== '' ? true : false} />
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
            <Text style={{ marginBottom: 3 }}>Итого:</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              <Text style={styles.balanceBoxTextEnd}>
                {this.getEndSummToPay()}
              </Text>
              <Text style={styles.balanceBoxExtEnd}>₽</Text>
            </View>
          </View>
        </View>
        <View style={{ margin: 20 }}>
          <MyButton
            title="Подтвердить"
            classType="primary"
            withLoading="true"
            status="active"
            onPress={this.onPress}
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
