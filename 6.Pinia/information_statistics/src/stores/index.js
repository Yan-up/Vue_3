import { defineStore } from 'pinia'
export const useMainStore = defineStore('mian', {
  state: () => {
    return {
      tableList: [
        {
          id: '1',
          name: '张三',
          age: 18,
          alone: '2',//是否独生 1是 2否,
          isCity: '1',//是否城市 1是 2否,
          vaccine: '1',//疫苗 1是 2否
          phone: '18712165555',
          idCard: '43068196606066664',
          address: '上海市普陀区金沙江路 1518',
        },
        {
          id: '2',
          name: '李四',
          age: 22,
          alone: '1',//是否独生 1是 2否,
          isCity: '2',//是否城市 1是 2否,
          vaccine: '1',//疫苗 1是 2否
          phone: '18715698555',
          idCard: '45687811545456455',
          address: '上海市普陀区金沙江路 1518',
        },
      ]
    }
  },
  getters: {
    aloneNum(state) {// 统计独生人数
      return state.tableList.reduce((total, item) => item.alone === '1' ? total + 1 : total, 0)
    },
    cityNum(state) {// 统计城市人数
      return state.tableList.reduce((total, item) => item.isCity === '1' ? total + 1 : total, 0)
    },
    vaccineNum(state) {// 统计疫苗人数
      return state.tableList.reduce((total, item) => item.vaccine === '1' ? total + 1 : total, 0)
    },
    ageNum(state) {// 统计18岁以上人数
      return state.tableList.reduce((total, item) => item.age >= 18 ? total + 1 : total, 0)
    }
  },
  actions: {
    addTableList(obj) {//新增
      this.tableList.push(obj)
    },
    editTableList(obj) {//编辑
      this.tableList = this.tableList.map(item => item.id === obj.id ? obj : item)
    },
    deleteTadList(arr) {//删除
      this.tableList = this.tableList.filter(item => !arr.includes(item.id))
    }
  }
})
