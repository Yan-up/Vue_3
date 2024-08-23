<script>
import { ref, computed } from 'vue'
export default {
  name: 'App',
  setup() {
    const checkList = ref([]),
      list = ref([
        {
          id: 1,
          img: 'da651890804ab802.jpg',
          name: 'Apple/苹果iPadPro13英寸M4芯片2024年新款平板电脑(512G WLAN版/MVX43CH/A)深空黑色',
          price: '13199.00',
          num: 1,
          isCheck: true
        },
        {
          id: 2,
          img: 'b4182f1e909d2466.jpg',
          name: 'Apple/苹果 iPhone 15 Plus (A3096) 128GB',
          price: '5999.00',
          num: 1,
        },
        {
          id: 3,
          img: 'b4bbf605a9d10ce5.jpg',
          name: 'Apple/苹果 iPhone 15 Pro (A3104) 256GB 黑色钛金属',
          price: '7979.00',
          num: 1,
        },
        {
          id: 4,
          img: '7689e83da072b6b1.jpg',
          name: 'Apple/苹果 iPhone 14 (A2884) 256GB 午夜色',
          price: '5699.00',
          num: 1,
        },
        {
          id: 5,
          img: 'f03ae8fd3e0e3570.jpg',
          name: 'Apple/苹果 iPhone 15 Pro Max (A3108) 256GB 黑色钛金属',
          price: '8349.00',
          num: 1,
        }
      ])
    const allCheck = computed({// 全选功能
      get() {//判断是否全选
        return checkList.value.length === 0 ? false : checkList.value.length === list.value.length
      }, set(value) {
        checkList.value = value ? list.value.map(item => item.id) : []
      }
    })
    const totalCount = computed(() => {// 已选商品
      return list.value.reduce((total, item) => checkList.value.includes(item.id) ? total + item.num : total, 0)
    })
    const totalPrice = computed(() => {// 总价
      return list.value.reduce((total, item) => checkList.value.includes(item.id) ? total + item.price * item.num : total, 0)
    })
    function formatPrice(value) {// 过滤器,保留小数点后两位
      return '￥' + value.toFixed(2)
    }
    function onClick(id) {//删除
      list.value = list.value.filter(item => item.id !== id)
      let index = checkList.value.indexOf(id)
      if (index >= 0) {
        checkList.value.splice(index, 1)
      }
    }
    function getImgUrl(name) {// 获取图片
      return new URL(`./assets/images/${name}`, import.meta.url).href
    }

    return {
      checkList,
      list,
      allCheck,
      totalCount,
      totalPrice,
      formatPrice,
      onClick,
      getImgUrl
    }
  }
}
</script>

<template>
  <Suspense>
    <template v-slot:default>
      <HelloWorld />
    </template>
  </Suspense>
  <div id="box">
    <div class="head-box">
      <h2>购物车</h2>
      <p>
        已选商品{{ totalCount }}件 (不含运费):{{ formatPrice(totalPrice) }}
        <button>结算</button>
      </p>
    </div>
    <ul>
      <li>
        <label>
          <input type="checkbox" name="checkbox" v-model="allCheck">全选
        </label>
        <p>商品信息</p>
        <p>单价</p>
        <p>数量</p>
        <p>金额</p>
        <p>操作</p>
      </li>
      <li class="product" v-for="item in list" :key="item.id">
        <input type="checkbox" name="checkbox" :value="item.id" v-model="checkList">
        <div class="details">
          <img :src="getImgUrl(item.img)" alt="" />
          <p>{{ item.name }}</p>
        </div>
        <p style="transform: translateX(-10px);">￥{{ item.price }}</p>
        <div class="quantity">
          <input type="button" name="button" value="-" @click="item.num === 1 || item.num--">
          <input type="text" name="text" :value="item.num" class="num" disabled="disabled">
          <input type="button" name="button" value="+" @click="item.num++">
        </div>
        <p style="transform: translateX(-20px);">{{ formatPrice(item.num * item.price) }}</p>
        <a href="javascript:;" class="del" @click="onClick(item.id)">删除</a>
      </li>
    </ul>
  </div>
</template>



<style scoped>
* {
  margin: 0;
  padding: 0;
  user-select: none;
}

#box {
  width: 90vw;
  margin: 50px auto;
  border: 1px solid #000;

  & .head-box {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 5px 40px;
    border-bottom: 1px solid #000;

    & p>button {
      width: 50px;
      height: 25px;
      line-height: 25px;
      margin-left: 10px;
      background-color: #fff;
      display: inline-block;
      text-align: center;
      cursor: pointer;
      border: 1px solid #CCC;
    }
  }

  & ul {
    width: 100%;
    margin: 10px auto;
    list-style: none;
    padding: 0 20px;
    box-sizing: border-box;

    & li {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin: 10px 0;
      box-sizing: border-box;
      padding: 0 10px;

      &:nth-child(n+2) {
        height: 100px;
        background-color: #eee;
        border-radius: 10px;
      }

      & label {
        width: 55px;
        display: flex;
        justify-content: space-between;
      }

      &.product {
        width: 100%;
      }

      & .details {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        img {
          object-fit: cover;
        }

        p {
          width: 150px;
          font-size: 10px;
          margin-left: 10px;
        }
      }

      & .quantity {
        display: flex;
        transform: translateX(-35px);

        & input[type=button] {
          width: 15px;
          outline: none;
        }

        & input[type=text] {
          width: 25px;
          text-align: center;
          outline: none;
        }
      }

      & .del {
        font-size: 16px;
        font-weight: bold;
        text-decoration: none;
        color: #000;
      }

    }
  }
}
</style>
