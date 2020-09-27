/*
* 餐品评价相关的API请求集合
*/
import api from '../index';
/*
餐品评价列表 （不用，暂时保留）
Params说明：
sortFiled	— 排序字段，只能是evalnum（星级）、evaltime（评价日期）之一
sortway	— 排序方式，只能是1（升序）或0（降序）
pageNo	— 分页查询的页编号
pageSize	— 分页查询的页大小（行数）

*/
export function evalquery(Params) {
    return api.post('/eval/evalquery', Params);
}


/*
餐品评价 （不用，暂时保留）
Params说明：
foodId	— 单品Id（int类型）
evalNum,	— 评价星数，值域：1~10，0 -未评价，1 - 0.5星、. . . 、10 - 5星
evalCont,	— 评价文字内容
realName	— 是否实名，实名- 1，匿名- 0
evalTime	— 评价时间

*/
export function submiteval(Params) {
    return api.post('/eval/submiteval', Params);
}
