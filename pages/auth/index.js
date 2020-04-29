// pages/auth/index.js
import { api } from '../../request/api/api.js'
import {login} from '../../utils/asyncWx.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 获取用户信息
   */
  hanleGetUserInfo(e){
    // 用户信息
    const { encryptedData, rawData, iv, signature } = e.detail;
    // 获取登录的code
    login().then((res) => {
      const code = res.code;
      // 获取token值
      const longinParmas = {encryptedData, rawData, iv, signature, code};
      api.getToken(longinParmas).then((res) => {
        console.log(res);
      });
    });
  

  },
})