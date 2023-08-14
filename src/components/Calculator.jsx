import React, { useState } from "react";
import "../assets/css/calculator.css";
import * as math from "mathjs";  //Using Math.js to Calculate
import tapAudio from '../assets/audio/tap.mp3'//Audio Effect On Button Tap

export default function Calculator() { //Array of Keys
  const keys = [
    "+/-",
    "%",
    "AC",
    "DEL",
    7,
    8,
    9,
    "/",
    4,
    5,
    6,
    "*",
    1,
    2,
    3,
    "-",
    0,
    ".",
    "+",
    "=",
  ];

  const signs = ["+", "-", "*", "/", "%"];
  const [result, setResult] = useState("0"); //To Set Result
  const [expression, setExpression] = useState(""); //To Set Expression
  const [evaluated, setEvaluated] = useState(false); // To check evaluation
  const [canUseDecimal, setCanUseDecimal] = useState(true); //to avoid multiple use of decimal

  const audio = new Audio(tapAudio);
  const clickHandler = (e) => {
    audio.play();

    const value = e.target.value;
    // Handling Clear All
    if (value === "AC") {
      setExpression("");
      setResult("0");
      setEvaluated(false);
      setCanUseDecimal(true);
    } else if (value === "DEL") { //Handling Backspace
      if (expression.length > 0) {
        const lastChar = expression.slice(-1);
        if (lastChar === ".") {
          setCanUseDecimal("true");
        }
        setExpression(expression.slice(0, -1));
        setResult("");
        setEvaluated(false);
      }else{
        setExpression(result.toString().slice(0, -1));
        setResult("");
        setEvaluated(false);
        setCanUseDecimal(true);
      }
    } else if (value === "=") {  //Evaluating Final Result
      try {
        let calculated = math.evaluate(expression);
        if (isNaN(calculated)) {  //Handling 0/0 Error
          setResult("Error!");
        } else {
          let rounded = calculated.toFixed(9);
          let roundedVal = parseFloat(rounded);
          setResult(roundedVal.toString());
          setExpression(roundedVal.toString());
        }
      } catch (err) {
        setResult("Error!");
      }
      setEvaluated(true);
    } else if (value === "+/-") {  //Handling (+/-)
      setResult((parseFloat(result) * -1).toString());
    } else if (signs.includes(value)) {

      const lastChar = expression.slice(-1);
      if (lastChar === "" || signs.includes(lastChar)) {
        setExpression(expression.slice(0, -1) + value);
      } else {
        setExpression(expression + value);
        setCanUseDecimal(true);
      }
      setResult("");
      setEvaluated(false);
    } else if (value === ".") {  //To check and avoid multiple use of decimal
      if (canUseDecimal) {
        setCanUseDecimal(false);
        setExpression(expression + value);
      }
    } else {

      if (evaluated) {
        setEvaluated(false);
        setExpression(value);
      } else {
        setExpression(expression + value);
      }
      setResult("");
    }
  };
// UI
  return (
    <div className="calculator">
      <div className="display">
        <div className="expression">{expression}</div>
        <div className="result">{result}</div>
      </div>
      <hr />
      <div className="numpad">
        {keys.map((btn, key) => (
          <button key={key} value={btn} onClick={clickHandler}>
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}
