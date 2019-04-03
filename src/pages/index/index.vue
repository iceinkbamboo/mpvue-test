<template>
  <div @click="clickHandle">

    <div class="userinfo" @click="bindViewTap">
      <img class="userinfo-avatar" src="/static/images/user.png" background-size="cover" />

      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div>

    <div class="usermotto">
      <div class="user-motto">
        <card :text="motto"></card>
      </div>
    </div>

    <div class="btn_upload" @click="uploadImg">上传图片</div>

    <div v-if="image" class="img">
      <img :src="image" />
    </div>

    <a href="/pages/counter/main" class="counter">去往Vuex示例页面</a>
    <van-button type="info">测试</van-button>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
import card from '@/components/card'
import Toast from '../../../static/vant/toast/toast.js'

export default {
  data () {
    return {
      motto: 'Hello miniprograme',
      userInfo: {
        nickName: 'mpvue',
        avatarUrl: 'http://mpvue.com/assets/logo.png'
      },
      image: ''
    }
  },

  components: {
    card
  },
  onShow () {
    console.log('进入页面')
    Toast('我是提示框')
    this.$api.checkLogin().then((res) => {
      console.log(res)
    })
  },
  methods: {
    bindViewTap () {
      const url = '../logs/main'
      console.log(mpvuePlatform)
      if (mpvuePlatform === 'wx') {
        mpvue.switchTab({ url })
      } else {
        mpvue.navigateTo({ url })
      }
    },
    clickHandle (ev) {
      console.log('clickHandle:', ev)
      // throw {message: 'custom test'}
    },
    uploadImg () {
      let that = this
      if (mpvuePlatform === 'wx') {
        wx.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
          success (res) {
            // tempFilePath可以作为img标签的src属性显示图片
            const tempFilePaths = res.tempFilePaths
            console.log('图片路径', tempFilePaths[0])
            that.image = tempFilePaths[0]
          }
        })
      } else if (mpvuePlatform === 'my') {
        my.chooseImage({
          count: 2,
          success: (res) => {
            console.log(res)
            that.image = res.apFilePaths[0]
          }
        })
      }
    }
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style lang="scss" scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 64PX;
  height: 64px;
  margin: 10px;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 50px;
  text-align: center;
}

.btn_upload{
  width: 100px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin: 0 auto;
  background: #cccccc;
}
.img{
  width: 335px;
  height: 335px;
  margin: 0 auto;
  img{
    width: 335px;
    height: 335px;
  }
}

.counter{
  text-align: center;
  margin-top: 20px;
}
</style>
