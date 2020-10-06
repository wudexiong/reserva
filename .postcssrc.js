// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {},
    "postcss-pxtorem": {
      rootValue:32,// 对应16px 适配移动端750px宽度
      propList:['*'],
      selectorBlackList: ['.el-checkbox','!.el-date-editor','.el-date','.el-radio'],//过滤掉.el-开头的class，不进行rem转换
    }
  }
}
