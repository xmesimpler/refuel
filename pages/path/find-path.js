// pages/path/find-path.js]
var amapFile = require('../../libs/amap-wx.js')
var config = require('../../libs/config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [{
      iconPath: "../../img/mapicon_navi_s.png",
      id: 0,
      latitude: 21.687339,
      longitude: 110.931342, 
      width: 23,
      height: 33
    }, {
      iconPath: "../../img/mapicon_navi_e.png",
      id: 0,
      latitude: 21.68571,
      longitude: 110.929473, 
      width: 24,
      height: 34
    }],
    distance: '',
    cost: '',
    polyline: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({ key: '2aa37e2ea516fe3642c3869191d04c7d' });
    //构造 AMapWX 对象，并调用 getDrivingRoute 方法
    myAmapFun.getDrivingRoute({
      origin: '110.931342,21.687339',//起点
      destination: '110.931989,21.686987',//目的地
      success: function (data) {
        var points = [];
        if (data.paths && data.paths[0] && data.paths[0].steps) {
          var steps = data.paths[0].steps;
          for (var i = 0; i < steps.length; i++) {
            var poLen = steps[i].polyline.split(';');
            for (var j = 0; j < poLen.length; j++) {
              points.push({
                longitude: parseFloat(poLen[j].split(',')[0]),
                latitude: parseFloat(poLen[j].split(',')[1])
              })
            }
          }
        }
        that.setData({
          polyline: [{
            points: points,
            color: "#0091ff",
            width: 6
          }]
        });
        if (data.paths[0] && data.paths[0].distance) {
          that.setData({
            distance: data.paths[0].distance + '米'
          });
        }
        if (data.taxi_cost) {
          that.setData({
            cost: '打车约' + parseInt(data.taxi_cost) + '元'
          });
        }

      },
      fail: function (info) {

      }
    })
    console.log(amapFile)
  },
  /**
   * 详情按钮响应函数
   */
  goDetail: function () {
    wx.navigateTo({
      url: '../navigation_car_detail/navigation'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  }
})