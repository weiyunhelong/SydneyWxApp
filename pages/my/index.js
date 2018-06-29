// pages/my/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winheight:0,//地图的高度
    screenHeight:0,//屏幕的高度
    windowWidth: 0,//屏幕的宽度
    showmap:true,//显示地图部分
    showshang:true,//显示上箭头
    scale: 16, //地图的缩放比例
    latitude: 39.984060, //纬度
    longitude: 116.307520, //经度
    markers: [], //坐标
    zujilist:[],//足迹列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;

    //得到地图的高度
    that.getheight();

    //初始化地图
    that.initmap();

    //得到足迹列表
    that.zujilist();
  },
  //初始化地图
  initmap:function(){
    var that=this;
    //地图的数据部分
    that.setData({
      latitude: 39.984060,
      longitude: 116.307520,
      markers: [{
        id: 1,
        latitude: 39.984060,
        longitude: 116.307420,
        iconPath: '/resources/dituh.png',
        callout: {
          content: "A语言：珊珊是不是傻\n预计到达时间：10分钟\n车牌号：12345",
          color: "#ff0000",
          fontSize: 10,
          borderRadius: 10,
          bgColor: "#ffffff",
          padding: 10,
          display: "ALWAYS"
        },
      },
      {
        id: 2,
        latitude: 39.984060,
        longitude: 116.308520,
        iconPath: '/resources/ditu.png',
        callout: {
          content: "B语言：珊珊是不是傻\n预计到达时间：10分钟\n车牌号：12345",
          color: "#ff0000",
          fontSize: 10,
          borderRadius: 10,
          bgColor: "#ffffff",
          padding: 10,
          display: "BYCLICK"
        }
      },
      {
        id: 3,
        latitude: 39.984060,
        longitude: 116.317520,
        iconPath: '/resources/ditu.png',
        callout: {
          content: "C语言：珊珊是不是傻\n预计到达时间：10分钟\n车牌号：12345",
          color: "#ff0000",
          fontSize: 10,
          borderRadius: 10,
          bgColor: "#ffffff",
          padding: 10,
          display: "BYCLICK"
        }
      },
      {
        id: 4,
        latitude: 39.985260,
        longitude: 116.309520,
        iconPath: '/resources/ditu.png',
        callout: {
          content: "D语言：珊珊是不是傻\n预计到达时间：10分钟\n车牌号：12345",
          color: "#ff0000",
          fontSize: 10,
          borderRadius: 10,
          bgColor: "#ffffff",
          padding: 10,
          display: "BYCLICK"
        }
      },
      {
        id: 5,
        latitude: 39.986060,
        longitude: 116.303520,
        iconPath: '/resources/ditu.png',
        callout: {
          content: "E语言：珊珊是不是傻\n预计到达时间：10分钟\n车牌号：12345",
          color: "#ff0000",
          fontSize: 10,
          borderRadius: 10,
          bgColor: "#ffffff",
          padding: 10,
          display: "BYCLICK"
        }
      },
      {
        id: 6,
        latitude: 39.987060,
        longitude: 116.304520,
        iconPath: '/resources/ditu.png',
        callout: {
          content: "F语言：珊珊是不是傻\n预计到达时间：10分钟\n车牌号：12345",
          color: "#ff0000",
          fontSize: 10,
          borderRadius: 10,
          bgColor: "#ffffff",
          padding: 10,
          display: "BYCLICK"
        }
      },
      ],
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
  //得到地图的高度
  getheight:function(){
    var that=this;

    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          winheight: res.screenHeight*0.69,
          screenHeight:res.screenHeight,
          windowWidth:res.screenWidth
        })
      },
    })
  },
  //得到足迹列表
  zujilist:function(){
    var that=this;

    var zujilist=[
      {
        id:1,
        imgpath:'/resources/tu1.jpg',
        name:'AAA',
        address:'地址AAAAAAAAAAAAAAAAAaaaa',
        date:'2018-06-29'
      },
      {
        id: 2,
        imgpath: '/resources/tu2.jpg',
        name: 'BBB',
        address: '地址AAAAAAAAAAAAAAAAAaaaa',
        date: '2018-06-29'
      },
      {
        id: 3,
        imgpath: '/resources/tu3.jpg',
        name: 'CCC',
        address: '地址AAAAAAAAAAAAAAAAAaaaa',
        date: '2018-06-29'
      },
      {
        id: 4,
        imgpath: '/resources/tu1.jpg',
        name: 'DDD',
        address: '地址AAAAAAAAAAAAAAAAAaaaa',
        date: '2018-06-29'
      },
      {
        id: 5,
        imgpath: '/resources/tu2.jpg',
        name: 'EEE',
        address: '地址AAAAAAAAAAAAAAAAAaaaa',
        date: '2018-06-29'
      },
      {
        id: 6,
        imgpath: '/resources/tu3.jpg',
        name: 'FFF',
        address: '地址AAAAAAAAAAAAAAAAAaaaa',
        date: '2018-06-29'
      },
      {
        id: 7,
        imgpath: '/resources/tu1.jpg',
        name: 'GGG',
        address: '地址AAAAAAAAAAAAAAAAAaaaa',
        date: '2018-06-29'
      },
      {
        id: 8,
        imgpath: '/resources/tu2.jpg',
        name: 'HHH',
        address: '地址AAAAAAAAAAAAAAAAAaaaa',
        date: '2018-06-29'
      },
      {
        id: 9,
        imgpath: '/resources/tu3.jpg',
        name: 'III',
        address: '地址AAAAAAAAAAAAAAAAAaaaa',
        date: '2018-06-29'
      },
      {
        id: 10,
        imgpath: '/resources/tu1.jpg',
        name: 'JJJ',
        address: '地址AAAAAAAAAAAAAAAAAaaaa',
        date: '2018-06-29'
      },
    ];

    that.setData({
      zujilist: zujilist
    })
  },
  //切换显示
  showmap:function(){
    var that=this;

    that.setData({
      showmap: !that.data.showmap,//显示地图部分
      showshang: true,//显示上箭头
    })
  },
  //上线
  showshang:function(){
    var that = this;

    that.setData({
      showshang: !that.data.showshang,//显示上箭头
    })

    if (!that.data.showshang){
      that.setData({
        winheight: that.data.screenHeight * 0.76
      })
    }else{
      that.setData({
        winheight: that.data.screenHeight * 0.69
      })
    }
  },
  //保存图片
  saveimg:function(){
   wx.navigateTo({
     url: '../test/index',
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
      return {
        title: '夜未央邀请你探索悉尼',
        path: '/index/index'
      }
    }
  }
})