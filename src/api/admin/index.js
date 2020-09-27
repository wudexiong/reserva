/*
* 公司行政管理相关的相关的API请求集合
*/
import api from '../index';

/*
获取员工记录
Params说明：
pageNo	— 分页查询的页编号
pageSize	— 分页查询的页大小（行数）

*/
export function evalquery(Params) {
    return api.post('/admin/getstaffs', Params);
}

/*
模糊查询员工记录
Params说明：
sName	— 员工姓名（部分），允许为空
phone	— 手机号（部分），允许为空
pageNo	— 分页查询的页编号
pageSize	— 分页查询的页大小（行数）

*/
export function getstaffsCondit(Params) {
    return api.post('/admin/getstaffs_condit', Params);
}


/*
新增员工
Params说明：
sname	— 员工姓名
phone	— 绑定手机号

*/
export function createstaff(Params) {
    return api.post('/admin/createstaff', Params);
}

/*
注销员工
Params说明：
staffId	— 员工Id（int类型）
*/
export function cancelstaff(Params) {
    return api.post('/admin/cancelstaff', Params);
}


/*
批量导入员工记录（.xlsx） — 暂不实现
Params说明：
staffId	— 员工Id

*/
export function loadstaffs(Params) {
    return api.post('/admin/loadstaffs', Params);
}

