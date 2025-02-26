import { bar } from '../styles.css'
import { Slot1 } from './test2'
export default {
  data() {
    return {
      message: 'world',
      data: Array.from({ length: 10 }).map((_, i) => i),
      htmlcode: '<span style="color:#0089ff;">span</span>'
    }
  },
  render() {
    const scopedSlots = {
      test: ({ user }) => (
        <div style="color:blue;">快来啊，{user.name}，看看这个作用域插槽</div>
      )
    }
    return (
      <div class={bar}>
        hello {this.message}
        <button onClick={this.onClick}>click me</button>
        <ul>
          {this.data.map((i) => (
            <li
              key={i}
              on={{
                '~click': () => {
                  console.log('只能点一次')
                }
              }}
            >
              {i}
            </li>
          ))}
        </ul>
        {this.$slots.default}
        {this.$scopedSlots.test({
          user: { name: '纸飞机' }
        })}
        <img src={require('../images/icon-unchecked-grey.png')}></img>
        <Slot1 scopedSlots={scopedSlots} />
        <div domPropsInnerHTML={this.htmlcode}></div>
      </div>
    )
  },
  methods: {
    onClick() {
      console.log('clicked')
    }
  }
}
