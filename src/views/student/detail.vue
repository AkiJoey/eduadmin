<template>
  <div class="app-container">
    <!-- info -->
    <div id="info-container">
      <div class="info-item">
        <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      </div>
      <div class="info-item">
        <p>姓名:&nbsp;&nbsp;&nbsp;{{ name }}</p>
        <p>学号:&nbsp;&nbsp;&nbsp;{{ id }}</p>
        <p>班级:&nbsp;&nbsp;&nbsp;{{ this.class }}</p>
      </div>
    </div>
    <!-- tabs -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- base info -->
      <el-tab-pane label="基本信息">
        <div class="info-title">基本信息</div>
        <div class="info-text">
          <p>学院:&nbsp;&nbsp;&nbsp;{{ college }}</p>
          <p>专业:&nbsp;&nbsp;&nbsp;{{ major }}</p>
          <p>年级:&nbsp;&nbsp;&nbsp;{{ year }}</p>
          <p>班级:&nbsp;&nbsp;&nbsp;{{ this.class }}</p>
        </div>
        <div class="info-title">个人信息</div>
        <div class="info-text">
          <p>联系电话:&nbsp;&nbsp;&nbsp;{{ phone }}</p>
          <p>旧密码:<el-input size="small" v-model="oldPassword" placeholder="请输入旧密码"></el-input></p>
          <p>新密码:<el-input size="small" v-model="newPassword" placeholder="请输入新密码"></el-input></p>
          <el-button icon="el-icon-edit" size="medium" type="primary">修改密码</el-button>
        </div>
      </el-tab-pane>
      <!-- test record -->
      <el-tab-pane label="做题记录">
        <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border highlight-current-row>
          <el-table-column label="名称" align="center">
            <template slot-scope="scope">
              {{ scope.row.name }}
            </template>
          </el-table-column>
          <el-table-column label="科目" align="center">
            <template slot-scope="scope">
              {{ scope.row.subject }}
            </template>
          </el-table-column>
          <el-table-column label="类型" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.type }}</span>
            </template>
          </el-table-column>
          <el-table-column label="得分" width="200" align="center">
            <template slot-scope="scope">
              {{ scope.row.grade }}
            </template>
          </el-table-column>
          <el-table-column class-name="status-col" label="状态" width="200" align="center">
            <template slot-scope="scope">
              <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getList } from '@/api/test'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        已完成: 'success',
        开放: 'gray',
        未开放: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      id: this.$route.params.id,
      name: this.$route.params.name,
      class: this.$route.params.class,
      major: this.$route.params.major,
      college: this.$route.params.college,
      year: '',
      phone: '13752867512',
      list: null,
      listLoading: true,
      oldPassword: '',
      newPassword: ''
    }
  },
  created() {
    this.year = '20' + this.id.substr(0, 2)
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  #info-container {
    height: 120px;
    .info-item {
      float: left;
      margin-right: 25px;
    }
    img {
      width: 100px;
      height: 100px;
      border-radius: 15px;
    }
    p {
      line-height: 23px;
      &:first-child {
        margin-top: 2px;
      }
      &:nth-child(3) {
        margin-bottom: 2px;
      }
    }
  }
  .info-title {
    width: 200px;
    height: 20px;
    font-size: 18px;
    font-weight: bold;
    padding-left: 10px;
    border-left: 3px solid #000;
  }
  .info-text {
    margin: 30px 0 30px 50px;
    line-height: 25px;
    .el-input {
      width: 200px;
      margin-left: 15px;
    }
  }
</style>
