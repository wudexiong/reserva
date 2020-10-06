// mock用来模拟数据和接口的js库

import Mock from 'mockjs';

const URL = 'http://localhost:3000';
const DATA = [{
  orderTime: '2020-09-30T11:00:56.229Z',
  dinningTime: '2017-03-06',
  food: [{
    weekId: '650000200601202423',
    weekDays: '1',
    corrDate: '2017-03-06',
    foodId: '640000198605126753',
    foodName: 'Barbara Perez',
    foodAmt: 3,
  }],
  token: '230000201205186739',
}];
// 用户登录
Mock.mock(`${URL}/users/signin`, (o) => {
  if (o.body) {
    return Mock.mock({
      code: 0,
      token: '@id',
    });
  }
  return {
    code: -1,
    msg: '登录名或密码错误！',
  };
});


// 用户注册
Mock.mock(`${URL}/users/signup`, () => Mock.mock({
  code: 0,
  msg: '注册成功！',
  user: 'wudexiong',
}));

// 重置密码
Mock.mock(`${URL}/users/resetpwd`, () => Mock.mock({
  code: 0,
  msg: '重置密码成功',
}));


// 用户个人信息
Mock.mock(`${URL}/users/getinfor`, (o) => {
  if (o.body) {
    return Mock.mock({
      code: 0,
      msg: '获取信息成功！',

      infor: {
        uname: '@name',
        loginId: 'admin',
        phone: '@phone',
      },
    });
  }
  return {
    code: -3,
    msg: '用户已被禁用！',
  };
});


// 获取第二天菜单数据
Mock.mock(`${URL}/reserv/nextdaymenu`, (o) => {
  const data = JSON.parse(o.body);
  if (data.token) {
    return Mock.mock({
      code: 0,
      msg: '获取菜单数据成功',

      'data|20-30': [{
        weekId: '@id',
        weekDays: '1',
        corrDate: '@date',
        foodId: '@id',
        foodName: '@name',
      }],
    });
  }
  return {
    code: -3,
    msg: '用户已被禁用！',
  };
});


// 预定午餐 提交订单
Mock.mock(`${URL}/reserv/submitorder`, (o) => {
  DATA.push(JSON.parse(o.body));
  return Mock.mock({
    code: 0,
    orderId: '@id',
    msg: '订餐成功！',
  });
});

// 明天午餐订单信息
Mock.mock(`${URL}/reserv/getorder`, () => {
  const food = DATA[0].food;
  return Mock.mock({
    code: 0,
    msg: '获取订单数据成功！',
    order: {
      uname: 'uname',
      dinningTime: 'dinningTime',
      food,
    },
  });
});

// 历史订单信息
Mock.mock(`${URL}/reserv/getorder_bytime`, () => Mock.mock({
  code: 0,
  msg: '获取历史数据成功！',
  infor: {
    orderId: '@id',
    food: [{
        foodName: '@name',
        foodAmt: 1,
      },
      {
        foodName: '@name',
        foodAmt: 1,
      },
    ],
  },
}));

// 评论列表
Mock.mock(`${URL}/eval/evalquery`, () => Mock.mock({
  code: 0,
  data: {
    'food|10-30': [{
      foodName: '@name',
      evalNum: '10',
      evalCont: '@sentence',
      sName: '@cname',
      evalTime: '@date',
    }],
  },
  msg: '获取订单成功',
}));

// 提交评论
Mock.mock(`${URL}/eval/submiteval`, () => Mock.mock({
  code: 0,
  evaluateId: '@id',
  msg: '提交评价成功！',
}));


// 获取员工staff的列表
Mock.mock(`${URL}/admin/getstaffs`, () => Mock.mock({
  code: 0,
  'data|8': [{
    staffId: '@id',
    sName: '@name',
    loginId: '@id',
    phone: '@phone',
    wState: 0,
  }],
}));

// 获取模糊查询的员工staff的列表
Mock.mock(`${URL}/admin/getstaffs_condit`, () => Mock.mock({
  code: 0,
  'data|8': [{
    staffId: '@id',
    sName: '@name',
    loginId: '@id',
    phone: '@phone',
    wState: 1,
  }],
}));

// 新增员工
Mock.mock(`${URL}/admin/createstaff`, () => Mock.mock({
  code: 0,
  msg: '新增员工成功',
  staffId: '@id',
}));

// 新增员工
Mock.mock(`${URL}/admin/cancelstaff`, () => Mock.mock({
  code: 0,
  msg: '注销成功',
  },
  ));


