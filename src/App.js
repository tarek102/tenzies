import React, { useState, useEffect } from 'react';
import './App.css';
import Die from './components/Die';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti'

function App() {
  const [allNums, setAllNums] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = allNums.every(die => die.isHeld);
    const firstValue = allNums[0].value;
    const allSameValue = allNums.every(die => die.value === firstValue);
    if (allHeld && allSameValue){
      setTenzies(true)
      console.log("you won");
    }
  }, [allNums])

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
    if(!tenzies) {
      setAllNums(prevDie => prevDie.map(die => {
        return die.isHeld ? 
              die :
              generateNewDie()
      }))
    }  else {
      setTenzies(false)
      setAllNums(allNewDice())
    }
    
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
      
        {
          tenzies ?
          <main>
            <h1>You Won</h1>
            <button className='roll-dice' onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
          </main> :
          <main>
          <h1 className="title">Tenzies</h1>
          <p className="instructions">
            Roll until all dice are the same. 
            Click each die to freeze it at its 
            current value between rolls.
          </p>
          <div className='dice-container'>
            {DiceElements}  
          </div>
          <button className='roll-dice' onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
          </main>
        }
        
      
    </div>
  );
}

export default App;
