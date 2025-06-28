import React, { useState } from "react";

const characterSets = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

function RandomkeyGeneration() {
  const [key, setKey] = useState("");
  const [copied, setCopied] = useState(false);
  const [length, setLength] = useState("8");
  const [settings, setSettings] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  

  const handleCheckBox = (e) => {
    const { name, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const generateKey = () => {
    const numericLength = Number(length);

    if (!numericLength || numericLength < 4 || numericLength > 64) {
      setKey("❌ Please enter a length between 4 and 64");
      return;
    }

    let allChars = "";
    const keys = Object.keys(characterSets);
    for (let i = 0; i < keys.length; i++) {
      const type = keys[i];
      if (settings[type]) {
        allChars += characterSets[type];
      }
    }

    if (!allChars) {
      setKey("❌ Please select at least one character set");
      return;
    }

    let newKey = "";
    for (let i = 0; i < numericLength; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      newKey += allChars[randomIndex];
    }

    setKey(newKey);
    setCopied(false);
  };

  const copyToClipboard = () => {
    if (key && !key.startsWith("❌")) {
      navigator.clipboard.writeText(key);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h2 className="title">🔐 Random Key Generator</h2>
        
      </div>

      <div className="input-group">
        <label>
          Length:
          <input
            type="number"
            min="4"
            max="64"
            placeholder="Enter length (4-64)"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="input"
          />
        </label>
      </div>

      <div className="checkbox-group">
        {Object.keys(characterSets).map((setName) => (
          <label key={setName} className="checkbox-label">
            <input
              type="checkbox"
              name={setName}
              checked={settings[setName]}
              onChange={handleCheckBox}
            />
            {" "}
            {setName.charAt(0).toUpperCase() + setName.slice(1)}
          </label>
        ))}
      </div>

      <div className="button-group">
        <button onClick={generateKey} className="generate-btn">Generate Key</button>
      </div>

      <div className="output">
        <p><strong>Generated Key:</strong> {key}</p>
        <button onClick={copyToClipboard} className="copy-btn">
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}

export default RandomkeyGeneration;
