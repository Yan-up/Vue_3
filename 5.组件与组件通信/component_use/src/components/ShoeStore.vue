<template>
    <div id="commodity-component">
        <ShoeDetails v-for="item in msgList" :key="item.id" :item="item">
        </ShoeDetails>
    </div>
</template>

<script setup>
import ShoeDetails from "./ShoeDetails.vue"
defineProps(['msgList'])// 父组件传过来的数据
</script>
<style lang="scss">
#commodity-component {
    width: 1000px;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
}
</style>
