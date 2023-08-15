import React, { useState } from 'react';
import './App.css';
import Die from './components/Die';
import { nanoid } from 'nanoid';

function App() {
  const [allNums, setAllNums] = useState(allNewDice())

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++){
      newDice.push({
        value: Math.floor(Math.random() * 6) + 1,
        isHeld : false,
        id: nanoid()
      })
    }
    return newDice;
  }

  function rollDice() {
    setAllNums(allNewDice())
  }

  function holdDice(id) {
    console.log(id)
  }

  const DiceElements = allNums.map(num => (
    <Die holdDice={() => holdDice(num.id)} key={num.id} value={num.value} isHeld={num.isHeld}/>
  ))
  
  return (
    <div className="App">
      <main>
        <div className='dice-container'>
          {DiceElements}  
        </div>
        <button className='roll-dice' onClick={rollDice}>Roll</button>
      </main>
    </div>
  );
}

export default App;
