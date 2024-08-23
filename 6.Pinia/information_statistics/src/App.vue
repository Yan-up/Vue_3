<template>
  <el-card>
    <el-row :gutter="20" class="height">
      <el-col :span="6">
        <el-card>
          <p>独生子女数量:{{ aloneNum }}</p>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <p>城市户口学生数量:{{ cityNum }}</p>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <p>已成年学生数量:{{ ageNum }}</p>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <p>已接种新冠疫苗人数:{{ vaccineNum }}</p>
        </el-card>
      </el-col>
    </el-row>

    <el-card style="margin-top: 20px">
      <el-row>
        <el-button type="success" @click="openDialog()">新增学生</el-button>
        <el-button type="warning" @click="handleDelete('check')">选中删除</el-button>
        <el-button type="danger" @click="handleDelete('all')">删除全部</el-button>
      </el-row>
      <el-table border :data="tableList" style="width: 100%; margin-top: 20px;"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column label="姓名" align="center" prop="name"></el-table-column>
        <el-table-column label="年龄" align="center" prop="age"></el-table-column>
        <el-table-column label="是否独生" align="center">
          <template #default="scope">{{ scope.row.alone == 1 ? '是' : '否' }}</template>
        </el-table-column>
        <el-table-column label="户口" align="center">
          <template #default="scope">{{ scope.row.isCity == 1 ? '城市' : '非城市' }}</template>
        </el-table-column>
        <el-table-column label="手机" width="180" align="center" prop="phone"></el-table-column>
        <el-table-column label="身份证" width="250" align="center" prop="idCard"></el-table-column>
        <el-table-column label="地址" width="300" align="center" prop="address"></el-table-column>
        <el-table-column label="新冠疫苗" align="center">
          <template #default="scope">{{ scope.row.vaccine == 1 ? '已接种' : '未接种' }}</template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template #default="scope">
            <el-button type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
            <el-button @click="openDialog(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </el-card>
  <newDialog ref="dialog" v-if="dialogFormVisible" @close="onClose" />
</template>

<script setup>
import { useMainStore } from './stores/index.js'
import newDialog from './components/newDialog.vue'
import { ref, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { ElMessageBox, ElMessage } from 'element-plus'

const useStore = useMainStore()// 调用pinia中 useMainStore的数据
const { tableList, aloneNum, cityNum, ageNum, vaccineNum } = storeToRefs(useStore)// 结构赋值拿取方法直接使用
const dialogFormVisible = ref(false),
  dialog = ref(null),
  selectionIdLits = ref([]),
  controlsTableList = useMainStore()// 调用方法
function openDialog(row) {// 打开弹窗,调用子组件方法
  dialogFormVisible.value = true
  nextTick(() => {// nextTick 确保子组件渲染完成再执行
    // 调用子组件方法
    dialog.value.openDialog(row)
  })
}

function onClose() {// 自定义事件
  dialogFormVisible.value = false
}

function handleSelectionChange(id) {// 获取选中的id
  selectionIdLits.value = id.map(item => item.id)
}

function handleDelete(type) {// 删除
  ElMessageBox.confirm('此操作将永久删除数据, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    let arr = []
    if (type === 'all') {// 全选删除
      arr = tableList.value.map(item => item.id)
    } else if (type === 'check') {// 勾选删除
      arr = selectionIdLits.value
      console.log(arr)
    } else {// 单条删除
      arr = [type]
    }
    controlsTableList.deleteTadList(arr)
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '已取消删除'
    })
  })
}
</script>

<style scoped>
/* ::v-deep vue3 的样式穿透 */
::v-deep .el-card__body {
  width: 100%;

  .height p {
    padding: 10px 0;
    box-sizing: border-box;
  }
}
</style>
