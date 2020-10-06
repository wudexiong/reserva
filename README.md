# 开发思路流程

## 餐品评价页面逻辑思路
- 星级评价选择器中的评分需要过滤，将过滤后的数据存再data中然后再发起请求
- 评论内容需要验证，最少4给字符
- 匿名和实名提交
- 点击确定，提交参数，用acync await处理异步请求，拿到结果
- 请求成功跳转到历史订单页面
- 请求失败提示用户

## 公司行政管理页面
### 员工管理
- 请求员工列表数据 赋值给data 渲染DOM
- 新增员工
    + 获取输入框的内容 正则验证是否合格
    + 合格发起请求，给对应参数，处理异步请求拿到结果
    + 成功，发起获取员工列表请求，渲染dom
    + 失败，提示错误信息，清理输入框
- 注销员工
    + 点击注销按钮 获取员工id
    + 发起请求 处理异步，拿到结果
    + 成功，发起获取员工列表请求，渲染dom
    + 失败提示用户

## 员工食堂管理
### 菜单管理
- 首先需要定义几个变量储存一些数据
    + 本周菜单
        * 周一到周日分别划分7个数组存储，便于增删改查
        * 需要提交修改后的周菜单时，合并7个数组，返回给后端  
    + 下周菜单
        * 拷贝本周的菜单，这里利用深拷贝复制菜单
        * 需要提交时，合并数组，提交
- 获取数据 处理数据 提交数据
    + 获取本周菜单数据 参数-1时表示获取本周数据
    + http://地址:3000/canadmin/weekmenu 参数weekId -1
    + 迭代获取的对象，按周一到周日划分7个数组存储，把请求中的dada数组变成对象，并且存储7个数组
    + 把储存好的数据放在vue dada中，分别渲染七个列表
    + 当点击下周或者跳转到其他路由页面时，合并7个数组并发起请求，处理异步，提示用户修改成功没有

    + 点击下周按钮，判断下周列表数据是否为空，为空，发起请求
    + 请求成功，深拷贝本周菜单数据，并渲染到DOM中
    + （这里有个疑问，获取某周菜单数据 中-1是本周，那0是不是下周呢，接口说明文档没写）
    + （拷贝的本周的id，那下周和本周id是相同的，接口文档并没有说，只说了复制本周菜单，而请求参数也没有下周的id）
    + 然后还是点击本周按钮或者跳转其他路由时，合并7个数组，发起修改菜单的请求，并提示用户
- 本周和下周的切换用一个变量控制，当为true时本周渲染，为false时下周渲染，提交数据同理
### 菜单管理中点击新增菜品的所有菜品列表（使用vuex）
- 这个请求数据一次就好了，先递归请求到一二三级菜单列表,处理数据成树形结构，并且保持到vuex中
- 当点击新增时，去vuex中拿数据，没有再请求。
- 取消，就渲染对应周的那一天的数组，渲染出来，形成一个删除的数组id，遍历找到对应的id，删除掉
- 取消删除时弹框提示用户确定取消

#### 无论是增加还是删除都要发起请求，然后删除对应的数据，最后修改本周菜谱提交数据。

#### 可以选择不分成7个数组，根据id去找出对应的数据，然后对齐进行增删该查，这要看怎样更好，以及发起请求的次数。

## 餐品及类别管理
### 思路
- 先获取一级分类，看第一个默认选择的有没有2级分类，有就渲染，没有就不渲染，就是获取已经分类的第一个以及它的所有子分类
- 当点击其他一级分类时，请求对应的其他子分类，然后渲染
- 这里每请求一个数据就选存在vuex中，看vuex中有没有对应表示id的一级分类以及下面的所有子分类，有就不请求了
- 增加删除的操作也是一样获取id，发起请求，成功，然后把vuex中对应的数据删除，或者增加
### 原则就是尽量少发起请求，做局部改动，最终要形成数结构，点击一个一级菜单就请求二三级菜单类别，以此类推
### 找出他们的规律，做成相应功能的函数