// 创建菜谱本周日历
Mock.mock(`${URL}/canadmin/neweekdays`, () => Mock.mock({
  code: 0,
  msg: '获取数据成功！',
  data: [{
    weekId: '-1',
    weekDays: '1',
    corrDate: '@date',
  }],
}));

// 获取某周菜单数据
Mock.mock(`${URL}/canadmin/weekmenu`, () => Mock.mock({
    code: 0,
    msg: '获取菜单数据成功！',
    'data|21': [{
      weekId: '-1',
      'weekDays|1-7': 1,
      corrDate: '@date',
      foodId: '@id',
      foodName: '@name',
    }],
  }

  ,
));

// 增加单品
Mock.mock(`${URL}/canadmin/addfood`, () => Mock.mock({
  code: 0,
  msg: '添加单品成功！',
}));

// 取消单品
Mock.mock(`${URL}/canadmin/cancelfood`, () => Mock.mock({
  code: 0,
  msg: '取消单品成功！',
}));


// 1级类别
Mock.mock(`${URL}/canadmin/getcat1`, () => Mock.mock({
  code: 0,
  msg: '获取餐品类别成功！',
  'data|3-5': [{
    id: '@id',
    oneName: '@name',
  }],
}));

// 2级类别
Mock.mock(`${URL}/canadmin/getcat2`, () => Mock.mock({
  code: 0,
  msg: '获取餐品类别成功！',
  'data|3-5': [{
    id: '@id',
    oneName: '@name',
  }],
}));

// 3级类别
Mock.mock(`${URL}/canadmin/getcat3`, () => Mock.mock({
  code: 0,
  msg: '获取餐品类别成功！',
  'data|3-5': [{
    id: '@id',
    oneName: '@name',
  }],
}));

// foods单品
Mock.mock(`${URL}/canadmin/getfoods`, () => Mock.mock({
  code: 0,
  msg: '获取餐品类别成功！',
  'data|3-5': [{
    id: '@id',
    oneName: '@name',
  }],
}));

// 创建下周
Mock.mock(`${URL}/canadmin/copymenu`, () => Mock.mock({
  code: 0,
  msg: '创建下周菜单成功！',
  },
  ));


// 创建一级餐品类别
Mock.mock(`${URL}/canadmin/createcat1`, () => Mock.mock({
  code: 0,
  oneId: '@id',
  msg: '创建餐品类别成功！  ',
  }
  ,
  ));

  // 创建二级级餐品类别
Mock.mock(`${URL}/canadmin/createcat2`, () => Mock.mock({
  code: 0,
  oneId: '@id',
  msg: '创建餐品类别成功！  ',
  }
  ,
  ));


  // 创建三级级餐品类别
Mock.mock(`${URL}/canadmin/createcat3`, () => Mock.mock({
  code: 0,
  oneId: '@id',
  msg: '创建餐品类别成功！  ',
  }
  ,
  ));

    // 创建餐品单品
Mock.mock(`${URL}/canadmin/createfood`, () => Mock.mock({
  code: 0,
  oneId: '@id',
  msg: '创建餐品类别成功！  ',
  }
  ,
  ));
   // 删除一级类别
   Mock.mock(`${URL}/canadmin/delcat1`, () => Mock.mock({
    code: 0,
    oneId: '@id',
    msg: '删除成功！  ',
    }
    ,
    ));
    // 删除二级类别
   Mock.mock(`${URL}/canadmin/delcat2`, () => Mock.mock({
    code: 0,
    oneId: '@id',
    msg: '删除成功！  ',
    }
    ,
    ));

    // 删除三级类别
   Mock.mock(`${URL}/canadmin/delcat3`, () => Mock.mock({
    code: 0,
    oneId: '@id',
    msg: '删除成功！  ',
    }
    ,
    ));
      // 删除单品
   Mock.mock(`${URL}/canadmin/delfood`, () => Mock.mock({
    code: 0,
    oneId: '@id',
    msg: '删除单品成功！  ',
    }
    ,
    ));


       // 评论记录
   Mock.mock(`${URL}/canadmin/evalquery`, () => Mock.mock({
    code: 0,
    data:
    {
    'food|10':
    [
    {
    foodName: '@name',
    'evalNum|1-10': 5,
    evalCont: '@sentence',
      sName: '@cname',
      evalTime: '@date',
    },
    ],
    },
    }

    ,
    ));

