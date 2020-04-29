// pages/category/index.js
import {api} from "../../request/api/api.js"
Page({
  category : [], // 存储数据
  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList: [], // 左侧导航选项
    rightContent: [],  // 右侧内容
    curIndex : 0, // 当前选择的目录
    top:0, // 每次点击后页面的位置
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /**
     * 1. 获取本地旧数据
     * 2. 没有数据旧数据直接发送请求
     * 3. 有旧数据，检查有没有过期， 过期发送请求， 没有过期直接使用
     */

    // 1 本地获取
    const categoryData = wx.getStorageSync('category');
   
    // 2 判断
    if (!categoryData) {
      // 没有数据，直接请求
      this.getCategories();
    }else{
      // 检查是否过期
      if (+new Date() - categoryData.time > 1000*60*60*60) {
        // 过期
        this.getCategories();
      }else {
        // 直接使用
        this.category = categoryData.data;
        this.getMain(this.category);
      }
    }
  },

  // 获取分类数据 并且缓存到本地
  getCategories(){
    api.getCategories().then((res)=>{
      this.category = res.data.message;
      // 得到左侧导航选项  右侧内容
      this.getMain(this.category);
      wx.setStorageSync('category', {
        time:+new Date(),
        data: res.data.message
      });
    });
  },

  // 点击改变menu
  changeMenu(e){
    this.setData({
      curIndex: e.currentTarget.dataset.index
    });

    let rightContent = this.category[this.data.curIndex].children;
    this.setData({
      rightContent,
      top:0
    });
  },

  
/**
 * @desc 计算 左侧导航选项  右侧内容
 * @param dataInfo {Array} 页面数据
 */ 
  getMain (dataInfo) {
    let leftMenuList = dataInfo.map(item => item.cat_name);
    let rightContent = dataInfo[this.data.curIndex].children;
    this.setData({
      leftMenuList,
      rightContent
    });
  },
})