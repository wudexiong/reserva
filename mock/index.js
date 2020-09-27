// mock用来模拟数据和接口的js库

import Mock from 'mockjs'
;

const URL = 'http://localhost:3000';

// 用户登录
Mock.mock(`${URL}/users/signin`, (o) => {
    console.log(o.body);
    return Mock.mock({
        code: 0,
        token: '@id',
    });
});
