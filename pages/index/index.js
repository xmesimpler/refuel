//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    loc: {},
    gas: ['93#（京92）', '97#(京95)', '0#'],
    price: [6.51, 6.88, 5.66],

    index: 0,
    imgUrls: [
      '/img/swipe1.jpg',
      '/img/wipe2.jpg',
      '/img/swipe3.jpg'
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,

  },

  //事件处理函数

  //页面跳转
  topath: function () {
    wx.redirectTo({
      url: '../path/find-path',
    })
  },
  toMap: function () {
    wx.navigateTo({
      url: '../map/map',
    })
  },
  tostation: function () {
    wx.redirectTo({
      url: '../station/station',
    })
  },
  toPoi: function () {
    wx.redirectTo({
      url: '../poi/poi',
    })
  },

  //显示当前位置
  showloc: function () {
    var that = this
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        // success
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        console.log(res)
        that.setData({ loc: latitude, longitude })
        console.log(that.data.loc)

      },
      fail: function () {
        // fail
        console.log(fail)
      },
      complete: function () {
        // complete



      }
    })

  },
  //打开当前位置
  openloc: function () {
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 28
        })
      }
    })
  },



  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    // console.log(index0)
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
  //油价显示
  select: function (e) {
    const value = e.detail.value
    const index0 = value[0]
    console.log(index0)
    this.setData({
      index: index0
    })
    //console.log(index+'aaa')? error:index not defined

  },

})