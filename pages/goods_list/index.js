// pages/goods_list/index.js
import {api} from '../../request/api/api.js';
Page({

  /**
   * 页面的初始数据
   */
  options: "", // 页面传递的参数
  total: 1, // 数据总量
  searchquery:{   // 搜索所需要的参数
    cid: "",  // id
    pagenum: 1, // 页码
    pagesize:10// 页容量
  },
  data: {
    tipsData: [
      {
        value: "综合",
        isSelect: true
      },
      {
        value: "销量",
        isSelect: false
      },
      {
        value: "价格",
        isSelect: false
      }
    ],
    curIndex:0,  // 当前展示那个内容页
    goodsList:[],  // 要展示的数据
  },

  /**
   * 监听tips自定义事件
   */
  tabsItemChange(e){
    this.changeTipAndContent(e);
  },

  /**
   * 改变内容和tips选择
   * @param {*} options 
   */
  changeTipAndContent(e){
    const tips = this.data.tipsData;
    const {current} = e.detail;
    tips.forEach((element, i) => {
      if(i=== current ){
        element.isSelect = true;
      }else{
        element.isSelect = false;
      }
    });
    this.setData({
      tipsData:tips,
      curIndex:current,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 请求数据的参数
    this.options = options;
    this.searchquery = {  
      ...this.searchquery,
      cid:this.options.cid
      }
    // 请求数据
    this.getGoodsList();
  },

  // 根据接口获取数据
  getGoodsList(){
    if (this.searchquery.pagenum > this.total){
      wx.showToast({
        title: '已加载全部内容',
        mask:true,
      });
      }else{
        // 请求数据
        api.getGoodsList(this.searchquery).then((res) => {
          // 判断是否要计算页码
            const total  = res.data.message.total;
            this.total = Math.ceil(total / this.searchquery.pagesize);
          // 请求到数据
          this.setData({
            goodsList : [...this.data.goodsList,...res.data.message.goods]
          });
          // 取消下拉动作
          wx.stopPullDownRefresh();
        });
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 1 重置请求参数
      this.searchquery = {  
        pagenum: 1, // 页码
        pagesize:10,// 页容量
        cid:this.options.cid
      }
    // 2 清空之前的数据
    this.setData({
      goodsList:[]
    });
    // 3 发送请求获取新数据
    this.getGoodsList(); 
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
     // 请求数据的参数
    const pagenum = this.searchquery.pagenum + 1;
     this.searchquery = {  
      ...this.searchquery,
        pagenum
      }
    // 请求数据
    this.getGoodsList();
  },
})