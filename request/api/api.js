import {request} from '../index.js';
export const api = {
    // 获取首页了轮播图接口
    getSwiperList () {
        return request({
            url:'/home/swiperdata'
        });
    },
    // 获取首页分类导航接口
    getCataList () {
        return request({
            url: "/home/catitems"
        });
    },
    // 获取首页楼层接口
    getFloorData () {
        return request({
            url: "/home/floordata"
        });
    },
    // 获取分类数据
    getCategories () {
        return request({
            url: "/categories"
        });
    },
    // 获取数据列表
    getGoodsList(params){
        return request({
            url: "/goods/search",
            data: params
        });
    },
    // 商品详情页
    getGoodsInfo(params){

        return request({
            url: "/goods/detail",
            data: params
        });
    },
  // token值
  getToken(params) {
    console.log(params)
    return request({
      url: "/users/wxlogin",
      method:"post",
      data: params
    });
  }

}