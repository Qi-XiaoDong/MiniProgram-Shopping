/**
 * Promise 的 wx.openSetting
 */
export const openSetting = () => {
    return new Promise((resolve, reject) => {
       wx.openSetting({
           success: (res) => {
                resolve(res);
           },
           error: (errmsg) => {
                reject(errmsg);
           }
       }); 
    });
};


/**
 * Promise 的 wx.chooseAddress
 */
export const chooseAddress = () => {
    return new Promise((resolve, reject) => {
       wx.chooseAddress({
           success: (res) => {
                resolve(res);
           },
           error: (errmsg) => {
                reject(errmsg);
           }
       }); 
    });
};


/**
 * Promise 的 wx.getSetting
 */
export const getSetting = () => {
    return new Promise((resolve, reject) => {
       wx.getSetting({
           success: (res) => {
                resolve(res);
           },
           error: (errmsg) => {
                reject(errmsg);
           }
       }); 
    });
};

/**
 * Promise 的 wx.login
 */
export const login = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout:10000,
      success: (res) => {
        resolve(res);
      },
      error: (errmsg) => {
        reject(errmsg);
      }
    });
  });
};