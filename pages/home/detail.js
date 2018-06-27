// pages/home/detail.js
var wxDraw = require("../../utils/wxdraw.min.js").wxDraw;
var Shape = require("../../utils/wxdraw.min.js").Shape;
var AnimationFrame = require("../../utils/wxdraw.min.js").AnimationFrame;
const backgroundAudioManager = wx.getBackgroundAudioManager();//背景音乐
var timetool=require('../../utils/time.js');//时间工具
var timeInterval='';//计时器


Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,//项目id
    cnname:'',//中文名称
    enname:'',//英文名称
    typeval:'',//类型值
    mode: "scaleToFill",
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    imglist:[],//轮播图
    hours:'',//推荐时长
    timetip:'',//开放时间段

    smcnabout: '',//缩小关于
    allcnabout:'',//全部关于
    iscnmore:false,//显示更多
    cnaudiosrc:'',//中文音频
    cnclock:'',//
    cnplaymin: 0,
    cnplaysec: 0,
    cnisplay: false,

    smenabout: '',//缩小关于
    allenabout: '',//全部关于
    isenmore: false,//显示更多
    enaudiosrc: '',//英文音频
    enclock:'',// 
    enplaymin: 0,
    enplaysec: 0,
    enisplay: false,
   
    julitxt:'',//距离
  	wxCanvas: null//canvas部分
  },
  //收起更多状态的替换
  changeshowinfo:function(e){
    var that=this;
    var id=e.currentTarget.dataset.id;
    if(id=="1"){
      that.setData({
        iscnmore: !that.data.iscnmore
      })
    }else{
      that.setData({
        isenmore: !that.data.isenmore
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var that=this;
     
     that.setData({
       //id: options.id,//项目id
       cnname: '悉尼歌剧院',//中文名称
       enname: 'Benelong Point,Sydney NSW 2000',//英文名称
       typeval: '景点',//类型值
       imglist: [
         '/resources/tu1.jpg', '/resources/tu2.jpg', '/resources/tu3.jpg',
       ],//轮播图
       hours: '推荐游玩时间&nbsp;&nbsp;&nbsp;&nbsp;1hr',//推荐时长
       timetip: 'Tours&nbsp;&nbsp;operate&nbsp;&nbsp;daily&nbsp;&nbsp;between&nbsp;&nbsp;9am&nbsp;&nbsp;and&nbsp;&nbsp;5pm',//开发时间段
       smcnabout: '在悉尼歌剧院的台阶上留影纪念，接着参加”悉尼歌剧院导览“(Sydeney Opera Hourse Tour) 或”后台参观之旅“(Backstage Tour),在歌剧院内部一探究竟。导览提供各种语言，包括普通股、韩语、日',//缩减关于
       allcnabout: '在悉尼歌剧院的台阶上留影纪念，接着参加”悉尼歌剧院导览“(Sydeney Opera Hourse Tour) 或”后台参观之旅“(Backstage Tour),在歌剧院内部一探究竟。导览提供各种语言，包括普通股、韩语、日语等。\n在悉尼歌剧院的台阶上留影纪念，接着参加”悉尼歌剧院导览“(Sydeney Opera Hourse Tour) 或”后台参观之旅“(Backstage Tour),在歌剧院内部一探究竟。导览提供各种语言，包括普通股、韩语、日语等。\n在悉尼歌剧院的台阶上留影纪念，接着参加”悉尼歌剧院导览“(Sydeney Opera Hourse Tour) 或”后台参观之旅“(Backstage Tour),在歌剧院内部一探究竟。导览提供各种语言，包括普通股、韩语、日语等。',//全部关于
       iscnmore: false,//显示更多
       cnaudiosrc: 'http://96.ierge.cn/13/203/407369.mp3',//中文音频
       cnclock: timetool.TimeToString(0,0),
       cnaudionTime:'01:30',//中文时长
       enaudiosrc: 'http://96.ierge.cn/13/203/407369.mp3',//英文音频
       enaudionTime: '01:30',//英文时长
       enclock: timetool.TimeToString(0, 0),
       julitxt: '太远啦，无法计算距离~',//距离
     })
     
     var that=this;
     //canvas部分
     var context = wx.createCanvasContext('cndraw');
     this.wxCanvas = new wxDraw(context, 0, 0, 80, 80);
     /**
      * 由于 小程序没有Dom 操作，所以没法获取canvas高度以及绘图的起点
      * 所以 wxDraw初始化的时候 需要设置 以便点击检测的时候使用
     */

     let r = [];
     for (var i = 0; i < 15; i++) {
       r[i] = new Shape('rect', { x: 10 * i, y: 20, w: 5, h: 10, fillStyle: "#000", opacity: 0.2 }, 'fill', false);
       this.wxCanvas.add(r[i]);
       (function (i) {
         let n = 0;
         if (i <= 7) {
           n = 7 - i;
         } else {
           n = i - 7;
         }
         setTimeout(function () {
           r[i].animate({ 'h': "+=20", opacity: 1 }, { duration: 1000 }).animate({ 'h': "-=20", opacity: 0.2 }, { duration: 1000 }).start(true);
         }, n * 100 + 1000);
       })(i)
     }
    
     //结束标识符
  },
  //中文音频的播放
  gocnplay:function(){
    var that=this;
    
    that.setData({
      cnisplay: true
    })

    backgroundAudioManager.title = '此时此刻'
    backgroundAudioManager.epname = '此时此刻'
    backgroundAudioManager.singer = '许巍'
    backgroundAudioManager.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46' // 设置了 src 之后会自动播放
    backgroundAudioManager.play();
    var cnplaysec = that.data.cnplaysec;//秒
    var cnplaymin = that.data.cnplaymin;//分
    //计算时间
    timeInterval= setInterval(function () {     
      //判断是否结束
      var isend = timetool.TimeIsEnd(that.data.cnaudionTime, cnplaymin, cnplaysec);
      if (isend){
        that.gocnpaush();
        that.setData({
          cnplaymin: 0,
          cnplaysec: 0,
          cnclock: timetool.TimeToString(0, 0)
        })
      }else{
        cnplaysec++;
        if (cnplaysec == 60) {
          cnplaymin++;
          cnplaysec = 0;
        }
        that.setData({
          cnplaymin: cnplaymin,
          cnplaysec: cnplaysec,
          cnclock: timetool.TimeToString(cnplaymin, cnplaysec)
        })
      }
    }, 1000)
  },
  //中文的暂停
  gocnpaush:function(){
    var that=this;
    that.setData({
      cnisplay: false
    })
    backgroundAudioManager.pause();
    clearInterval(timeInterval);
  },
  //跳转到地图页面
  gonext:function(){
    clearInterval(timeInterval);
    wx.navigateTo({
      url: '../map/index?id'+this.data.id,
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
    this.wxCanvas.clear(); //推荐这个
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