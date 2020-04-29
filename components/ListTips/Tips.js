// components/ListTips/Tips.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tips: {
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeItemTap(e){
      //获取到点击的索引
      console.log(e)
      const current = e.currentTarget.dataset.current;
      // 触发父组件中的数据
      this.triggerEvent("tabsItemChange", {current});
    }
  }
})
