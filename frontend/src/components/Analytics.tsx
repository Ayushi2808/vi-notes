import React from "react";

type Keystroke = {
  key: string;
  timestamp: number;
};

type AnalyticsProps = {
  status: string;
  textLength: number;
  pasted: boolean;
  keystrokes: Keystroke[];
  isAuthentic: boolean; // ✅ comes from parent
};

function Analytics({
  status,
  textLength,
  pasted,
  keystrokes,
  isAuthentic,
}: AnalyticsProps) {
  // 🧠 WORD COUNT (approx)
  const words = Math.floor(textLength / 5);

  // ⏱️ TYPING SPEED (WPM)
  let wpm = 0;

  if (keystrokes.length > 1) {
    const timeDiff =
      (keystrokes[keystrokes.length - 1].timestamp -
        keystrokes[0].timestamp) /
      60000; // minutes

    wpm = timeDiff > 0 ? Math.round(words / timeDiff) : 0;
  }

  // ⏸️ PAUSE DETECTION (>2 sec gap)
  let pauses = 0;

  for (let i = 1; i < keystrokes.length; i++) {
    if (keystrokes[i].timestamp - keystrokes[i - 1].timestamp > 2000) {
      pauses++;
    }
  }

  return (
    <div
      style={{
        flex: 1,
        padding: "20px",
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <h3>Session Insights</h3>

      {/* STATUS */}
      <p style={{ color: status === "Typing" ? "green" : "orange" }}>
        Status: {status}
      </p>

      {/* METRICS */}
      <p>Typing Speed: {wpm} WPM</p>
      <p>Characters Typed: {textLength}</p>
      <p>Pauses: {pauses}</p>

      {/* PASTE */}
      <p>
        Paste Detection:{" "}
        <span style={{ color: pasted ? "red" : "green" }}>
          {pasted ? "Pasted" : "Original"}
        </span>
      </p>

      {/* AUTHENTICITY */}
      <p>
        Authenticity:{" "}
        <span
          style={{
            color: isAuthentic ? "green" : "red",
            fontWeight: "bold",
          }}
        >
          {isAuthentic ? "Verified" : "Not Verified"}
        </span>
      </p>
    </div>
  );
}

export default Analytics;