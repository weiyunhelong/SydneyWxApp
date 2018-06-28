// pages/home/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isonechk: true, //顶部的菜单
    istwochk: false, //顶部的菜单
    isthreechk: false, //顶部的菜单
    isfourchk: false, //顶部的菜单
    scale: 16, //地图的缩放比例
    latitude: 39.984060, //纬度
    longitude: 116.307520, //经度
    markers: [], //坐标
    controls: [], //控件部分
    polylines: [], //线路
    chkmapid: 1, //默认选中的地图Mark
    preleftv: 220, //前一个滑动的坐标位置
    chanum: 0,
    toView: "",
    prolist: [], //底部的列表
    luxian: ['一日游(路线1)', '一日游(路线2)']
  },
  //选中菜单
  chkmenuopt: function(e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    id = parseInt(id);
    var isonechk = true, //顶部的菜单
      istwochk = false, //顶部的菜单
      isthreechk = false, //顶部的菜单
      isfourchk = false; //顶部的菜单
    switch (id) {
      case 1:
        isonechk = true; //顶部的菜单
        istwochk = false; //顶部的菜单
        isthreechk = false; //顶部的菜单
        isfourchk = false; //顶部的菜单
        break;
      case 2:
        isonechk = false; //顶部的菜单
        istwochk = true; //顶部的菜单
        isthreechk = false; //顶部的菜单
        isfourchk = false; //顶部的菜单
        break;
      case 3:
        isonechk = false; //顶部的菜单
        istwochk = false; //顶部的菜单
        isthreechk = true; //顶部的菜单
        isfourchk = false; //顶部的菜单
        break;
      case 4:
        isonechk = false; //顶部的菜单
        istwochk = false; //顶部的菜单
        isthreechk = false; //顶部的菜单
        isfourchk = true; //顶部的菜单
        that.bindPickerChange();
        break;
    }
    that.setData({
      isonechk: isonechk, //顶部的菜单
      istwochk: istwochk, //顶部的菜单
      isthreechk: isthreechk, //顶部的菜单
      isfourchk: isfourchk //顶部的菜单
    })
  },
  bindPickerChange: function() {

  },
  //点击地图图标
  getpro: function(e) {
    var that = this;
    console.log("地图的图标:");
    console.log(e);
    var id = e.markerId;
    that.setData({
      toView: "pro" + id,
      chkmapid: id
    })
    //更新地图
    this.updateMap();
  },
  //点击图标
  mapcontroltap: function(e) {
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
        success: function(res) {
          console.log("得到定位的值:");
          console.log(res);

        },
      })
    }
  },
  //滚动到最左侧
  upper: function(e) {
    console.log("滚动到最左:");
    console.log(e);
    this.setData({
      toView: "pro1",
      chkmapid: 1
    })
    //更新地图
    this.updateMap();
  },
  //滚动到最右侧
  lower: function(e) {
    console.log("滚动到最右:");
    console.log(e);
    var that = this;
    that.setData({
      toView: "pro" + that.data.prolist.length,
      chkmapid: that.data.prolist.length
    })
    //更新地图
    this.updateMap();
  },
  //滚动中
  scroll: function(e) {
    var that = this;
    var widthv = 170;
    var num = 0,
      chav = 0;
    console.log("滚动中:");
    console.log(e);

    //计算中间的值  
    var preleftv = that.data.preleftv;
    //判断滑动的方向
    var xxv = (preleftv + e.detail.scrollLeft) - 50;
    var chav = Math.floor(xxv / 170);
    console.log("滑动位置:" + chav);

    if (that.data.chanum != chav) {
      that.setData({
        chkmapid: chav,
        chanum: chav
      })
      that.updateMap();
    }
  },
  //更新地图
  updateMap: function() {
    var that = this;
    //参数部分
    var chkmapid = that.data.chkmapid;
    var prolist = that.data.prolist;
    var markers = that.data.markers;
    var toView = "pro" + chkmapid;
    //重置地图数据部分
    var protxtarry = [];
    for (var i = 0; i < prolist.length; i++) {
      if (chkmapid == prolist[i].no) {
        protxtarry[i] = {
          id: prolist[i].id,
          name: prolist[i].name,
          imgpath: prolist[i].imgpath,
          ischk: true,
          no: prolist[i].no
        };
      } else {
        protxtarry[i] = {
          id: prolist[i].id,
          name: prolist[i].name,
          imgpath: prolist[i].imgpath,
          ischk: false,
          no: prolist[i].no
        };
      }
    }
    //重置产品数据不符
    var markertxtarry = [];
    for (var i = 0; i < markers.length; i++) {
      if (chkmapid == markers[i].id) {
        markertxtarry[i] = {
          id: markers[i].id,
          latitude: markers[i].latitude,
          longitude: markers[i].longitude,
          iconPath: '/resources/dituh.png',
          callout: {
            content: markers[i].callout.content,
            color: markers[i].callout.color,
            fontSize: markers[i].callout.fontSize,
            borderRadius: markers[i].callout.borderRadius,
            bgColor: markers[i].callout.bgColor,
            padding: markers[i].callout.padding,
            display: "ALWAYS"
          },
        };
      } else {
        markertxtarry[i] = {
          id: markers[i].id,
          latitude: markers[i].latitude,
          longitude: markers[i].longitude,
          iconPath: '/resources/ditu.png',
          callout: {
            content: markers[i].callout.content,
            color: markers[i].callout.color,
            fontSize: markers[i].callout.fontSize,
            borderRadius: markers[i].callout.borderRadius,
            bgColor: markers[i].callout.bgColor,
            padding: markers[i].callout.padding,
            display: "BYCLICK"
          },
        };
      }
    }
    //赋值部分
    that.setData({
      toView: toView,
      markers: markertxtarry, //坐标
      prolist: protxtarry, //底部的列表
    })
  },
  //跳转到详情页面
  godetail: function(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../home/detail?id=' + id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;

    //参数部分
    //var menuchk=getMenuChk();//得到选中的菜单

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
      polyline: [{
        points: [
          {
            longitude: 116.307420,
            latitude: 39.984060
          },
          {
            longitude: 116.308520,
            latitude: 39.984060
          }, 
          {
            longitude: 116.317520,
            latitude: 39.984060
          },
          {
            longitude: 116.309520,
            latitude: 39.985260
          },
          {
            longitude: 116.303520,
            latitude: 39.986060
          },
          {
            longitude: 116.304520,
            latitude: 39.987060
          }
        ],
        color: "#0000ff",
        width: 3,
        dottedLine: false,//虚线
        arrowLine:true,//带箭头的线
        arrowIconPath:'/resources/head.png',//箭头的图片
      }], //线路部分
    });

    //底部的对应的信息部分
    var prolist = [{
        id: "pro1",
        name: 'A',
        imgpath: '/resources/tu1.jpg',
        ischk: true,
        no: 1
      },
      {
        id: "pro2",
        name: 'B',
        imgpath: '/resources/tu2.jpg',
        ischk: false,
        no: 2
      },
      {
        id: "pro3",
        name: 'C',
        imgpath: '/resources/tu3.jpg',
        ischk: false,
        no: 3
      },
      {
        id: "pro4",
        name: 'D',
        imgpath: '/resources/tu1.jpg',
        ischk: false,
        no: 4
      },
      {
        id: "pro5",
        name: 'E',
        imgpath: '/resources/tu2.jpg',
        ischk: false,
        no: 5
      },
      {
        id: "pro6",
        name: 'F',
        imgpath: '/resources/tu3.jpg',
        ischk: false,
        no: 6
      },
    ];
    that.setData({
      prolist: prolist,
      chkmapid: 1, //默认选中的地图Mark
      toView: "pro1",
    })

    //结束标识符
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})