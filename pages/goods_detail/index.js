// pages/goods_detail/index.js
import {api} from '../../request/api/api.js';
Page({

  /**
   * 页面的初始数据
   */
  options: "", // 页面参数
  previewImgArr :[], // 预览图片的列表
  // 购物车中的数据
  cartData:{}, 
  searchQuery:{ // 接口参数
    goods_id: "",
  },

  data: {
    goodsInfo:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.options = options;
    this.searchQuery.goods_id = options.goods_id;
    // 调用接口获取数据
    this.getGoodsInfo(this.searchQuery);
    this.cartData = wx.getStorageSync('cartGoods') || {goods: {},length: 0};
  },

  /**
   * 请求接口数据
   */
  getGoodsInfo (params) {
    api.getGoodsInfo(this.searchQuery).then((res)=>{
      this.setData({
        goodsInfo: res.data.message
      });
      this.previewImgArr = res.data.message.pics.map(v => v.pics_mid);
    });
  },
  /**
   * 预览图片
   */
  previewImg(e){
    const current = e.currentTarget.dataset.curimgurl;
    wx.previewImage({
      current,
      urls: this.previewImgArr,
    })
  },

  /**
   * 点击将商品到加入购物车
   */
  addCart(){
    const goodsCartInfo = this.data.goodsInfo;
    const goodsId = goodsCartInfo.goods_id;
    // 之前购物车存在这个商品
    if (this.cartData.goods[goodsId]) {
      this.cartData.goods[goodsId] ++;
    }else{
    // 之前购物车不存在这个商品
    this.cartData.goods[goodsId] = {
        ...goodsCartInfo,
        num:1,
        isSelect: false,
      }
      
      this.cartData.length  =  this.cartData.length + 1;
    }
    wx.setStorage({
      data: this.cartData,
      key: 'cartGoods',
    });
    // 提示用户成功加入购物车
    wx.showToast({
      title: '已加入购物车',
    })
  },

  /**
   * 点击立即购买
   */
  buy(){

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