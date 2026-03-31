import { useState, useEffect } from "react";

function Editor({
  setStatus,
  setTextLength,
  setPasted,
  setKeystrokes,
  setIsAuthentic,
}: any) {
  const [text, setText] = useState("");
  const [lastTime, setLastTime] = useState(Date.now());
  const [localKeystrokes, setLocalKeystrokes] = useState<any[]>([]);
  const [localPasted, setLocalPasted] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  // ✅ Track typing
  const handleKeyDown = (e: any) => {
    const now = Date.now();

    if (!startTime) setStartTime(now);

    const delay = now - lastTime;

    if (delay > 2000) setStatus("Thinking...");
    else setStatus("Typing");

    setLastTime(now);

    const newStroke = { key: e.key, timestamp: now };

    setLocalKeystrokes((prev: any[]) => {
      const updated = [...prev, newStroke];
      setKeystrokes(updated); // ✅ send to parent
      return updated;
    });
  };

  // ✅ Detect paste properly
  const handlePaste = (e: any) => {
    setLocalPasted(true);
    setPasted(true); // send to parent

    const pastedText = e.clipboardData.getData("text");
    setText((prev) => prev + pastedText);
  };

  // ✅ Send text length to parent
  useEffect(() => {
    setTextLength(text.length);
  }, [text]);

  // ✅ Save
  const handleSave = async () => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        alert("Please login first");
        return;
      }

      if (text.trim().length === 0) {
        alert("Cannot save empty note");
        return;
      }

      const isAuthentic =
        text.length > 20 &&
        localKeystrokes.length > 20 &&
        !localPasted;

      setIsAuthentic(isAuthentic);

      setStatus(
        isAuthentic ? "Authentic Content" : "Possibly Copied"
      );

      await fetch(
        "https://vi-notes-4.onrender.com/api/sessions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            text,
            keystrokes: localKeystrokes,
            pasted: localPasted,
            isAuthentic,
            startTime,
            endTime: Date.now(),
          }),
        }
      );

      alert("Saved successfully!");

      // ✅ Reset everything
      setText("");
      setLocalKeystrokes([]);
      setLocalPasted(false);
      setStartTime(null);

      setKeystrokes([]);
      setPasted(false);
      setTextLength(0);
      setIsAuthentic(false);
      setStatus("Idle");

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
      <h2>Vi-Notes Editor</h2>

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
          marginTop: "15px",
        }}
      >
        <span style={{ color: "#666" }}>
          Characters: {text.length}
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
