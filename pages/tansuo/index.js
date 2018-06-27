// pages/tansuo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    seachtxt:'',//搜索框的值
    commentlist:[],//推荐的数据
    resultlist:[],//搜索的结果
    issearch:true,//是否搜索
    typeval:0,//从首页地图传递过来的类型，用于获取推荐使用
  },
  //得到搜索框的值
  getsearch:function(e){
    var that=this;
    var txtval=e.detail.value;
    if (txtval!=''){
      that.setData({
        issearch:true,
        seachtxt: txtval
      })
    }
    //得到搜索的值
    that.getresultlist();    
  },
  //得到搜索的值
  getresultlist:function(){
    var that=this;
    var seachtxt = that.data.seachtxt;

    var resultlist=[
      {
        id:1,
        imgpath:'/resources/tu1.jpg',
        enname:'维多利亚女王大厦',
        address:'455 George St,Sydney NSW 2000'
      },
      {
        id: 2,
        imgpath: '/resources/tu2.jpg',
        enname: '悉尼歌剧院',
        address: '455 George St,Sydney NSW 2000'
      },
      {
        id: 3,
        imgpath: '/resources/tu3.jpg',
        enname: '国家海洋博物馆',
        address: '455 George St,Sydney NSW 2000'
      },
    ];
    that.setData({
      resultlist: resultlist
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var that=this;

     var commentlist= [
      {
        id:1,
        cnname:'悉尼歌剧院',
        enname:'Sydney Opera Hourse',
        imgpath:'/resources/tu1.jpg'
      },
      {
        id: 2,
        cnname: '悉尼港午餐游轮',
        enname: 'Sydney Opera Hourse',
        imgpath: '/resources/tu2.jpg'
      },
      {
        id:3,
        cnname: '悉尼塔自助餐厅',
        enname: 'Sydney Opera Hourse',
        imgpath: '/resources/tu3.jpg'
      },
      {
        id:4,
        cnname: '维多利亚女王大厦',
        enname: 'Sydney Opera Hourse',
        imgpath: '/resources/tu1.jpg'
      },
      {
        id: 5,
        cnname: '国家海洋博物馆',
        enname: 'Sydney Opera Hourse',
        imgpath: '/resources/tu2.jpg'
      },
      {
        id: 6,
        cnname: '血拼欢乐逍遥船',
        enname: 'Sydney Opera Hourse',
        imgpath: '/resources/tu3.jpg'
      },
    ];//推荐的数据

    that.setData({
      commentlist: commentlist
    })
     //结束标识符
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