import { useState } from 'react'
import './App.css'

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 2, description: "Charger", quantity: 2, packed: false },
];

function App() {
  
  return (
    <div className='app'>
      <Logo/>
      <Form/>
      <PackingList/>
      <Stats/>
    </div>
  )
}

function Logo() {
  return (
    <h1>🌴 Far Away 🌴</h1>
  )
}

function Form() {

  const [description, setDescription] = useState("")
  const [quantity, setQuantity] = useState(1)

  function handleSubmit(e) {  
    e.preventDefault()

    if(!description) return;
    
    const newItem = {description, quantity, packed: false, id: Date.now()}
    console.log(newItem)
    
    setDescription("")
    setQuantity(1)

  }

  return (
    <form className='add-form' onSubmit={handleSubmit}>
      <h3>What do you need for your trip? 💼</h3>
      <select name="" id="" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
      {Array.from({length: 20}, (currentValue, index)=> <option key={index} value={index + 1}>{index + 1}</option>)}
      </select>
      <input type="text" placeholder="Add item" value={description} onChange={(e) => setDescription(e.target.value)}/>
      <button type="submit">Add</button>
    </form>
  )
}

function PackingList() {
return (
  <div className='list'>
  <ul>
    {initialItems.map(item => <Item item={item}/>)}
  </ul>
  </div>
  
)
}

function Item({item}) {
  return (
    <li><span style={item.packed ? {textDecoration: "line-through"} : {}}>{item.quantity} {item.description}</span><button>❌</button></li>
  )
}

function Stats() {
  return (
    <footer className='stats'>
      You have X items on your lists, and you already packed X (X%)
    </footer>
  )
}

export default App
