import { useState } from "react";

function Login({ setUserId, setShowLogin }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("https://vi-notes-4.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!data.userId) {
        alert("Login failed");
        return;
      }

      
      localStorage.setItem("userId", data.userId);

      setUserId(data.userId);
    } catch (err) {
      console.error(err);
      alert("Error logging in");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #ffe4e6, #ecfdf5)",
      }}
    >
      <div
        style={{
          padding: "30px",
          borderRadius: "20px",
          background: "white",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "300px",
        }}
      >
        <h2 style={{ textAlign: "center" }}> Login</h2>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            background: "linear-gradient(to right, #f472b6, #34d399)",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Login
        </button>
        <p style={{ textAlign: "center", marginTop: "10px" }}>
        Don't have an account?{" "}
        <span
         style={{ color: "#6366f1", cursor: "pointer", fontWeight: "bold" }}
         onClick={() => setShowLogin(false)}
        >
    Register
    </span>
        </p>
      </div>
    </div>
  );
}

export default Login;