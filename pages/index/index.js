//index.js

import {api} from '../../request/api/api.js'

//Page Object
Page({
  data: {
    swiperList:[], // 轮播图图片
    cataList:[], // 分类图片
    floorData: [], // 首页楼层数据
  },
  onLoad: function(options) {
    // 请求轮播图接口
    api.getSwiperList().then( (res) => {
      this.setData({
        swiperList: res.data.message
      });
    });

    // 请求分类图片接口
    api.getCataList().then((res)=> {
      this.setData({
        cataList: res.data.message
      });
    });

    // 请求楼层数据
    api.getFloorData().then((res)=> {
      this.setData({
        floorData: res.data.message
      });
    });
    
  },
  onReady: function() {
    
  },
  onShow: function() {
    
  },
  onHide: function() {

  },
  onUnload: function() {

  },
  onPullDownRefresh: function() {

  },
  onReachBottom: function() {

  },
  onShareAppMessage: function() {

  },
  onPageScroll: function() {

  },
  //item(index,pagePath,text)
  onTabItemTap:function(item) {

  }
});
  