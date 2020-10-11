import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedbackBase, Animated } from "react-native";
import { TouchableHighlight, TouchableWithoutFeedback } from "react-native-gesture-handler";
import MyButton from "../components/myButton";

export default class PassCodeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            code: ''
        }
        this.charBox = React.createRef()
    }
    setCodeChar = code => {
        if(this.state.code.length < 4){
            this.setState({ code: this.state.code + code })
        }
    }
    removeCodeChar = () => {
        this.setState({ code: this.state.code.substring(0, this.state.code.length - 1) })
    }
    clearCode = () => {
        this.setState({ code: '' })
    }
    charPress = res => {
        this.setCodeChar(res)
        // console.log(this.charBox.current.childrensOnly)
        console.log(res)
        console.log(this.state.code)
        // console.log('123')
    }
    render() {
        console.log(this.state.code)
        const codeChar_1 = {backgroundColor: this.state.code.length > 0 ? 'black' : 'transparent'};
        const codeChar_2 = {backgroundColor: this.state.code.length > 1 ? 'black' : 'transparent'};
        const codeChar_3 = {backgroundColor: this.state.code.length > 2 ? 'black' : 'transparent'};
        const codeChar_4 = {backgroundColor: this.state.code.length > 3 ? 'black' : 'transparent'};
        return (
            <View style={styles.window}>
                <View style={styles.box}>
                    <Text style={styles.title}>Введите код:</Text>
                    <View style={styles.codeBox}>
                        <View style={styles.codeBoxItem}>
                            <View style={[styles.codeBoxItemInner, codeChar_1]}></View>
                        </View>
                        <View style={styles.codeBoxItem}>
                            <View style={[styles.codeBoxItemInner, codeChar_2]}></View>
                        </View>
                        <View style={styles.codeBoxItem}>
                            <View style={[styles.codeBoxItemInner, codeChar_3]}></View>
                        </View>
                        <View style={styles.codeBoxItem}>
                            <View style={[styles.codeBoxItemInner, codeChar_4]}></View>
                        </View>
                    </View>
                    <View style={styles.charBox} ref={this.charBox}>
                        <View style={styles.charBoxRow}>
                            <CharItem title="1" onPress={this.charPress} />
                            <CharItem title="2" onPress={this.charPress} />
                            <CharItem title="3" onPress={this.charPress} />
                        </View>
                        <View style={styles.charBoxRow}>
                            <CharItem title="4" onPress={this.charPress} />
                            <CharItem title="5" onPress={this.charPress} />
                            <CharItem title="6" onPress={this.charPress} />
                        </View>
                        <View style={styles.charBoxRow}>
                            <CharItem title="7" onPress={this.charPress} />
                            <CharItem title="8" onPress={this.charPress} />
                            <CharItem title="9" onPress={this.charPress} />
                        </View>
                        <View style={styles.charBoxRow}>
                            <CharItem title="x" onPress={this.clearCode} />
                            <CharItem title="0" onPress={this.charPress} />
                            <CharItem title="<" onPress={this.removeCodeChar} />
                        </View>
                    </View>
                    <MyButton
                        title="Отмена"
                        classType="secondary"
                        status="active"
                        onPress={() => { this.props.navigation.navigate('Вход') }}
                    />
                </View>
            </View>
        )
    }
}
class CharItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isActive: false
        }
        this._animatedPress = new Animated.Value(0);

        Animated.timing(this._animatedPress, {
            toValue: this.state.isActive ? 1 : 0,
            duration: this.state.isActive ? 0 : 300,
        }).start();
    }
    setActive = () => {
        this.setState({ isActive: true })
    }
    setInActive = () => {
        this.setState({ isActive: false })
    }
    onPressIn = () => {
        this.setActive()
        console.log('setActive')
    }
    onPressOut = () => {
        this.setInActive()
        console.log('setInActive')
    }
    componentDidUpdate() {
        Animated.timing(this._animatedPress, {
            toValue: this.state.isActive ? 1 : 0,
            duration: this.state.isActive ? 0 : 300,
        }).start();
    }
    render() {
        const isActive = {
            width: '100%',
            height: '100%',
            position: 'absolute',
            backgroundColor: 'black',
            opacity: this._animatedPress.interpolate({
                inputRange: [0, 1],
                outputRange: [0.04, 0.6],
            }),
        };
        return (
            <TouchableWithoutFeedback onPress={() => { this.props.onPress(this.props.title)}} onPressIn={this.onPressIn} onPressOut={this.onPressOut}>
                <View style={styles.charBoxItem}>
                    <Animated.View style={isActive}></Animated.View>
                    <Text style={styles.charBoxItemTitle}>{this.props.title}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}
const styles = StyleSheet.create({
    window: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    box: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 18,
    },
    codeBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20
    },
    codeBoxItem: {
        width: 0,
        height: 0,
        margin: 10,
        backgroundColor: 'black',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center'
    },
    codeBoxItemInner: {
        position: 'absolute',
        width: 10,
        height: 10,
        backgroundColor: 'transparent',
        borderRadius: 50,
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 1
    },
    charBox: {
        display: 'flex',
        flexDirection: 'column'
    },
    charBoxRow: {
        display: 'flex',
        flexDirection: 'row'
    },
    charBoxItem: {
        width: 60,
        height: 60,
        borderRadius: 80,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'black',
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
    },
    charBoxItemTitle: {
        fontSize: 22,
        position: 'relative',
        zIndex: 20
    },
})