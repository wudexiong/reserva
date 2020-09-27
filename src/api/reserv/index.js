/*
* 预订午餐相关的API请求集合
*/
import api from '../index';

/*
获取某周菜单数据 （不用，暂时保留）
Params说明：
currdate	— 当前日期，或者是获取菜单那个周内的任一日期

*/
export function weekmenu(Params) {
    return api.post('/reserv/weekmenu', Params);
}

/*
获取第二天菜单数据
Params说明：
传入空对象{}

*/
export function nextdaymenu(Params) {
    return api.post('/reserv/nextdaymenu', Params);
}


/*
提交订单
格式：
Params：
{
token: token
orderTime: orderTime,
dinningTime: dinningTime,
food:
[
{foodId: foodId, foodName: foodName, foodAmt: foodAmt},
{foodId: foodId, foodName: foodName, foodAmt: foodAmt},
. . . . . .
]
}

Params说明：
orderTime	— 订餐日期
dinningTime	— 预订的就餐日期
foodId	— 单品Id（int类型）
foodName	— 单品名称
foodAmt	— 单品数量

*/
export function submitorder(Params) {
    return api.post('/reserv/submitorder', Params);
}


/*
订餐成功页面
Params说明：
orderId	— 订单Id（int类型）

*/
export function getorder(Params) {
    return api.post('/reserv/getorder', Params);
}

/*
历史订单
Params说明：
dinTime	— 预订的就餐日期（每个员工每天最多只有一个订单）

*/
export function getorderBytime(Params) {
    return api.post('/reserv/getorder_bytime', Params);
}

