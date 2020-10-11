import React, { Component } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { TextInput } from "react-native";
import { TextInputMask } from 'react-native-masked-text'

export default class FloatingLabelInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
      isEmpty: true,
      value: this.props.value,
      selection: null
    };
    this._animatedFocused = new Animated.Value(0);
    this._animatedEmpty = new Animated.Value(0);
  }

  componentDidMount() {
    if (this.props.value != "" && this.props.value !== undefined) {
      this.setState({
        isEmpty: false,
      });
    }
  }

  handleFocus = () => {
    this.setState({ isFocused: true });
    this.setState({ isEmpty: false });
  };
  handleBlur = () => {
    if (this.props.value != "" && this.props.value !== undefined) {
      this.setState({ isEmpty: false });
    } else {
      this.setState({ isEmpty: true });
    }
    this.setState({ isFocused: false });
  };

  componentDidUpdate() {
    Animated.timing(this._animatedFocused, {
      toValue: this.state.isFocused ? 1 : 0,
      duration: 200,
    }).start();
    Animated.timing(this._animatedEmpty, {
      toValue: this.state.isEmpty ? 0 : 1,
      duration: 200,
    }).start();
    if(this.state.value !== this.props.value && this.props.value !== ''){
      this.setState({value: this.props.value, isEmpty: false})
    }
  }

  onChangeText = (newText) => {
    this.setState({ value: newText })
    this.props.onChangeText(newText)
    if (this.props.onChangeTextRaw !== undefined) {
      setTimeout(() => {
        this.props.onChangeTextRaw(this.input.getRawValue())
      }, 100)
    }
  }

  render() {
    const labelStyles = {
      position: "absolute",
      top: this._animatedEmpty.interpolate({
        inputRange: [0, 1],
        outputRange: [15, -8],
      }),
      left: this._animatedEmpty.interpolate({
        inputRange: [0, 1],
        outputRange: [15, 15],
      }),
      zIndex: 20,
    };
    const labelStylesText = {
      color: this._animatedEmpty.interpolate({
        inputRange: [0, 1],
        outputRange: ["#000", "#8a8a8a"],
      }),
      fontSize: this._animatedEmpty.interpolate({
        inputRange: [0, 1],
        outputRange: [16, 12],
      }),
    }
    const inputStyles = {
      paddingVertical: 10,
      paddingHorizontal: 15,
      fontSize: 20,
    };
    const inputOuterStyles = {
      borderBottomColor: this._animatedFocused.interpolate({
        inputRange: [0, 1],
        outputRange: ["#e3cdf5", "#7f3cb5"],
      }),
      borderBottomWidth: 2,
      borderStyle: "solid",
      width: "100%",
    };
    return (
      <View style={styles.outer}>
        <Animated.View pointerEvents="none" style={labelStyles}>
          <Animated.Text style={labelStylesText}>
            {this.props.label}
          </Animated.Text>
        </Animated.View>
        <Animated.View style={inputOuterStyles}>
          {this.props.maskType ? <TextInputMask
            type={this.props.maskType}
            options={this.props.mask !== undefined ? {
              mask: this.props.mask,
              getRawValue: function (value, settings) {
                return value.replace(/[^0-9.]+/g, "");
              },
            } : this.props.maskTypeOptions}
            ref={ref => { this.input = ref }}
            style={inputStyles}
            value={this.state.value}
            onChangeText={this.onChangeText}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            autoCompleteType={this.props.autoCompleteType}
            keyboardType={this.props.keyboardType}
            autoCorrect={this.props.autoCorrect}
            secureTextEntry={this.props.secureTextEntry}
            selection={this.state.selection}
          /> :
            <TextInput
              refInput={ref => { this.input = ref }}
              style={inputStyles}
              value={this.state.value}
              onChangeText={this.onChangeText}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              autoCompleteType={this.props.autoCompleteType}
              keyboardType={this.props.keyboardType}
              autoCorrect={this.props.autoCorrect}
              secureTextEntry={this.props.secureTextEntry}
              selection={this.state.selection}
            />}
        </Animated.View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  outer: {
    width: "100%",
    margin: 10,
  },
});
