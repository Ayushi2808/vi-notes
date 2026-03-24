type Keystroke = {
  key: string;
  timestamp: number;
};

type AnalyticsProps = {
  status: string;
  textLength: number;
  pasted: boolean;
  keystrokes: Keystroke[];
};

function Analytics({
  status,
  textLength,
  pasted,
  keystrokes,
}: AnalyticsProps) {
  const words = Math.floor(textLength / 5);

  let wpm = 0;
  if (keystrokes.length > 1) {
    const timeDiff =
      (keystrokes[keystrokes.length - 1].timestamp -
        keystrokes[0].timestamp) /
      60000;

    wpm = timeDiff > 0 ? Math.round(words / timeDiff) : 0;
  }

  let pauses = 0;
  for (let i = 1; i < keystrokes.length; i++) {
    if (keystrokes[i].timestamp - keystrokes[i - 1].timestamp > 2000) {
      pauses++;
    }
  }

  const isVerified = !pasted && wpm < 120;

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

      <p style={{ color: status === "Typing" ? "green" : "orange" }}>
        Status: {status}
      </p>

      <p>Typing Speed: {wpm} WPM</p>
      <p>Characters Typed: {textLength}</p>
      <p>Pauses: {pauses}</p>

      <p>
        Paste Detection:{" "}
        <span style={{ color: pasted ? "red" : "green" }}>
          {pasted ? "Pasted" : "Original"}
        </span>
      </p>

      <p>
        Authenticity:{" "}
        <span
          style={{
            color: isVerified ? "green" : "red",
            fontWeight: "bold",
          }}
        >
          {isVerified ? " Verified" : " Not Verified"}
        </span>
      </p>
    </div>
  );
}

export default Analytics;