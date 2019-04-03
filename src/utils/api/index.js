import fly from './fly'

export default {
  //检测登录态 - 首页
  checkLogin() {
    return fly.post('https://login.xueersi.com/LoginV1/checkLogin',{
      user_info: 1
    })
  }
}