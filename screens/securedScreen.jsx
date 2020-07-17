import React, { Component } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "./profileScreen";
// import HomeScreen from "./homeScreen";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreenContainer from "./homeScreen/homeContainer";

const Tab = createBottomTabNavigator();
export default class SecuredScreen extends Component {
  render() {
    return (
      <Tab.Navigator
        initialRouteName="Домашка"
        tabBarOptions={{
          activeTintColor: "#bbf224",
        }}
      >
        <Tab.Screen name="Домашка" component={HomeScreenContainer} />
        <Tab.Screen
          name="Профиль"
          component={() => (
            <ProfileScreen
              onLogoutPress={() => {
                this.props.onLogoutPress;
              }}
            />
          )}
          options={{
            tabBarButton: 'kek',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}
