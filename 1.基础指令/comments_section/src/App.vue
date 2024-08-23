<template>
  <div id="select-color">
    <h1>评论区</h1>
    <div class="radio">
      <label v-for="(item, text) in colorList" :key="text" :style="{ color: item }">
        <input type="radio" name="color" :value="item" :checked="color === item" @change="updateColor(item)">{{ text }}
      </label>
    </div>
    <h4>选择文字颜色</h4>
    <ul class="scrolling">
      <li v-for="item in commentsList" :key="item">
        <p :style="{ color: item.color }">{{ item.content }}</p>
        <span @click="deleteComment(item.id)">&#10006;</span>
      </li>
    </ul>
    <div class="send">
      <input type="text" name="text" placeholder=" 请输入你的弹幕" v-model="content">
      <button @click="addComments">发<br>送</button>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
export default {
  name: 'App',
  setup() {
    let color = ref('red'),
      content = ref(''),
      colorList = reactive({ '红色': 'red', '绿色': 'green', '蓝色': 'blue', '青色': 'cyan', '紫色': 'purple', '粉色': 'pink' }),
      commentsList = ref([{
        id: '0',
        content: '你好集帅/集美！',
        color: 'red',
      }])
    const addComments = () => {
      if (content.value == '') {
        return alert('请输入弹幕！')
      }
      commentsList.value.push({
        id: commentsList.value.length + 1,//id自增
        content: content.value,
        color: color.value
      })
      content.value = ''//清空输入框
    }

    const deleteComment = (id) => {// 删除弹幕
      commentsList.value = commentsList.value.filter(item => {
        return item.id !== id
      })
    }

    const updateColor = (newColor) => {// 更新颜色
      color.value = newColor
    }

    return {
      color,
      content,
      colorList,
      commentsList,
      addComments,
      deleteComment,
      updateColor
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  user-select: none;
}


ul,
li {
  list-style: none;
}

#select-color {
  width: 500px;
  height: 550px;
  display: flex;
  padding: 10px;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #848484;
  border-radius: 10px 10px;
  margin: 80px auto;

  & h1 {
    margin: 10px;
  }

  & .radio {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;

    & label {
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
    }
  }

  & h4 {
    margin: 10px;
  }

  & .scrolling {
    height: 290px;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid rgb(0, 0, 0);

    & li {
      width: 96%;
      height: 40px;
      line-height: 40px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px dashed #000;

      & span {
        cursor: pointer;
      }
    }

  }

  & .send {
    display: flex;

    & input {
      width: 95%;
      outline: none;
    }

    & button {
      width: 40px;
      height: 50px;
    }
  }
}
</style>
