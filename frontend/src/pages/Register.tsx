import { useState } from "react";
import { CSSProperties } from "react"; 

function Register({ setShowLogin }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const res = await fetch("https://vi-notes-4.onrender.com/api/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      alert(data.message || "Registered!");

      setShowLogin(true);
    } catch (err) {
      console.error(err);
      alert("Error registering");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2> Register</h2>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <button onClick={handleRegister} style={buttonStyle}>
          Sign Up
        </button>

        <p>
          Already have an account?{" "}
          <span style={linkStyle} onClick={() => setShowLogin(true)}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}


const containerStyle: CSSProperties = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(to right, #ffe4e6, #ecfdf5)",
};

const cardStyle: CSSProperties = {
  padding: "30px",
  borderRadius: "20px",
  background: "white",
  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  width: "300px",
};

const inputStyle: CSSProperties = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const buttonStyle: CSSProperties = {
  padding: "10px",
  borderRadius: "8px",
  border: "none",
  background: "linear-gradient(to right, #f472b6, #34d399)",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
};

const linkStyle: CSSProperties = {
  color: "#6366f1",
  cursor: "pointer",
};

export default Register;