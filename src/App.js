import React, { useState } from 'react';
import './App.css';
import Die from './components/Die';
import { nanoid } from 'nanoid';

function App() {
  const [allNums, setAllNums] = useState(allNewDice())

  function generateNewDie() {
    return {
      value: Math.floor(Math.random() * 6) + 1,
      isHeld : false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++){
      newDice.push(generateNewDie())
    }
    return newDice;
  }

  function rollDice() {
    setAllNums(prevDie => prevDie.map(die => {
      return die.isHeld ? 
            die :
            generateNewDie()
    }))
  }

  function holdDice(id) {
    setAllNums((prevDie) => prevDie.map(die => {
      return die.id === id ?
            {...die, isHeld: !die.isHeld} :
            die
    }))
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
