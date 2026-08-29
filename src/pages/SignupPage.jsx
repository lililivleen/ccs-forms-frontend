import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { COLORS, sandyInput, sandyBtn, pageBg, focusInput, blurInput, WavyDivider } from "../ui/shared";

export default function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    navigate("/dashboard");
  }

  return (
    <div style={{ ...pageBg, display: "flex", flexDirection: "column" }}>
      <header style={{
        height: 50,
        background: "rgba(11,26,36,0.92)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        display: "flex", alignItems: "center", padding: "0 24px",
        flexShrink: 0,
      }}>
        <button
          onClick={() => navigate("/")}
          style={{
            background: "none", border: "none", cursor: "pointer",
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 700, fontSize: 14.5,
            color: COLORS.heading, letterSpacing: "-0.02em",
          }}
        >
          FormCraft
        </button>
      </header>

      <div style={{
        flex: 1, display: "flex", alignItems: "center",
        justifyContent: "center", padding: "40px 24px",
      }}>
        <div style={{ width: "100%", maxWidth: 400 }}>
          <h1 style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 700, fontSize: 26, letterSpacing: "-0.025em",
            color: COLORS.heading, margin: "0 0 6px", textAlign: "center",
          }}>
            Create your account
          </h1>
          <p style={{
            fontSize: 13.5, color: COLORS.muted, textAlign: "center",
            margin: "0 0 28px",
          }}>
            Start building forms in seconds.
          </p>

          <WavyDivider color="rgba(255,255,255,0.07)" style={{ marginBottom: 28 }} />

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{
                display: "block", fontSize: 11.5, fontWeight: 500,
                color: COLORS.muted, marginBottom: 5,
              }}>
                Full name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
                style={sandyInput}
                onFocus={focusInput} onBlur={blurInput}
              />
            </div>
            <div>
              <label style={{
                display: "block", fontSize: 11.5, fontWeight: 500,
                color: COLORS.muted, marginBottom: 5,
              }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                style={sandyInput}
                onFocus={focusInput} onBlur={blurInput}
              />
            </div>
            <div>
              <label style={{
                display: "block", fontSize: 11.5, fontWeight: 500,
                color: COLORS.muted, marginBottom: 5,
              }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                required
                style={sandyInput}
                onFocus={focusInput} onBlur={blurInput}
              />
            </div>

            <button type="submit" style={{ ...sandyBtn, width: "100%", marginTop: 6, padding: "11px 24px" }}>
              Create account
            </button>
          </form>

          <p style={{
            textAlign: "center", fontSize: 13, color: COLORS.muted, marginTop: 20,
          }}>
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: COLORS.teal, fontSize: 13, fontWeight: 500,
                padding: 0, fontFamily: "'Inter', sans-serif",
              }}
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}