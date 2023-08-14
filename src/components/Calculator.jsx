import React, { useState } from "react";
import "../assets/css/calculator.css";
import * as math from "mathjs";

export default function Calculator() {
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
  const [result, setResult] = useState("0");
  const [expression, setExpression] = useState("");
  const [evaluated, setEvaluated] = useState(false);

  const clickHandler = (e) => {
    const value = e.target.value;
    if (value === "AC") {
      setExpression("");
      setResult("0");
      setEvaluated(false);
    } else if (value === "DEL") {
      setExpression(expression.slice(0, -1));
      setResult("");
      setEvaluated(false);
    } else if (value === "=") {
      try {
        if (isNaN(result)) {
          setResult("Error!");
        } else {
          setResult(math.evaluate(expression));
          setExpression(math.evaluate(expression).toString());
        }
      } catch (err) {
        setResult("Error!");
      }
      setEvaluated(true);
    } else if (value === "+/-") {
      setResult((parseFloat(result) * -1).toString());
    } else if (signs.includes(value)) {
      const lastChar = expression.slice(-1);
      if (lastChar === "" || signs.includes(lastChar)) {
        setExpression(expression.slice(0, -1) + value);
      } else {
        setExpression(expression + value);
      }
      setResult("");
      setEvaluated(false);
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

