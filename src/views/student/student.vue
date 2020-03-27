<template>
  <div class="app-container">
    <!-- button -->
    <div id="edit-container">
      <el-input size="medium" placeholder="请输入关键词" prefix-icon="el-icon-search" v-model="search"></el-input>
      <el-button class="btn-new" icon="el-icon-delete" type="danger" size="medium" @click="newTest">批量删除</el-button>
      <el-button class="btn-new" icon="el-icon-edit" type="primary" size="medium" @click="newTest">新建用户</el-button>
    </div>
    <!-- table -->
    <el-table v-loading="listLoading" :data="list.slice((currentPage - 1) * pageSize, currentPage * pageSize)" element-loading-text="Loading" border highlight-current-row>
      <el-table-column type="selection" width="80" align="center"></el-table-column>
      <el-table-column label="ID" width="120" align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 + (currentPage - 1) * pageSize }}
        </template>
      </el-table-column>
      <el-table-column label="学号" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="学院" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.college }}</span>
        </template>
      </el-table-column>
      <el-table-column label="专业" align="center">
        <template slot-scope="scope">
          {{ scope.row.major }}
        </template>
      </el-table-column>
      <el-table-column label="班级" align="center">
        <template slot-scope="scope">
          {{ scope.row.class }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="255" align="center">
        <template slot-scope="scope">
          <el-button icon="el-icon-document" size="mini" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
          <el-button icon="el-icon-delete" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- pagination -->
    <div id="page-container">
      <el-pagination background layout="prev, pager, next" :total="list.length" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange"></el-pagination>
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/student'

export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 12,
      list: null,
      listLoading: true,
      search: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        console.log(this.list)
        this.listLoading = false
      })
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
    },
    handleDetail(index, row) {
      this.$router.push({
        name: 'Detail',
        params: {
          id: row.id,
          name: row.name,
          class: row.class,
          major: row.major,
          college: row.college
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/components/edit.scss";
  @import "~@/styles/components/page.scss";

</style>
