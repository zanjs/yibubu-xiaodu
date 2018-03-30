import React, { Component } from 'react'
import { Platform,Dimensions, StyleSheet, Text, Image, ImageBackground, View, TextInput, TouchableOpacity, AsyncStorage } from 'react-native'
import { NavigationActions } from 'react-navigation'


import { ifIphoneX } from 'react-native-iphone-x-helper'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { signin } from '../../actions/sign'
import { getClientInstalled } from '../../reducers/client-installed'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

class FastSignIn extends Component {

  static navigationOptions = ({navigation}) => ({
    header: null
  })

  constructor (props) {
    super(props)
    this.state = {}
    this.handleSignIn = this.handleSignIn.bind(this)
  }

  handleSignIn(access_token) {

    const self = this

    AsyncStorage.setItem('token', access_token, function(errs, result){

      // 储存token有效时间
      AsyncStorage.setItem('token_expires', (new Date().getTime() + 1000 * 60 * 60 * 24 * 30) + '', function(errs, result){

        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Welcome'})
          ]
        })

        global.initReduxDate(()=>{
          self.props.navigation.dispatch(resetAction)
        })

      })

    })

  }

  render() {

    const self = this
    const { navigate } = this.props.navigation

    return (<ImageBackground source={require('../../images/bg.png')}  style={{ flex:1 }} resizeMode="cover">
      <View style={styles.container}>

        <View style={styles.welcome}>
          <Image source={require('./images/logo.png')} style={styles.logo} resizeMode="cover" />
          <View style={{backgroundColor:null}}><Text style={styles.welcomeText}>欢迎来到小度鱼。</Text></View>
        </View>

        <View style={styles.main}>
          <TouchableOpacity onPress={()=>navigate('SignIn')} style={styles.signInButton}>
            <Text style={styles.signInButtonText}>登陆</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigate('SignUp')} style={styles.signUpButton}>
            <Text style={styles.signUpButtonText}>创建账号</Text>
          </TouchableOpacity>
        </View>
      
      </View>
      </ImageBackground>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    width:null,
    height:null,
    backgroundColor:'transparent'
  },

  // logo
  welcome: {
    paddingTop:20,
    height:screenHeight*0.4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcomeText: {
    color: '#fff',
    fontSize: 20,
    fontWeight:'bold'
  },
  logo: {
    width:screenHeight*0.12,
    height:screenHeight*0.12,
  },

  main: { padding:20 },

  // sign
  signInButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginBottom: 10,
    backgroundColor:'#1e93db'
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 16
  },

  // sign up
  signUpButton: {
    backgroundColor: '#fff',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginBottom: 10
  },
  signUpButtonText: {
    color: '#0262a6',
    fontSize: 16
  },

  // other sign in
  otherSignInContainer: { padding:30, alignItems: 'center' },
  otherSignIn: { flexDirection: 'row', paddingTop:20 },
  otherSigninItem: { marginLeft:30, marginRight:30, alignItems: 'center' },
  iconView: { marginBottom:5 },
  icon: { width: 30, height: 30 },
  textWhite: { color:'#fff' }
})

export default connect(
  (state, props) => {
    return {
      clientInstalled: getClientInstalled(state)
    }
  },
  (dispatch, props) => ({
    signin: bindActionCreators(signin, dispatch),
  })
)(FastSignIn)
