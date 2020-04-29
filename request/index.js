let num = 0;
export const request = (params)=>{
    num++;
    return new Promise ( (resolve, reject) => {
        wx.showLoading({
          title: '加载中',
          mask: true,
        })
        wx.request({
            ...params,
            url: "https://api-hmugo-web.itheima.net/api/public/v1" + params.url,
            success: (res)=>{
                resolve(res);
            },
            fail: (err)=>{
                reject(err);
            },
            complete:()=> {
                num--;
                if (num === 0) {
                    wx.hideLoading();
                }
            }
        });
    });
}