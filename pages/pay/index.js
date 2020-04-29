
Page({
   

  /**
   * 页面的初始数据
   */
  data: {
    cartData : {},
    address:{},
    allPrice:0,  // 总价格
    // 选中的商品数量
    selectNum:0,
  },


  
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
 
 /**
  * 计算总价格
  */
  getAllPrice(cartData){
    let allPrice = 0;
    for(let key in cartData.goods){
      allPrice += cartData.goods[key].num * cartData.goods[key].goods_price;
    }
    return allPrice;
  },
  /**
   * 页面显示
   */
  onShow:function () {
    // 获得到缓存购物车数据
    let data = wx.getStorageSync('cartGoods');
    // 获得到收货地址
    const address = wx.getStorageSync('address');
   
    // 过滤掉isSelect为false的商品
    const cartData = {
      goods:{},
      length:0
    }
    for (const key in data.goods) {
      if (data.goods.hasOwnProperty(key)) {
        if (data.goods[key].isSelect) {
          cartData.goods[key] = data.goods[key];
          cartData.length ++;
        }
      }
    }

    
    this.setData({
      address,
      cartData,
      selectNum:cartData.length,
      allPrice: this.getAllPrice(cartData),
    });
  },

  /**
   * 点击支付
   */
  handleOrderPay(){
    // 1.判断是否存在token,
    const token = wx.getStorageSync("token");
    // 不存在跳转去授权登录
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index',
      });
      return;
    }
    console.log("存在token");

  }
})
