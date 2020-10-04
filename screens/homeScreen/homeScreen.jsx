import React, { Component } from "react";
import { ScrollView, Text, View, Button, RefreshControl, StyleSheet, Dimensions, Animated } from "react-native";
import MyButton from "../../components/myButton";
import { FlatList, TouchableWithoutFeedback } from "react-native-gesture-handler";
import Card from "../../components/card";
import API, { API_GET_ACCOUNTS, apiTrashSID } from "../../API";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: true,
      items: [],
      status: {
        type: 0,
        endSumm: '',
        showModal: false,
        showModalInner: false,
        showed: false
      },

    };

    this._animatedModal = new Animated.Value(0);
  }
  
  refresh = () => {
    this.setState({ refreshing: true, items: [] });

    API.get(API_GET_ACCOUNTS).then(res => {
      console.log(res.data)
      this.setState({ refreshing: false, items: res.data })
    });
  };

  componentDidMount() {
    this.refresh();
    if (this.props.status) {
      this.setState({
        status: {
          type: this.props.status.type,
          endSumm: this.props.status.endSumm,
          showModal: this.props.status.showModal,
          showModalInner: this.props.status.showModalInner,
          message: this.props.status.message
        },
      })
      this.timeOutModal()
    }
  }
  setStatus = () => {
    this.setState({
      status: {
        type: this.props.status.type,
        endSumm: this.props.status.endSumm,
        showModal: this.props.status.showModal,
        showModalInner: this.props.status.showModalInner,
        showed: true,
        message: this.props.status.message
      },
    })
  }
  componentDidUpdate(prevState) {
    if (this.props.status) {
      if (prevState.status.showModal !== this.state.status.showModal && this.props.status.showed === false) {
        this.props.status.showed = true;
        this.setStatus();
      }
    }

    Animated.timing(this._animatedModal, {
      toValue: this.state.status.showModalInner ? 0 : 1,
      duration: 200,
    }).start();
  }
  timeOutModal = () => {
  }
  onCloseModal = () => {
    this.setState({
      status: { ...this.state.status, showModalInner: false }
    })
    setTimeout(() => {
      this.setState({
        status: { ...this.state.status, showModal: false }
      })
    }, 300)
  }
  handleUserLoggedOut = () => {
    apiTrashSID();
    this.props.setUserLoggedOut();
  };

  render() {
    const statusBarBox = {
      backgroundColor: this.state.status.type === 1 ? "#bbf224" : '#f24a24',
      paddingVertical: 2,
      paddingHorizontal: 10,
      borderRadius: 5,
    };
    const statusBarText = {
      color: this.state.status.type === 1 ? 'black' : 'white',
    }
    const balanceBoxTextEnd = {
      fontSize: 30,
      fontWeight: "300",
    }
    const balanceBoxExtEnd = {
      fontSize: 16,
      color: "#7f7f7f",
      marginBottom: 3,
      marginLeft: 4,
    }
    const notificBox = {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      zIndex: 30,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#00000050',
      opacity: this._animatedModal.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
      }),
      display: this.state.status.showModal ? 'flex' : 'none'
    }
    const notificBoxInner = {
      width: Dimensions.get('window').width - 20,

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
      opacity: this._animatedModal.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
      }),
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 3,
    }
    return (
      <View style={{ flex: 1, position: 'relative' }}>
        {this.state.status.showModal ? <Animated.View style={notificBox}>
          <Animated.View style={notificBoxInner}>
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "flex-end",
              }}
            >
              <Text style={{ marginBottom: 3 }}>Итоговая сумма:</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
              >
                <Text style={balanceBoxTextEnd}>{this.state.status.endSumm} </Text>
                <Text style={balanceBoxExtEnd}>₽</Text>
              </View>
            </View>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
              <Text>Статус</Text>
              <View style={statusBarBox}>
                <Text style={statusBarText}>{this.state.status.type === 1 ? 'Успешно' : 'Ошибка'}</Text>
              </View>
            </View>
            <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', marginBottom: 10, paddingVertical: 10, borderTopWidth: 1, borderTopColor: 'lightgray', borderStyle: 'solid' }}>
              <View style={statusBarBox}>
                <Text style={statusBarText}>{this.state.status.message}</Text>
              </View>
            </View>
            <MyButton onPress={this.onCloseModal}
              title="Ок"
              classType="primary"
              withLoading="true"
              status="active" />
          </Animated.View>
        </Animated.View> : null}
        <FlatList
          contentContainerStyle={{ paddingVertical: 5 }}
          data={this.state.items}
          keyExtractor={item => item.id}
          style={{ flex: 1 }}
          renderItem={({ item }) => (
            <Card item={item} navigation={this.props.navigation} setUserSelectedAccount={this.props.setUserSelectedAccount} />
          )}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.refresh}
            />
          }
        >
          {/* <Button onPress={this.handleUserLoggedOut} title="Выйти нахуй" /> */}
        </FlatList>
        <MyButton
          onPress={this.handleUserLoggedOut}
          title="Выйти"
          classType="primary"
          withLoading="true"
          status="active"
        />
      </View>
    );
  }
}