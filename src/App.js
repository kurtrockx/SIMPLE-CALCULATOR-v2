import { useState } from "react";
import "./index.css";

const operators = ["+", "−", "×", "÷"];
const bottom = [".", "0", "="];

function App() {
  const [currValue, setCurrValue] = useState("");
  const [num1, setNum1] = useState("");
  const [operator, setOperator] = useState("");

  function handleKeyPress(value) {
    if (
      (value === "." && currValue.includes(".")) ||
      (value === "0" && currValue === "0")
    ) {
      return;
    } else if (operators.includes(value)) {
      setOperator(value);
      setNum1(currValue);
      setCurrValue("");
      return;
    } else if (value === "=") {
      calculate(parseFloat(num1), parseFloat(currValue), operator);
      return;
    }
    setCurrValue((v) => v + value);
  }

  function calculate(num1, num2, op) {
    switch (op) {
      case "+":
        setCurrValue(num1 + num2);
        break;
      case "−":
        setCurrValue(num1 - num2);
        break;
      case "×":
        setCurrValue(num1 * num2);
        break;
      case "÷":
        setCurrValue(num1 / num2);
        break;
      default:
        console.log("Error: could not calculate!");
    }
  }

  function reset() {
    setNum1("");
    setCurrValue("");
    setOperator("");
  }

  return (
    <div className="App">
      <Screen
        currValue={
          currValue === 0
            ? 0
            : currValue
            ? currValue
            : operator
            ? operator
            : "0"
        }
      >
        <Button onClick={reset}>CLEAR</Button>
      </Screen>

      <InputContainer>
        <ButtonsContainer className="numbers">
          {Array.from({ length: 9 }).map((_, i) => (
            <Button key={i} onClick={() => handleKeyPress((i + 1).toString())}>
              {i + 1}
            </Button>
          ))}
        </ButtonsContainer>
        <ButtonsContainer className="operators">
          {operators.map((op) => (
            <Button key={op} onClick={() => handleKeyPress(op)}>
              {op}
            </Button>
          ))}
        </ButtonsContainer>
        <ButtonsContainer className="bottom">
          {bottom.map((bottom) => (
            <Button key={bottom} onClick={() => handleKeyPress(bottom)}>
              {bottom}
            </Button>
          ))}
        </ButtonsContainer>
      </InputContainer>
    </div>
  );
}

function Screen({ children, currValue }) {
  return (
    <div className="screen">
      <p className="screen-value">{currValue}</p>
      {children}
    </div>
  );
}

function InputContainer({ children }) {
  return <div className="input-container">{children}</div>;
}

function ButtonsContainer({ children, className = "" }) {
  return <div className={`buttons-container ${className}`}>{children}</div>;
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default App;
