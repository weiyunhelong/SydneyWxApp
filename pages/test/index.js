// pages/canvastu/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shareImgSrc: '',//分享的图
    sharetxt: '',//分享的文字
    baitxt: '',//打败的文字
    scale:1.6,//缩放比例
    portrait_temp: '',//分享的图片
    qrcode_temp: "/resources/wxcode.jpg",//小程序码
    windowWidth: 0,//
    windowHeight: 0,//
    shareimg: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //得到参数信息
    that.setData({
      portrait_temp: "/resources/sharetu.png",
      sharetxt: "文案文字1",
      baitxt: "文案文字2"
    })
    //得到设备的信息
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowWidth: res.windowWidth,//
          windowHeight: res.screenHeight,//
        })
        //绘图
        that.drawImage();
      },
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //绘制图片
  drawImage: function () {
    //绘制canvas图片
    var that = this
    const ctx = wx.createCanvasContext('myCanvas')
    var bgPath = '/resources/Bg_Share.png';//背景图
    var logo = '/resources/ta.png';//LOGO部分
    var ditu = '/resources/ditumap.jpg';//地图部分
    var portraitPath = '/resources/tu1.jpg';//头像
    var hostNickname = "夜未央";//微信昵称
    var qrPath = '/resources/wxcode.jpg';//头像
    var qipao = '/resources/timg.jpg';//气泡文字
    var windowWidth = that.data.windowWidth;//宽度
    var windowHeight = that.data.windowHeight;//高度
    //绘制背景图片
    ctx.drawImage(bgPath, 0, 0, windowWidth, windowHeight);
    ctx.save();

    //绘制第一段文本
    ctx.setFillStyle('#ffffff');
    ctx.setFontSize(0.074 * windowWidth);
    ctx.setTextAlign('center');
    ctx.fillText("Sydney", windowWidth / 2, 0.10 * windowWidth);

    //绘制矩形框,做内容背景
    ctx.rect(10, 60, windowWidth - 20, windowWidth*1.4);
    ctx.setFillStyle('white');
    ctx.fill();

    //内容第一部分
    ctx.setFillStyle('#333');
    ctx.setFontSize(0.042 * windowWidth);
    ctx.fillText("跟" + hostNickname, 60, 0.28 * windowWidth);

    ctx.setFillStyle('#0cf');
    ctx.setFontSize(0.042 * windowWidth);
    ctx.fillText("一起探索悉尼", 80, 0.35* windowWidth);
    
    ctx.beginPath();
    ctx.drawImage(logo, 0.75 * windowWidth, 0.18 * windowWidth, 0.2 * windowWidth, 0.2 * windowWidth);
    ctx.closePath();

    //内容的第二部分
    ctx.beginPath();
    ctx.drawImage(ditu, 30, 0.4 * windowWidth, 0.85 * windowWidth, 0.7 * windowWidth);
    ctx.closePath();

    //微信头像
    ctx.beginPath();
    ctx.drawImage(portraitPath, 30, windowWidth*1.15, 0.15 * windowWidth, 0.15 * windowWidth);
    //气泡文字
    ctx.drawImage(qipao, 0.25 * windowWidth, windowWidth * 1.15, 0.15 * windowWidth, 0.15 * windowWidth);
    ctx.closePath();


    //小程序码
    ctx.beginPath();
    ctx.drawImage(qrPath, windowWidth * 0.4, windowWidth * 1.3, 0.2 * windowWidth, 0.2 * windowWidth);
    ctx.closePath();
    ctx.draw();

   
    wx.showLoading({
      mask: true,
      title: '请稍候....',
    })
    setTimeout(function () {
      that.canvasToImage();
    }, 3000)
   
  },
  //保存成图片
  canvasToImage: function () {
    var that = this
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: that.data.windowWidth,
      height: that.data.windowWidth * that.data.scale,
      destWidth: that.data.windowWidth * 4,
      destHeight: that.data.windowWidth * 4 * that.data.scale,
      canvasId: 'myCanvas',
      success: function (res) {
        console.log('足迹照片生成成功:' + res.tempFilePath);
        var shareimg = res.tempFilePath;

        that.setData({
          shareimg: shareimg
        })
        //图片保存到手机
        that.saveImgToPhone();
      },
      fail: function (err) {
        console.log('失败')
        console.log(err)
      }
    })
    wx.hideLoading();
  },
  //将图片保存到相册
  saveImgToPhone: function () {
    var that = this;
    wx.saveImageToPhotosAlbum({
      filePath: that.data.shareimg,
      success(res) {
        wx.showModal({
          title: '提示',
          content: '已保存到相册',
          showCancel: false,
          confirmText: '知道了',
          confirmColor: '#72B9C3',
        })
      },
      fail(res) {
        wx.showModal({
          title: '提示',
          content: '保存相册失败',
          showCancel: false,
          confirmText: '返回',
          confirmColor: '#72B9C3',
        })
      },
    })
    wx.navigateTo({
      url: '../my/index',
    })
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