
import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import { NavigationActions } from 'react-navigation'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUserInfo } from '../../reducers/user'
import { loadUnreadCount, loadNewNotifications, cancelNotiaction } from '../../actions/notification'
import { loadNewPosts } from '../../actions/posts'
import { api_url, feedback_email } from '../../../config'

import Loading from '../../components/ui/loading'

import websocket from '../../common/websocket'


class Welcome extends Component {

  static navigationOptions = ({navigation}) => ({
    header: null
  })

  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      network: true,
      notification: null,
      blockAccount: false
    }
    this.handleMessage = this.handleMessage.bind(this)
    this.enterApp = this.enterApp.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
  }

  componentWillMount() {
    const self = this

    self.setState({ loading: true })

  }

  componentWillUnmount() {
    //重写组件的setState方法，直接返回空
    this.setState = (state,callback)=>{
      return;
    };  
  }

  componentDidMount() {

    const self = this

    global.initReduxDate((result)=>{


      if (result == 'block account') {
        self.setState({ blockAccount: true, loading: false })
        return
      }

      if (result == 'network error') {
        self.setState({ network: false, loading: false })
        return
      }
      
      global.signIn = result == 'has sign in' ? true : false

      self.setState({ loading: false })
      self.enterApp()
    })

  }

  // websocket 执行的消息
  handleMessage(name, data) {

    const {
      me, loadUnreadCount, loadNewNotifications,
      cancelNotiaction, loadNewPosts, navigation
    } = this.props

    switch (name) {
      case 'notiaction':
        if (me._id && data.indexOf(me._id) != -1) {
          loadUnreadCount({
            callback: (unreadNotice)=>{

              const setParamsAction = NavigationActions.setParams({
                params: { unreadNotice, loadNewNotifications },
                key: 'Notifications',
              })
              navigation.dispatch(setParamsAction)

            }
          })

        }
        break
      case 'cancel-notiaction':
        cancelNotiaction({
          id: data,
          callback: (unreadNotice)=>{
            const setParamsAction = NavigationActions.setParams({
              params: { unreadNotice, loadNewNotifications },
              key: 'Notifications',
            })
            navigation.dispatch(setParamsAction)
          }
        })

        break
      case 'online-user-count':
        // console.log(data);
        break
      case 'new-posts':
        loadNewPosts(data)
        break
    }
  }

  // 进入主程序
  enterApp() {
    const self = this
    const { me, navigation } = this.props

    const { navigate } = this.props.navigation
    const { notification } = this.state

    let actions = []
    let index = 0

    // 启动websocket
    websocket.start({ onmessage: this.handleMessage })

    if (global.signIn) {

      // 已登陆
      actions.push(NavigationActions.navigate({ routeName: 'Main' }))

      // 获取通知消息
      self.handleMessage('notiaction', [me._id])

    } else {
      actions.push(NavigationActions.navigate({ routeName: 'FastSignIn' }))
    }

    this.props.navigation.dispatch(NavigationActions.reset({ index, actions }))

    if (notification && notification.routeName && notification.params) {
      setTimeout(()=>{
        navigate(notification.routeName, notification.params)
      }, 1000)
    }

  }

  render() {

    const self = this
    const { loading, network, blockAccount } = this.state

    if (loading) {
      return (<View style={styles.container}><Loading /></View>)
    } else if (!network) {
      return (<View style={styles.container}>
        <View style={styles.title}><Text style={styles.titleText}>没有网络或连接服务器异常</Text></View>
        <TouchableOpacity onPress={()=>{
          self.setState({
            loading: true,
            network: true,
            notification: null,
            blockAccount: false
          })
          setTimeout(()=>{
            self.componentDidMount()
          }, 1000)
        }}>
          <Text style={styles.reloadText}>重新连接</Text>
        </TouchableOpacity>
      </View>)
    } else if (blockAccount) {
      return (<View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}>您的账户被封，如有疑问请联系</Text>
          <Text>{feedback_email}</Text>
        </View>
        <TouchableOpacity onPress={()=>{
          self.setState({
            loading: true,
            network: true,
            notification: null,
            blockAccount: false
          })
          setTimeout(()=>{
            self.componentDidMount()
          }, 1000)
        }}>
          <Text style={styles.reloadText}>返回</Text>
        </TouchableOpacity>
      </View>)
    }

    return (<View style={styles.container}><Loading /></View>)
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    padding: 15
  },
  titleText: {
    fontSize: 18
  },
  reloadText: {
    fontSize: 16,
    color:'rgb(20, 146, 250)'
  }
})

export default connect(
  (state, props) => {
    return {
      me: getUserInfo(state)
    }
  },
  (dispatch, props) => ({
    loadUnreadCount: bindActionCreators(loadUnreadCount, dispatch),
    loadNewNotifications: bindActionCreators(loadNewNotifications, dispatch),
    cancelNotiaction: bindActionCreators(cancelNotiaction, dispatch),
    loadNewPosts: bindActionCreators(loadNewPosts, dispatch)
  })
)(Welcome)
