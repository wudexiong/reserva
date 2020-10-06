export default {
    // 获取明天时间
    timeTomorrow() {
      let d = new Date();
      // d = 明天的时间戳
      d = d.setDate(d.getDate() + 1);
      // d = 创建明天的时间
      return new Date(d);
    },
  };
