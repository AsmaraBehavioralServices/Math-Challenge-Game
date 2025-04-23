import React, { useState } from "react";

const generateNumber = (level) => {
  const multiplier = level * 10;
  return Math.floor(Math.random() * multiplier) + 1;
};

const operations = [
  { symbol: "+", func: (a, b) => a + b },
  { symbol: "-", func: (a, b) => a - b },
  { symbol: "×", func: (a, b) => a * b },
  { symbol: "÷", func: (a, b) => Math.floor(a / b) },
];

export default function HypercalculiaGame() {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [current, setCurrent] = useState(generateChallenge(level));
  const [enabledOps, setEnabledOps] = useState(["+", "-", "×", "÷"]);

  function generateChallenge(level) {
    const availableOps = operations.filter((op) => enabledOps.includes(op.symbol));
    const op = availableOps[Math.floor(Math.random() * availableOps.length)];
    const a = generateNumber(level);
    const b = generateNumber(level);
    return {
      a,
      b,
      symbol: op.symbol,
      result: op.func(a, b),
    };
  }

  const nextChallenge = () => {
    setInput("");
    setFeedback("");
    setCurrent(generateChallenge(level));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const answer = parseInt(input);
    if (answer === current.result) {
      setScore(score + 1);
      setFeedback("✅ Correct!");
      if ((score + 1) % 5 === 0) {
        setLevel(level + 1);
      }
    } else {
      setFeedback(`❌ Incorrect. The correct answer was ${current.result}`);
    }
    setTimeout(nextChallenge, 1500);
  };

  const toggleOperation = (symbol) => {
    setEnabledOps((prev) =>
      prev.includes(symbol) ? prev.filter((s) => s !== symbol) : [...prev, symbol]
    );
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-2xl shadow-md space-y-4 text-center">
      <h1 className="text-xl font-bold">Hypercalculia Challenge</h1>
      <p className="text-gray-700">
        What is <strong>{current.a} {current.symbol} {current.b}</strong>?
      </p>

      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="number"
          className="w-full p-2 border rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Your answer"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Submit
        </button>
      </form>

      {feedback && <p className="mt-2 font-medium">{feedback}</p>}

      <div className="mt-4 text-sm text-gray-600">Score: {score} | Level: {level}</div>

      <div className="mt-4">
        <h2 className="font-semibold mb-2">Enabled Operations</h2>
        <div className="flex justify-center space-x-2">
          {operations.map((op) => (
            <button
              key={op.symbol}
              onClick={() => toggleOperation(op.symbol)}
              className={\`px-3 py-1 border rounded \${enabledOps.includes(op.symbol) ? "bg-green-200" : "bg-gray-200"}\`}
            >
              {op.symbol}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}