<template>
<div style="width: 100%;height: 80%">
  <el-input placeholder="请输入内容" suffix-icon="el-icon-search" size="medium" style="width: 200px;"></el-input>
  <el-button class="ml-5 el-button--medium el-button--primary">查询</el-button>
<!--  <el-button @click="getStudentsData" class="ml-5 el-button&#45;&#45;medium el-button&#45;&#45;primary">测试</el-button>-->

  <el-table height="500" size="medium" header-cell-class-name="#ffffff" stripe :data="studentList">
    <el-table-column prop="stuId" label="学号" width="130"></el-table-column>
    <el-table-column prop="name" label="姓名" width="90"></el-table-column>
    <el-table-column prop="curse" label="课程名" width="150"></el-table-column>
    <el-table-column prop="qualify" label="是否及格" width="60"></el-table-column>
    <el-table-column prop="study" label="修读类型" width="60"></el-table-column>
    <el-table-column align="right">
      <template slot-scope="scope">
        <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑
        </el-button>
        <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <div style="height: 90%;width: 90%">
    <el-pagination
        @size-change="(value)=>pageChange(value)"
        @current-change="(value)=>currentChange(value)"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
  </div>
</div>
</template>

<script>
import {mapGetters, mapMutations, mapState} from "vuex";

export default {
  name: "StudentTable",
  props:['tagHeight'],
  data() {
    return {

    }
  },
  methods: {
    pageChange(va){
      this.$store.commit('student/pageSizesChange',va)
    },
    currentChange(va){
      this.$store.commit('student/currentPageChange',va)
    },


    // ...mapMutations('studentAbout', {pageChange: 'pageSizesChange', currentChange: 'currentPageChange'}),
    //借助mapActions生成对应的方法，方法中会调用dispatch去联系actions(对象写法)
    // ...mapActions('countAbout',{incrementOdd:'jiaOdd',incrementWait:'jiaWait'}),
    getStudentsData() {
      // this.$store.dispatch('user/login', this.loginForm)
      this.$store.dispatch('student/getStudents')
    }
  },
  computed: {
    pageSizes () {
      return this.$store.state.student.pageSizes
    },
    pageSize () {
      return this.$store.state.student.pageSize
    },
    total () {
      return this.$store.state.student.total
    },
    currentPage () {
      return this.$store.state.student.currentPage
    },
    studentList () {
      return this.$store.state.student.studentList
    },
    //借助mapState生成计算属性，从state中读取数据。（数组写法）
    // ...mapState('studentAbout', ['pageSizes', 'pageSize', 'total', "currentPage", "studentList"]),
    //借助mapGetters生成计算属性，从getters中读取数据。（数组写法）
    // ...mapGetters('studentAbout', ['currentPageChange'])
  },
  watch: {
    pageSize: {
      handler() {
        this.getStudentsData()
      },
      deep: true, // 深度监听
      immediate: true,//立即执行
    },
    currentPage() {
      this.getStudentsData()
    }
  },

}
</script>

<style scoped>

</style>
