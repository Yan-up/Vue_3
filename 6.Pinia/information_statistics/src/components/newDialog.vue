<template>
    <el-dialog v-model="dialogFormVisible" :title="isAdd ? '新增学生' : '编辑学生'" width="650" @close="onClose">
        <el-form :model="ruleForm" :rules="rules" ref="formRef" label-width="100px">
            <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
                <el-input v-model="ruleForm.age"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="address">
                <el-input v-model="ruleForm.address"></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="phone">
                <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="身份证" prop="idCard">
                <el-input v-model="ruleForm.idCard"></el-input>
            </el-form-item>
            <el-form-item label="是否独生" prop="alone">
                <el-radio-group v-model="ruleForm.alone">
                    <el-radio value="1">独生子女</el-radio>
                    <el-radio value="2">非独生子女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="是否接种" prop="vaccine">
                <el-radio-group v-model="ruleForm.vaccine">
                    <el-radio value="1">已接种</el-radio>
                    <el-radio value="2">未接种</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="户口所在地" prop="isCity">
                <el-select v-model="ruleForm.isCity" placeholder="请选择户口所在地" style="width: 200px;">
                    <el-option label="城市户口" value="1"></el-option>
                    <el-option label="非城市户口" value="2"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="submitForm(formRef)">
                    确定
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref, reactive, defineEmits } from 'vue'
import { useMainStore } from '../stores/index'
const dialogFormVisible = ref(false),
    isAdd = ref(true),// 是否是新增
    controlsTableList = useMainStore(),
    rules = reactive({// 表单验证规则
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' },],
        age: [
            { required: true, message: '请输入年龄', trigger: 'blur' },
            { pattern: /^(([0-9]|[1-9][1-9]|1[0-7][0-9])(\\.[0-9]+)?|120)$/, message: '请输入正确的年龄', trigger: 'blur' }
        ],
        address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
        phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        idCard: [
            { required: true, message: '请输入身份证', trigger: 'blur' },
            { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入正确的身份证', trigger: 'blur' }
        ],
        isCity: [
            { required: true, message: '请选择户口', trigger: 'blur' },
        ],
    })

let ruleForm = ref({// 表单数据
    name: '',
    age: '',
    address: '',
    phone: '',
    idCard: '',
    alone: '',
    vaccine: '',
    isCity: ''
})
const openDialog = (row) => {// 打开弹窗
    if (row) {
        isAdd.value = false
        ruleForm.value = Object.assign({}, row)
    }
    dialogFormVisible.value = true
}

const formRef = ref()
function submitForm(formRefNaem) {// 提交表单
    formRefNaem.validate(valid => {
        if (valid) {
            let data = Object.assign({
                id: Math.random() + ''
            }, ruleForm.value)//浅拷贝

            isAdd.value ? controlsTableList.addTableList(data) : controlsTableList.editTableList(data)
            dialogFormVisible.value = false
        } else {
            console.log('error submit!!')
        }
    })
}
const emit = defineEmits(['close'])
function onClose() {
    emit('close')
}

defineExpose({// 暴露方法,让父级组件调用
    openDialog
})
</script>
<style lang="scss" scoped></style>