import React from 'react';
import '../assets/css/calculator.css'
export default function Calculator() {
    const keys = [1,2,3,"+",4,5,6,"-",7,8,9,"*",0,"DEL","AC","/", "="];
  return (
    <div className='calculator'>
        <div className="display">

        </div>
        <div className="numpad">
            {keys.map((btn)=>{
               return <button value={btn}>{btn}</button>
            })}
        </div>
    </div>
  )
}
