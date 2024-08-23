<template>
    <div id="shoe-details">
        <img :src="getImgUrl(item.img)" alt="" />
        <p>{{ item.details }}</p>
        <div class="price">
            <p>{{ item.price }}</p>
            <button v-if="bool" @click="bool = false">修改价格</button>
            <div class="modify-price" v-else>
                <input type="text" name="text" placeholder="输入修改金额" v-model="price" />
                <button @click="onEdit">确认</button>
                <button @click="bool = true">取消</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, inject } from 'vue'
const bool = ref(true),
    price = ref(''),
    props = defineProps({// 通过defineProps接收父组件传过来的数据item
        item: {
            type: Object,
            default: () => { }
        }
    }),
    myprice = inject('changeMyprice', () => { })
function onEdit() {
    let prices = Number(price.value)
    if (!prices) {
        return alert('请输入正确价格')
    }
    myprice(prices, props.item.id)
    price.value = ''
    bool.value = true
}
function getImgUrl(name) { // 获取图片
    return new URL(`../assets/images/${name}`, import.meta.url).href
}
</script>

<style scoped>
#shoe-details {
    width: 200px;
    height: 300px;
    margin: 10px 50px;
    padding: 10px 10px;
    display: flex;
    flex-flow: column wrap;
    justify-content: space-between;
    border-radius: 10px;
    border: 1px solid #000;

    & img {
        width: 150px;
        height: 150px;
        margin: 0 auto;
    }

    &>p {
        width: 100%;
        overflow: hidden;
        /* 隐藏超出容器的内容 */
        text-overflow: ellipsis;
        /* 超出部分用省略号显示 */
        white-space: nowrap;
        /* 文本不换行 */
    }

    & .price {
        height: 70px;
    }
}
</style>