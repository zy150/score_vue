//人员管理相关的配置
// eslint-disable-next-line no-unused-vars
import axios from 'axios'
// eslint-disable-next-line no-unused-vars
import request from "@/utils/request";

export default {
    namespaced: true,
    actions: {
        // eslint-disable-next-line no-unused-vars
        getStudents(context) {
            request.get('/student/search',{
                params:{
                    limit: context.state.pageSize,
                    page: context.state.currentPage
                },
            }).then(
                response => {
                    context.commit('getStudentsData', response)

                },
                error => {
                    alert(error.message)
                }
            ).catch(function(response){
                console.log(response);//发生错误时执行的代码
            })
        }
    },
    mutations: {
        getStudentsData(state, value) {
            state.total = value.data.count
            state.studentList = []
            state.studentList.push(...value.data.data)
        },

        currentPageChange(state,newVal){
            state.currentPage = newVal
        },
        pageSizesChange(state,newVal){
            state.pageSize = newVal
        },
    },
    state: {
        // 一页可换的数据量
        pageSizes: [5, 10, 20],
        studentList: [
            //	学生数据
        ],
        // 当前数据页
        currentPage: 1,
        // 初始一页显示数量
        pageSize: 10,
        total: 0,
    },
    getters: {
        // pageSizes(state,newVal){
        //     console.log("pageSizes getter",newVal)
        //     // eslint-disable-next-line no-mixed-spaces-and-tabs
        // 	return 22
        // },
        // currentPageChange(state,newVal){
        //     state.currentPage = newVal
        //     console.log("currentPageChange getter",newVal)
        //     // eslint-disable-next-line no-mixed-spaces-and-tabs
        //     return 22
        // }
    },
}
