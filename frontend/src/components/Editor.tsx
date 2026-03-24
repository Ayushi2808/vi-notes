import { useState, useEffect } from "react";

function Editor({ setStatus }: any) {
  const [text, setText] = useState("");
  const [lastTime, setLastTime] = useState(Date.now());
  const [charCount, setCharCount] = useState(0);
  const [keystrokes, setKeystrokes] = useState<any[]>([]);
  const [pasted, setPasted] = useState(false);

  // Track typing / thinking
  const handleKeyDown = (e: any) => {
    const now = Date.now();
    const delay = now - lastTime;

    if (delay > 2000) setStatus("Thinking...");
    else setStatus("Typing");

    setLastTime(now);

    // store keystrokes
    setKeystrokes((prev) => [
      ...prev,
      { key: e.key, timestamp: now },
    ]);
  };

  //  Detect paste
  const handlePaste = () => {
    setPasted(true);
  };

  //  Character count
  useEffect(() => {
    setCharCount(text.length);
  }, [text]);

  //  Save to backend
  const handleSave = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "testUser",
          text,
          keystrokes,
          pasted,
          startTime: new Date(),
          endTime: new Date(),
        }),
      });

      const data = await res.json();
      console.log("Saved:", data);

      alert("Saved successfully!");

      // reset after save
      setText("");
      setKeystrokes([]);
      setPasted(false);
    } catch (err) {
      console.error("Save error:", err);
      alert("Error saving note");
    }
  };

  return (
    <div
      style={{
        flex: 2,
        padding: "20px",
        backgroundColor: "white",
        borderRadius: "16px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2> Vi-Notes Editor</h2>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        placeholder="Start typing here..."
        style={{
          flex: 1,
          width: "100%",
          padding: "14px",
          fontSize: "16px",
          borderRadius: "10px",
          border: "1px solid #ddd",
          outline: "none",
          marginTop: "10px",
          resize: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "15px",
        }}
      >
        <span style={{ color: "#666" }}>
          Characters: {charCount}
        </span>

        <button
          onClick={handleSave}
          style={{
            padding: "10px 22px",
            borderRadius: "8px",
            border: "none",
            background: "linear-gradient(135deg, #4CAF50, #00c853)",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default Editor;
