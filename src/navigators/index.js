import { PixelRatio, Platform } from 'react-native'
import { StackNavigator, TabNavigator } from 'react-navigation'
import { ifIphoneX } from 'react-native-iphone-x-helper'

import SignIn from '../containers/sign-in'
import Home from '../containers/home'


// setting
import ResetNickname from '../containers/reset-nickname'
import ResetBiref from '../containers/reset-brief'
import ResetGender from '../containers/reset-gender'
import ResetPassword from '../containers/reset-password'
import ResetEmail from '../containers/reset-email'
import ResetAvatar from '../containers/reset-avatar'
import ResetPhone from '../containers/reset-phone'

import BindingPhone from '../containers/binding-phone'



let tabBarOptions = {
  style: {
    ...ifIphoneX({
        height: 75,
        backgroundColor:'#fff',
        paddingBottom: 25,

    }, {
        backgroundColor:'#fff',
    })
  },
  activeTintColor:'#08f',
  inactiveTintColor:'#757575',
}

if (Platform.OS === 'android') {

  tabBarOptions = {
    style: {
      height: 50,
      backgroundColor:'#fff'
    },
    tabStyle:{
      borderWidth: 0,
    },
    activeTintColor:'#08f',
    inactiveTintColor:'#757575',

    showIcon: true,
    showLabel: true,
    iconStyle: { width:28, height:28 },
    labelStyle:{ fontSize: 9, marginTop:0 },
    indicatorStyle: { backgroundColor: '#fff' }
  }

}

const MainScreenNavigator = TabNavigator({
  Home: { screen: Home },
  SignIn: { screen: SignIn },
},
{
  initialRouteName: 'SignIn',
  tabBarPosition: 'bottom',
  swipeEnabled:false,
  animationEnabled:false,
  lazy: true,
  tabBarOptions: tabBarOptions
})

const App = StackNavigator({
  Main: { screen: SignIn },
  SignIn: { screen: SignIn },
  Home: { screen: Home },
  ResetNickname: { screen: ResetNickname },
  ResetBiref: { screen: ResetBiref },
  ResetGender: { screen: ResetGender },
  ResetPassword: { screen: ResetPassword },
  ResetEmail: { screen: ResetEmail },
  ResetAvatar: { screen: ResetAvatar },
  ResetPhone: { screen: ResetPhone },
  BindingPhone: { screen: BindingPhone },
},{
  initialRouteName: 'SignIn',
  navigationOptions: {
    headerTruncatedBackTitle: '返回',
    headerBackTitle: null,
    headerStyle: {
      backgroundColor: '#fff',
      ...ifIphoneX({
        paddingTop:30,
        height: 75
      }, {
        height: Platform.OS === 'android' ? 50 : 65
      })
    },
    headerTintColor: '#23232b',
    headerTitleStyle: {
      fontSize: 17,
      color:'#23232b'
    },
    headerBackTitleStyle: {
      backgroundColor: '#333'
    },
    headerBackTitleStyle: {
      fontSize:17
    }
  },
  headerMode: 'screen'
})



export default App
