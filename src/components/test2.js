const HelloWorld = ({ props }) => <p>hello {props.message}</p>

const Button = () => {
  return <button>123</button>
}
const Slot1 = ({ scopedSlots }) => {
  return (
    <div>
      {scopedSlots.test({
        user: { name: '纸飞机' }
      })}
    </div>
  )
}

export { HelloWorld, Button, Slot1 }
