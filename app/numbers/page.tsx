"use client";

import { useContext } from "react";
import { ScreenContext } from "../page";

const Numbers: React.FC = () => {
  const { screenValue, setScreenValue } = useContext(ScreenContext);

  const numberList = [
    1,
    2,
    3,
    "+",
    4,
    5,
    6,
    "-",
    7,
    8,
    9,
    "*",
    ".",
    0,
    "=",
    "/",
    "(",
    ")",
    "C",
  ];

  const isOperator = (char: string) => {
    return ["+", "-", "*", "/", "(", ")"].includes(char);
  };

  const calculateExpression = (expression: string): number => {
    expression = expression.replace(/\s/g, "");

    const tokens: (number | string)[] = [];
    let currentNumber = "";

    for (const char of expression) {
      if (isOperator(char)) {
        if (currentNumber) {
          tokens.push(parseFloat(currentNumber));
          currentNumber = "";
        }
        tokens.push(char);
      } else {
        currentNumber += char;
      }
    }
    if (currentNumber) {
      tokens.push(parseFloat(currentNumber));
    }

    const evaluateParentheses = (tokens: (number | string)[]): number => {
      const stack: (number | string)[] = [];

      for (let i = 0; i < tokens.length; i++) {
        if (tokens[i] === "(") {
          const innerExpression: (number | string)[] = [];
          let parenthesesCount = 1;
          i++;

          while (i < tokens.length && parenthesesCount > 0) {
            if (tokens[i] === "(") parenthesesCount++;
            if (tokens[i] === ")") parenthesesCount--;
            if (parenthesesCount > 0) innerExpression.push(tokens[i]);
            i++;
          }

          stack.push(evaluateParentheses(innerExpression));
          i--;
        } else {
          stack.push(tokens[i]);
        }
      }

      return evaluateSimpleExpression(stack);
    };

    const evaluateSimpleExpression = (tokens: (number | string)[]): number => {
      const stack: (number | string)[] = [];

      for (let i = 0; i < tokens.length; i++) {
        if (tokens[i] === "*" || tokens[i] === "/") {
          const prev = stack.pop() as number;
          const next = tokens[i + 1] as number;
          const result = tokens[i] === "*" ? prev * next : prev / next;
          stack.push(result);
          i++;
        } else {
          stack.push(tokens[i]);
        }
      }

      let result = stack[0] as number;
      for (let i = 1; i < stack.length; i += 2) {
        const operator = stack[i] as string;
        const operand = stack[i + 1] as number;

        if (operator === "+") {
          result += operand;
        } else if (operator === "-") {
          result -= operand;
        }
      }

      return result;
    };
    try {
      return evaluateParentheses(tokens);
    } catch (error) {
      throw new Error(`Invalid expression: ${error}`);
    }
  };

  const handleClick = (value: string | number) => {
    if (value === "C") {
      setScreenValue(""); // Clear screen on 'C'
    } else if (value === "=") {
      try {
        const result = calculateExpression(screenValue);
        setScreenValue(result.toString());
      } catch {
        setScreenValue("Error");
      }
    } else {
      setScreenValue(screenValue + value); // Append number or operator
    }
  };

  return (
    <div className="grid gap-4 grid-cols-4 min-w-60 pt-10">
      {numberList.map((number) => {
        return (
          <div
            key={number}
            className="text-center p-2 bg-slate-300 rounded-lg"
            onClick={() => handleClick(number)}
          >
            {number}
          </div>
        );
      })}
    </div>
  );
};

export default Numbers;
