<template>
  <div class="app-container">
    <!-- button -->
    <div id="edit-container">
      <el-input size="medium" placeholder="请输入关键词" prefix-icon="el-icon-search" v-model="search"></el-input>
      <el-button class="btn-new" icon="el-icon-delete" type="danger" size="medium" @click="newTest">批量删除</el-button>
      <el-button class="btn-new" icon="el-icon-edit" type="primary" size="medium" @click="newTest">新建套题</el-button>
    </div>
    <!-- table -->
    <el-table v-loading="listLoading" :data="list.slice((currentPage - 1) * pageSize, currentPage * pageSize)" element-loading-text="Loading" border highlight-current-row>
      <el-table-column type="selection" width="80" align="center"></el-table-column>
      <el-table-column label="ID" width="120" align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 + (currentPage - 1) * pageSize }}
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="院系" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.college }}
        </template>
      </el-table-column>
      <el-table-column label="科目" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.subject }}
        </template>
      </el-table-column>
      <el-table-column label="类型" width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.type }}
        </template>
      </el-table-column>
      <el-table-column label="创建者" width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.author }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="180" align="center">
        <template slot-scope="scope">
          {{ scope.row.time.substr(0, 19).replace('T', ' ') }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="100" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ '开放' }}</el-tag>
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
        this.listLoading = false
      })
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
    },
    newTest() {
      this.$router.push({
        name: 'New'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/components/edit.scss";
  @import "~@/styles/components/page.scss";

</style>
