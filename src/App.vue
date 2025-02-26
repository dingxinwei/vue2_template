<template>
  <div class="fooBaz bar">
    <div>{{ message }}</div>
    <div>123</div>
    <button @click="add">+</button>
    <ul>
      <li>
        <router-link to="/foo">Go to Foo</router-link>
      </li>
      <li>
        <router-link to="/bar">Go to Bar</router-link>
      </li>
    </ul>
    <router-view></router-view>
    <Test @hook:created="handleCreated" @hook:mounted="handleMounted">
      5687999
      <template #test="{ user }">
        <div>{{ user.name }}</div>
      </template>
    </Test>
    <HelloWorld message="123456" />
    <Button text="123" />
  </div>
</template>

<script>
  import './styles.css'
  import Test from './components/test.js'
  import { HelloWorld, Button } from './components/test2.js'
  export default {
    components: {
      Test,
      HelloWorld,
      Button
    },
    data() {
      return {
        message: 1
      }
    },
    computed: {
      foo() {
        return this.message + 1
      }
    },
    created() {
      console.log('app created')
    },
    methods: {
      add() {
        this.message++
      },
      handleMounted() {
        console.log('mounted')
      },
      handleCreated() {
        console.log('created')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .test {
    color: red;
  }
  .bar {
    font-size: 14px;
    padding: 15px;
    background: url(@/images/select-platform-bg.png);
  }
  ::placeholder {
    color: gray;
  }
</style>
