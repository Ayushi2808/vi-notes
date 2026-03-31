import { useState } from "react";
import Editor from "../components/Editor";
import Analytics from "../components/Analytics";
import NotesList from "../components/NotesList";

type Keystroke = {
  key: string;
  timestamp: number;
};

function Home() {
  const [status, setStatus] = useState("Idle");
  const [textLength, setTextLength] = useState(0);
  const [pasted, setPasted] = useState(false);
  const [keystrokes, setKeystrokes] = useState<Keystroke[]>([]);
  const [isAuthentic, setIsAuthentic] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "#f9fafb",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      {/* HEADER */}
      <header
        style={{
          height: "60px",
          background: "linear-gradient(to right, #ce90bd, #84f2da)",
          color: "white",
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          fontSize: "1.4rem",
          fontWeight: "bold",
          letterSpacing: "1px",
        }}
      >
        Your Vi-Notes 
      </header>


      <div
  style={{
    display: "flex",
    flex: 1,
    gap: "20px",
    padding: "20px",
  }}
>
  <Editor
  setStatus={setStatus}
  setTextLength={setTextLength}
  setPasted={setPasted}
  setKeystrokes={setKeystrokes}
  setIsAuthentic={setIsAuthentic}
/>

  <Analytics
  status={status}
  textLength={textLength}
  pasted={pasted}
  keystrokes={keystrokes}
  isAuthentic={isAuthentic}
/>

  <NotesList />
</div>

    </div>
  );
}

export default Home;