<template>
  <el-container>
    <el-aside width="200px"
      ><div class="grid-content bg-purple-dark">
        <el-avatar :size="100" icon="el-icon-user-solid"></el-avatar>
        <ul class="list">
          <li class="el-icon-user">员工管理</li>
          <li>员工列表</li>
        </ul>
      </div>
    </el-aside>
    <el-container>
      <el-header
        ><el-card>
          <div slot="header" class="header">
            <el-button class="but">退出</el-button>
          </div>
        </el-card>
      </el-header>
      <el-main>
        <el-card>
          <div class="sousuo">
            <input type="text" />
            <input type="text" />
            <button>搜索</button>
          </div>
          <p class="title">员工信息</p>
          <el-table :data="tableData">
            <el-table-column prop="date" label="编号" width="180">
            </el-table-column>
            <el-table-column prop="name" label="员工姓名" width="180">
            </el-table-column>
            <el-table-column prop="address" label="员工手机号">
            </el-table-column>
            <el-table-column prop="adbc" label="状态  "> </el-table-column>
            <el-table-column prop="adbc" label="操作"> </el-table-column>
          </el-table>
          <el-pagination background layout="prev, pager, next" :total="1000">
          </el-pagination>
        </el-card>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'admin',
  data() {
    return {};
  },
};
</script>

<style lang='scss' scoped>
/deep/.el-aside {
  background-color: #ff8d1c;
  width: 231px;
  height: 100vh;
  display: flex;
  justify-content: center;
  .el-avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 58px;
    background: #ffca95;
    .el-icon-user-solid {
      line-height: 100px;
      font-size: 100px;
      color: #ff8d1c;
    }
  }
}
/deep/.list {
  margin-top: 60px;
  li {
    color: #fff;
    font-size: 30px;
    padding: 10px;
    margin-top: 30px;
    i {
      width: 20px;
      height: 20px;
      color: #fff;
      font-size: 30px;
      margin-right: 16px;
    }
  }
}
/deep/.el-card.is-always-shadow {
  display: flex;
  align-items: center;
}
/deep/ .el-card__header {
  width: 100%;
  display: flex;
  align-content: center;
  justify-content: flex-end;
  .el-button {
    border: 2px solid #ff8d1c;
    width: 141px;
    height: 52px;
    color: #ff8d1c;
  }
}
.sousuo {
  display: flex;
  margin-bottom: 20px;
  input {
    background: #fafafa;
    border: 2px solid #cccccc;
    margin-right: 20px;
    border-radius: 10px;
    height: 50px;
  }
  button {
    background: #ff8d1c;
    padding: 0 20px;
    color: #fff;
    border-radius: 10px;
    border: 0;
  }
}
.title{
  color: #ffb884;
  margin-bottom: 20px;
}
</style>
