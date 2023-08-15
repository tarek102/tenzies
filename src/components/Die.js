import React from 'react'

const Die = (props) => {
  return (
    <div>
        <h2 className='dice-num'>
            {props.value}
        </h2>
    </div>
  )
}

export default Die