<template>
  <div id="hello">
    <h1>学生信息系统</h1>
    <button v-if="bool" @click="bool = false" style="margin-top: 20px">添加学生</button>
    <div v-else class="add">
      <button @click="sortStudent">确实添加</button>
      <button @click="bool = true">取消添加</button>
      <input type="text" name="name" placeholder="输入学生姓名" v-model="tableDate.name">
      <input type="text" name="age" placeholder="输入学生年龄" v-model.number="tableDate.age">
      <input type="text" name="score" placeholder="输入学生分数" v-model.number="tableDate.score">
    </div>
    <div class="sort">
      <button @click="sortStudentList('age')">按年龄排序</button>
      <button @click="sortStudentList('score')">按分数排序</button>

      <table border="1" style="border-collapse: collapse;">
        <tr>
          <th>姓名</th>
          <th>年龄</th>
          <th>分数</th>
        </tr>
        <tr v-for="item in studentList" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.age }}</td>
          <td>{{ item.score }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
export default {
  name: 'App',
  setup() {
    let bool = ref(true),
      tableDate = ref([
        { name: '', age: null, score: null }
      ]),
      studentList = ref([
        { id: '0', name: '张三', age: 18, score: 100 },
      ])

    const sortStudent = () => {// 添加学生
      if (tableDate.value.name === undefined || tableDate.value.age === undefined || tableDate.value.score === undefined ||
        tableDate.value.name === '' || tableDate.value.age === '' || tableDate.value.score === '') {
        return alert('请输入完整信息')
      } else {
        studentList.value.push({// 添加数据
          id: tableDate.value.length + 1,// 添加的数据id自增
          name: tableDate.value.name,
          age: tableDate.value.age,
          score: tableDate.value.score
        })
      }
      bool.value = true// 显示确认/取消按钮
    }
    const sortStudentList = (key) => {// 排序
      studentList.value.sort((a, b) => a[key] - b[key])
    }
    const resetTableData = () => {
      tableDate.value.name = ''
      tableDate.value.age = null
      tableDate.value.score = null
    }

    watch(bool, (newValue) => {
      if (newValue) {
        resetTableData()
      }
    })

    return {
      bool,
      tableDate,
      studentList,
      sortStudent,
      sortStudentList
    }
  }
}
</script>

<style scoped>
#hello {
  width: 800px;
  height: 500px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #000;

  & .hello,
  .sort {
    text-align: center;
    margin-top: 20px;
  }

  & table {
    margin: 20px auto;

    td {
      width: 120px;
      padding: 20px
    }
  }
}
</style>
