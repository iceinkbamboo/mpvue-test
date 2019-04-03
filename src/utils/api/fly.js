let Fly = require("flyio/dist/npm/wx") 
import qs from 'qs'
import Toast from '../vant/toast/toast'
console.log(Toast)
let fly = new Fly()
let toast = null
//定义公共headers
fly.config.headers = {'content-type': 'application/x-www-form-urlencoded'}
//设置超时
fly.config.timeout = 10000
// 跨域时是否发送cookie
fly.config.withCredentials = true
//设置请求基地址
fly.config.baseURL = "https://growth.xueersi.com/api"
//设置公共的Get参数
// fly.config.params={"token":"testtoken"}

//添加请求拦截器
fly.interceptors.request.use((request)=>{
  //给所有请求添加自定义header
  // request.headers["X-Tag"]="flyio";
  //终止请求
  //var err=new Error("xxx")
  //err.request=request
  //return Promise.reject(new Error(""))

  //可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
  return request;
})

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  (response) => {
    //只将请求结果的data字段返回
    return response.data
  },
  (err) => {
    //发生网络错误后会走到这里
    //return Promise.resolve("ssss")
  }
)

function errorCatch(error) {
  console.log('Error', error.message);
  if (error.status == 0) {
    Toast('网络开小差了，请重试')
  } else if (error.status == 1) {
    Toast('接口请求超时，请重试')
  }
}

export default {
  get(url, params, loadingMsg) {
    if(loadingMsg) {
      toast = Toast.loading({message: loadingMsg})
    }
    return fly.get(url, params)
      .then((res) => {
        toast && toast.clear()
        return res
      }).catch(function(error) {
        errorCatch(error)
      })
  },
  post(url, data, loadingMsg) {
    if(loadingMsg) {
      toast = Toast.loading({message: loadingMsg})
    }
    return fly.post(url, qs.stringify(data))
      .then((res) => {
        toast && toast.clear()
        return res
      }).catch((error) => {
        errorCatch(error)
      })
  }
}