<template>
  <div class="app-container">
    <!-- form -->
    <div id="form-container">
      <el-form :model="from" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="院系" prop="college">
          <el-select v-model="form.college" placeholder="请选择院系" @change="fetchSubjectList">
            <el-option v-for="item in collegeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="科目" prop="subject">
          <el-select v-model="form.subject" placeholder="请选择科目">
            <el-option v-for="item in subjectList" :key="item.subjectId" :label="item.subjectName" :value="item.subjectId"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <!-- tabs -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- manual -->
      <el-tab-pane label="手动选择">
        <!-- edit -->
        <div id="edit-container">
          <el-button class="btn-new" icon="el-icon-circle-plus-outline" type="primary" size="medium" @click="newTest">添加套题</el-button>
          <el-button class="btn-new" icon="el-icon-delete" type="danger" size="medium" @click="newTest">批量删除</el-button>
        </div>
        <!-- table -->
        <el-table v-loading="manualListLoading" :data="manuallist" element-loading-text="Loading" border highlight-current-row>
          <el-table-column label="编号" width="150" align="center">
            <template slot-scope="scope">
              {{ scope.$index }}
            </template>
          </el-table-column>
          <el-table-column label="类型" width="200" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.type }}</span>
            </template>
          </el-table-column>
          <el-table-column label="题目" align="center">
            <template slot-scope="scope">
              {{ scope.row.title }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">移除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- submit -->
      </el-tab-pane>
      <!-- auto -->
      <el-tab-pane label="自动生成">
        <!-- type -->
        <div class="info-title">题型设定</div>
        <div class="info-text">
          <span>单选题数量: </span>
          <el-input-number v-model="form.radioNum" :min="0" :max="10" size="mini"></el-input-number>
          <span>多选题数量: </span>
          <el-input-number v-model="form.checkboxNum" :min="0" :max="10" size="mini"></el-input-number>
          <span>判断题数量: </span>
          <el-input-number v-model="form.judgeNum" :min="0" :max="10" size="mini"></el-input-number>
        </div>
        <div class="info-text">
          <span>填空题数量: </span>
          <el-input-number v-model="form.fillNum" :min="0" :max="10" size="mini"></el-input-number>
          <span>简答题数量: </span>
          <el-input-number v-model="form.saqNum" :min="0" :max="10" size="mini"></el-input-number>
        </div>
        <!-- difficult -->
        <div class="info-title">难度设置</div>
        <div class="info-text">
          <span>难度系数: </span>
          <el-radio v-model="form.difficulty" label="1">简单</el-radio>
          <el-radio v-model="form.difficulty" label="2">中等</el-radio>
          <el-radio v-model="form.difficulty" label="3">困难</el-radio>
        </div>
        <!-- generate -->
        <div class="info-title">生成练习</div>
        <div v-if="generateVisible" class="info-text">
          <el-button type="primary" size="medium" @click="generateTest">一键生成练习</el-button>
        </div>
        <div v-else>
          <!-- edit -->
          <div id="edit-container">
            <el-button class="btn-new" icon="el-icon-circle-plus-outline" type="primary" size="medium" @click="newTest">添加套题</el-button>
            <el-button class="btn-new" icon="el-icon-delete" type="danger" size="medium" @click="newTest">批量删除</el-button>
          </div>
          <!-- table -->
          <el-table v-loading="autoListLoading" :data="autolist" element-loading-text="Loading" border highlight-current-row>
            <el-table-column label="编号" width="150" align="center">
              <template slot-scope="scope">
                {{ scope.$index }}
              </template>
            </el-table-column>
            <el-table-column label="类型" width="200" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.type }}</span>
              </template>
            </el-table-column>
            <el-table-column label="题目" align="center">
              <template slot-scope="scope">
                {{ scope.row.title }}
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200" align="center">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">移除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// import { getAllCollege } from '@/api/allCollege'
import { getAllSubject } from '@/api/allSubject'

export default {
  data() {
    return {
      form: {
        name: '',
        college: '',
        subject: '',
        radioNum: 0,
        checkboxNum: 0,
        judgeNum: 0,
        fillNum: 0,
        saqNum: 0,
        difficulty: 0
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        college: [
          { required: true, message: '请选择院系', trigger: 'blur' }
        ],
        subject: [
          { required: true, message: '请选择专业', trigger: 'blur' }
        ]
      },
      collegeList: null,
      subjectList: null,
      manualList: null,
      manualListLoading: false,
      autoList: null,
      autoListLoading: false,
      generateVisible: true,
    }
  },
  created() {
    this.fetchCollegeList()
  },
  methods: {
    fetchCollegeList() {
      this.collegeList = [
        { value: '1', label: '中药学院' },
        { value: '2', label: '医药信息工程学院' },
        { value: '3', label: '药学院' },
        { value: '4', label: '外国语学院' },
        { value: '5', label: '生命科学与生物制药学院' },
        { value: '6', label: '临床医学院' },
        { value: '7', label: '健康学院' },
        { value: '8', label: '护理学院' },
        { value: '9', label: '公共卫生学院' }
      ]
    },
    fetchSubjectList() {
      getAllSubject(this.form.college).then(response => {
        this.subjectList = response.data.data.records
      })
    },
    fetchManualList() {
      this.manualListLoading = true
      getList().then(response => {
        this.manualList = response.data.items
        this.manualListLoading = false
      })
    },
    fetchAutoList() {
      this.autoListLoading = true
      getList().then(response => {
        this.autoList = response.data.items
        this.autoListLoading = false
      })
    },
    generateTest() {
      this.generateVisible = false
      this.fetchData()
    }
  }
}
</script>

<style lang="scss" scoped>
  #form-container {
    width: 300px;
  }
  .info-title {
    width: 200px;
    height: 20px;
    font-size: 18px;
    font-weight: bold;
    padding-left: 10px;
    margin: 10px 0 20px 0;
    border-left: 3px solid #000;
  }
  .info-text {
    margin: 0 0 30px 20px;
    span {
      font-size: 17px;
      margin: 0 15px 0 30px;
    }
    .el-button {
      margin: 0 15px 0 30px;
    }
  }
  #edit-container {
    margin-bottom: 15px;
  }
</style>
