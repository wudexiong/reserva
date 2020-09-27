/*
* 公司食堂后台相关的API请求集合
*/

import api from '../index';

/*
创建菜谱本周日历
Params说明：
传入空对象{}

*/
export function neweekdays(Params) {
    return api.post('canadmin/neweekdays', Params);
}

/*
获取某周菜单数据
Params说明：
weekId	— 某周的周编号，-1时表示获取本周数据

*/
export function weekmenu(Params) {
    return api.post('canadmin/weekmenu', Params);
}


/*
创建下周菜单（复制本周菜单至下周，若下周已有数据则不覆盖）
Params说明：
传入空对象{}

*/
export function copymenu(Params) {
    return api.post('canadmin/copymenu', Params);
}


/*
 获取一级餐品类别列表
Params说明：
传入空对象{}

*/
export function getcat1(Params) {
    return api.post('canadmin/getcat1', Params);
}

/*
 获取二级餐品类别列表
Params说明：
oneId	— 餐品一级类别Id

*/
export function getcat2(Params) {
    return api.post('canadmin/getcat2', Params);
}


/*
 获取三级餐品类别列表
Params说明：
oneId	— 餐品一级类别Id
twoId	— 餐品二级类别Id

*/
export function getcat3(Params) {
    return api.post('canadmin/getcat3', Params);
}

/*
 获取餐品列表
Params说明：
oneId	— 餐品一级类别Id
twoId	— 餐品二级类别Id
threeId	— 餐品三级类别Id

*/
export function getfoods(Params) {
    return api.post('canadmin/getfoods', Params);
}

/*
 确定修改（提交修改后的一周菜谱）
Params：
{
token=token
data:
[
{
weekId:weekId,
weekDays: weekDays
corrDate: corrDate
foodId: foodId,
},
. . . . . .
]
}
Params说明：
weekId	— 周编号，因为是修改一周数据，在提交的一批记录中是同一个值
weekDays	— 周日期，周一至周日分别对应1 至 7
corrDate	— 对应日期
foodId	— 单品Id

*/
export function updatemenu(Params) {
    return api.post('canadmin/updatemenu', Params);
}


/*
 添加单品
Params说明：
weekId	— 周编号
weekDays	— 周日期，周一至周日分别对应1 至 7
foodId	— 单品Id

*/
export function addfood(Params) {
    return api.post('canadmin/addfood', Params);
}

/*
 取消单品
Params说明：
weekId	— 周编号
weekDays	— 周日期，周一至周日分别对应1 至 7
foodId	— 单品Id

*/

export function cancelfood(Params) {
    return api.post('canadmin/cancelfood', Params);
}


/*
 创建一级餐品类别
Params说明：
oneName	— 新建餐品一级类别的名称

*/
export function createcat1(Params) {
    return api.post('canadmin/createcat1', Params);
}

/*
 创建二级餐品类别
Params说明：
oneId	— 餐品一级类别Id
twoName	— 新建餐品二级类别的名称


*/
export function createcat2(Params) {
    return api.post('canadmin/createcat2', Params);
}


/*
 创建三级餐品类别
Params说明：
oneId	— 餐品一级类别Id
twoId	— 餐品二级类别Id
threeName	— 新建餐品三级类别的名称

*/
export function createcat3(Params) {
    return api.post('canadmin/createcat3', Params);
}


/*
 创建单个餐品
Params说明：
oneId	— 餐品一级分类Id
twoId	— 餐品二级分类Id
threeId	— 餐品三级分类Id
foodName	— 新建餐品的名称
foodFee	— 新建餐品单价

*/
export function createfood(Params) {
    return api.post('canadmin/createfood', Params);
}


/*
 删除一级餐品类别
Params说明：
oneId	— 餐品一级类别Id

*/
export function delcat1(Params) {
    return api.post('canadmin/delcat1', Params);
}

/*
 删除二级餐品类别
Params说明：
oneId	— 餐品一级类别Id
twoId	— 餐品二级类别Id

*/
export function delcat2(Params) {
    return api.post('canadmin/delcat2', Params);
}

/*
 删除三级餐品类别
Params说明：
oneId	— 餐品一级类别Id
twoId	— 餐品二级类别Id
threeId	— 餐品三级类别Id

*/
export function delcat3(Params) {
    return api.post('canadmin/delcat3', Params);
}

/*
 删除某个餐品
Params说明：
foodId	— 餐品Id

*/
export function delfood(Params) {
    return api.post('canadmin/delfood', Params);
}


/*
 获取评价记录
Params说明：
sortField	— 排序字段，只能是evalnum（星级）、evaltime（评价日期）之一
sortway	— 排序方式，只能是1（升序）或0（降序）
pageNo	— 分页查询的页编号
pageSize	— 分页查询的页大小（行数）

*/
export function evalquery(Params) {
    return api.post('canadmin/evalquery', Params);
}
