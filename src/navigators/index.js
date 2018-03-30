import { PixelRatio, Platform } from 'react-native'
import { StackNavigator, TabNavigator } from 'react-navigation'
import { ifIphoneX } from 'react-native-iphone-x-helper'

import SignIn from '../containers/sign-in'
// import FastSignIn from '../containers/fast-sign-in'
// import SignUp from '../containers/sign-up'

import Welcome from '../containers/welcome'
import Home from '../containers/home'
import Forgot from '../containers/forgot'
import Agreement from '../containers/agreement'

import PostsDetail from '../containers/posts-detail'
import Topics from '../containers/topics'
import Notifications from '../containers/notifications'

import Me from '../containers/me'
import CommentDetail from '../containers/comment-detail'
import WriteComment from '../containers/write-comment'
import WritePosts from '../containers/write-posts'
import ChooseTopic from '../containers/choose-topic'
import TopicDetail from '../containers/topic-detail'
import List from '../containers/list'
// import PeopleDetail from '../containers/people-detail'

// setting
import Settings from '../containers/settings'
import ResetNickname from '../containers/reset-nickname'
import ResetBiref from '../containers/reset-brief'
import ResetGender from '../containers/reset-gender'
import ResetPassword from '../containers/reset-password'
import ResetEmail from '../containers/reset-email'
import ResetAvatar from '../containers/reset-avatar'
import ResetPhone from '../containers/reset-phone'

import BindingPhone from '../containers/binding-phone'

import Report from '../containers/report'
import Block from '../containers/block'


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
  Topics: { screen: Topics },
  Notifications: { screen: Notifications },
  Me: { screen: Me }
},
{
  initialRouteName: 'Home',
  tabBarPosition: 'bottom',
  swipeEnabled:false,
  animationEnabled:false,
  lazy: true,
  tabBarOptions: tabBarOptions
})

const App = StackNavigator({
  Main: { screen: MainScreenNavigator },
  Welcome: { screen: Welcome },
  SignIn: { screen: SignIn },
  // FastSignIn: { screen: FastSignIn },
  // SignUp: { screen: SignUp },
  Forgot: { screen: Forgot },
  Home: { screen: Home },
  PostsDetail: { screen: PostsDetail },
  WriteComment: { screen: WriteComment },
  WritePosts: { screen: WritePosts },
  ChooseTopic: { screen: ChooseTopic },
  CommentDetail: { screen: CommentDetail },
  TopicDetail: { screen: TopicDetail },
  List: { screen: List },
  Me: { screen: Me },
  Settings: { screen: Settings },
  ResetNickname: { screen: ResetNickname },
  ResetBiref: { screen: ResetBiref },
  ResetGender: { screen: ResetGender },
  ResetPassword: { screen: ResetPassword },
  ResetEmail: { screen: ResetEmail },
  ResetAvatar: { screen: ResetAvatar },
  ResetPhone: { screen: ResetPhone },
  BindingPhone: { screen: BindingPhone },
  Agreement: { screen: Agreement },
  Report: { screen: Report },
  Block: { screen: Block }
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