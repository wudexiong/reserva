/*
* user用户相关的API请求集合
*/
import api from '../index';

/*
员工登录
Params说明：
loginId	— 登录名
passwd	— 已加密密码

*/
export function signin(Params) {
    return api.post('/users/signin', Params);
}


/*
员工注册
Params说明：
loginId	— 登录名
passwd	— 已加密密码
uname	— 员工姓名
phoneNum	— 手机号

*/
export function signup(Params) {
    return api.post('/users/signup', Params);
}

/*
重置密码
Params说明：
loginId	— 登录名
passwd	— 已加密新密码
uname	— 员工姓名
phoneNum	— 手机号

*/
export function resetpwd(Params) {
    return api.post('/users/resetpwd', Params);
}

/*
获取个人信息
Params说明：
传入空对象{}
*/
export function getinfor(Params) {
    return api.post('/users/getinfor', Params);
}
