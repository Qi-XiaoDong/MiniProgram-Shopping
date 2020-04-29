// pages/cart/index.js
/**
 * 1 获取地址：存入缓存
 *    在用户第一次取消授权后会出现问题
 *解决：
 *   获取用户对小程序授权获取地址的状态 wx.getSetting   wx.authorize
 *    1. true 代表授权 可以直接调用收获地址
 *    2  undefined 可以直接调用收获地址
 *    3. false  拒绝一次 则不可使用收获地址
 *        重新获取权限
 * 
 * 步骤 ：1  获取缓存中的地址,如果存在则显示详细地址 
 *        2. 渲染购物车中的数据
 *        3. 添加事件 handleCheckout handInputValue handNumChange
 * 
 * 
 * 
 * 
 * 
 **************************/
import {openSetting, chooseAddress, getSetting} from '../../utils/asyncWx.js'
Page({
   

  /**
   * 页面的初始数据
   */
  data: {
    cartData : {},
    address:{},
    allPrice:0,  // 总价格
    // 是否全选
    allSelect: false,
    // 选中的商品数量
    selectNum:0,
  },

  /**
   * 计算总价格
   */
  getAllPrice(){
    let allPrice = 0;
    const data = this.data.cartData.goods;
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (data[key].isSelect){
          allPrice += data[key].num * data[key].goods_price 
        }
      }
    }
    this.setData({
      allPrice,
    });
  },
  
  /**
   * 复选框事件 
   * 
  */
  handleCheckout (e){
    const goodsId = e.currentTarget.dataset.goodsid;
    const newCartData = this.data.cartData;
    const goods = newCartData.goods[goodsId];
    goods.isSelect = !goods.isSelect;
    this.setData({
      cartData: newCartData
    });
    // 同步到缓存
    this.setCartData(newCartData);
    // 检查是否全选
    this.checkAllSelect();
    // 检测选择的数量
    this.getSelectNum();
    // 计算总价格
    this.getAllPrice();

  },
  /**
   *检查是否全选
   */
  checkAllSelect(){
    const data = this.data.cartData.goods;
    let flag = true;
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (!data[key].isSelect){
          flag = false;
          break;
        }
      }
    }
    // 计算选择商品数量
    this.getSelectNum();
     // 计算总价格
    this.getAllPrice();
    this.setData({
      allSelect:flag,
    });

  },

  /**
   * 直接修改购物车某个商品数量
   */
  handInputValue(e){
    const goodsId = e.currentTarget.dataset.goodsid;
    const num = e.detail.value;
    this.checkGoodsValue(goodsId, num);
  },

  /**
   * 加减购物车商品数量 
   * */

  handNumChange(e){
    const {goodsid:goodsId, type} = e.currentTarget.dataset;
    const newCartData = this.data.cartData
    const goods = newCartData.goods[goodsId];
    const num = goods.num + +type;
    this.checkGoodsValue(goodsId,num);
  },
  /**
   * 校验每个商品的数量
   * @param {*} goodsId 商品id
   * @param {*} num 商品数量
   */
  checkGoodsValue(goodsId, num){
    const newCartData = this.data.cartData
    const goods = newCartData.goods[goodsId];
    if (num < 1) {
      delete newCartData.goods[goodsId];
      newCartData.length -= 1;
    }else {
      goods.num = num;
    }
    this.setData({
      cartData: newCartData
    });
    this.setCartData(newCartData);
    this.getSelectNum();
     // 计算总价格
     this.getAllPrice();
  },
  /**
   * 底部点击全选按钮
   */
  allSelectChange(){
    const flag = !this.data.allSelect;
    const data = this.data.cartData;
    let selectNum = 0;
    for (const key in data.goods) {
      if (data.goods.hasOwnProperty(key)) {
        data.goods[key].isSelect = flag;
      };
    }
    if (flag){
      selectNum=this.data.cartData.length;
    }else{
      selectNum = 0;
    }
     // 计算总价格
     this.getAllPrice();
    this.setData({
      allSelect:!this.data.allSelect,
      cartData:data,
      selectNum
    });
   
  },
  /**
   * 同步购物车商品
   * @param {*} data 修改后的数据 
   */
  setCartData(data){
    wx.setStorage({
      data: data,
      key: 'cartGoods',
    })
  },

  /**
   * 选择商品的数量
   */
  getSelectNum (){
    let num = 0;
    const data = this.data.cartData.goods;
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (data[key].isSelect){
          num++;
        }
      };
    }
    this.setData({
      selectNum:num
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 获取用户地址
   */
  hadleChooseAddress(){
    getSetting().then(res => {
      if (res.authSetting['scope.address'] === false){
        openSetting()
      }
      return chooseAddress()
    }).then(res => {
      // 地址存入到缓存
      res.all = `${res.provinceName}${res.cityName}${res.countyName}${res.detailInfo}`;
      wx.setStorageSync("address", res);
    })
  },

  /**
   * 页面显示
   */
  onShow:function () {
    const cartData = wx.getStorageSync('cartGoods');
    const address = wx.getStorageSync('address');
    this.setData({
      address,
      cartData,
    });
    // 检测是否全选
    this.checkAllSelect();
  },

  
})
