// pages/map/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,//项目id
    mapheight: 0,//屏幕的高度
    latitude: 39.984060, //纬度
    longitude: 116.307520, //经度
    jingdu:0,//经度
    weidu:0,//纬度
    julitxt:'跳转至地图导航'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    //接受参数
    that.setData({
      id: parseInt(options.id)
    })

    //得到高度
    that.getheight();

    //得到项目的信息
    that.getproinfo(); 

    //获取距离
    that.getdistance();

    //结束标识符
  },
  //得到屏幕的高度
  getheight:function(){
    var that=this;

    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          mapheight:res.screenHeight-120
        })
      },
    })
  },
  //获取距离
   getdistance:function(){
     var that=this;
     wx.getLocation({
       type:'gcj02',
       success: function(res) {
         that.setData({
           jingdu: res.longitude,//经度
           weidu: res.latitude,//纬度
         })

         wx.showModal({
           title: '',
           content: '太远啦，无法计算距离~'
         })
       },
     })
   },
  //得到地址信息
  getproinfo: function () {
    
    var that=this;

    //参数信息
    var id=that.data.id;

    //地图的数据部分
    that.setData({
      latitude: 39.984060,
      longitude: 116.307520,     
      controls: [{
        id: 1,
        position: {
          left: 330,
          top: 290,
          width: 30,
          height: 30
        },
        iconPath: '/resources/search.png',
        clickable: true
      },
      {
        id: 2,
        position: {
          left: 330,
          top: 330,
          width: 30,
          height: 30
        },
        iconPath: '/resources/dingwei.png',
        clickable: true
      },
      ], //控件部分
    });
  },
  //点击图标
  mapcontroltap: function (e) {
    var that=this;
    console.log("图标的点击:");
    console.log(e);
    var id = e.controlId;
    if (id == 1) {
      wx.navigateTo({
        url: '../tansuo/index',
      })
    } else {
      //定位
      wx.getLocation({
        success: function (res) {
          console.log("得到定位的值:");
          console.log(res);
          that.setData({
            latitude: res.latitude, //纬度
            longitude: res.longitude, //经度
          })
        },
      })
    }
  },
  //导航
  godaohang:function(){
    var that=this;

    wx.openLocation({
      latitude: that.data.latitude,
      longitude: that.data.longitude,
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

  }
})