import React, { useState } from "react";
import "../assets/css/calculator.css";
import * as math from "mathjs";
export default function Calculator() {
  const keys = [
    "+/-","%","AC","DEL",
    7,8,9,"/",
    4,5,6,"*",
    1,2,3,"-",
    0, ".","+","=",
  ];

  const signs = ["+", "-", "*", "/", "%"];

  const [result, setResult] = useState("0");
  const [expression, setExpression] = useState("");

  const clickHandler = (e) => {
    let value = e.target.value;

    if (value === "AC") {
      setExpression("");
      setResult("0");
    } else if (value === "DEL") {
      setExpression(expression.slice(0, -1));
      setResult("");
    } else if (value === "=") {
      try {
        if (isNaN(result)) {
          setResult("Error!");
        }
        setResult(math.evaluate(expression));
      } catch (err) {
        // setExpression("");
        setResult("Error!");
      }
    } else if(value === "+/-"){
      setResult(result * (-1))
    }else if (signs.includes(value)) {
      console.log(signs.includes(value));

      let lastChar = expression.slice(-1);
      console.log(lastChar);
      if(lastChar === ""){
        setExpression(0 + value)
      setResult("");

      }else
      if (signs.includes(lastChar)) {
        console.log(signs.includes(lastChar));
        setExpression(expression.slice(0, -1) + value);
      setResult("");

      }else{
      setExpression(expression + value);
      setResult("");

      }
    }else {
      setExpression(expression + value);
      setResult("");

    }
  };
  return (
    <div className="calculator">
      <div className="display">
        <div className="expression">{expression}</div>
        <div className="result">{result}</div>
      </div>
      <hr />
      <div className="numpad">
        {keys.map((btn, key) => {
          return (
            <button key={key} value={btn} onClick={clickHandler}>
              {btn}
            </button>
          );
        })}
      </div>
    </div>
  );
}
