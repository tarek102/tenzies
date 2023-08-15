import React, { useState } from 'react';
import './App.css';
import Die from './components/Die';

function App() {
  const [allNums, setAllNums] = useState(allNewDice())

  function allNewDice() {
    const numbersArray = [];
    for (let i = 0; i < 10; i++){
      numbersArray.push(Math.floor(Math.random() * 6) + 1)
    }
    return numbersArray;
  }

  const DiceElements = allNums.map(num => (
    <Die value={num}/>
  ))
  
  return (
    <div className="App">
      <main>
        <div className='dice-container'>
          {DiceElements}  
        </div>
      </main>
    </div>
  );
}

export default App;
