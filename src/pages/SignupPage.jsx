import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  COLORS,
  sandyInput,
  sandyBtn,
  pageBg,
  focusInput,
  blurInput,
} from "../ui/shared";
import ccsLogo from "../assets/ccs-logo.png";

function ScribbleBackground() {
  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="none"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <style>{`
        .ccs-scribble {
          fill: none;
          stroke: #E8DCC4;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 1800;
          stroke-dashoffset: 1800;
          animation: ccsScribbleDraw 5s ease-out forwards;
        }

        .ccs-scribble-1 {
          stroke-width: 1.5;
          opacity: 0.09;
        }

        .ccs-scribble-2 {
          stroke-width: 1.2;
          opacity: 0.07;
          animation-delay: 0.5s;
        }

        .ccs-scribble-3 {
          stroke-width: 1.3;
          opacity: 0.08;
          animation-delay: 1s;
        }

        .ccs-scribble-4 {
          stroke-width: 1;
          opacity: 0.06;
          animation-delay: 1.5s;
        }

        .ccs-scribble-5 {
          stroke-width: 1.2;
          opacity: 0.07;
          animation-delay: 2s;
        }

        @keyframes ccsScribbleDraw {
          to {
            stroke-dashoffset: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ccs-scribble {
            animation: none;
            stroke-dashoffset: 0;
          }
        }
      `}</style>

      {/* Top flowing line */}
      <path
        className="ccs-scribble ccs-scribble-1"
        d="
          M -100 160
          C 80 70, 230 260, 400 155
          S 690 60, 850 170
          S 1120 280, 1300 150
          S 1500 60, 1700 150
        "
      />

      {/* Upper-middle line */}
      <path
        className="ccs-scribble ccs-scribble-2"
        d="
          M -100 320
          C 100 230, 250 400, 430 305
          S 720 210, 890 325
          S 1170 430, 1340 310
          S 1510 230, 1700 325
        "
      />

      {/* Main middle scribble */}
      <path
        className="ccs-scribble ccs-scribble-3"
        d="
          M -100 490
          C 110 390, 270 570, 470 465
          S 770 370, 960 490
          S 1240 610, 1420 475
          S 1570 390, 1700 465
        "
      />

      {/* Lower-middle line */}
      <path
        className="ccs-scribble ccs-scribble-4"
        d="
          M -100 650
          C 110 560, 290 730, 480 635
          S 780 545, 970 665
          S 1250 770, 1430 645
          S 1580 560, 1700 635
        "
      />

      {/* Bottom flowing line */}
      <path
        className="ccs-scribble ccs-scribble-5"
        d="
          M -100 815
          C 100 720, 280 880, 480 775
          S 790 690, 980 810
          S 1260 910, 1430 785
          S 1580 710, 1700 785
        "
      />
    </svg>
  );
}

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
    <div
      style={{
        ...pageBg,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <ScribbleBackground />

      {/* NAVBAR */}
      <header
        style={{
          height: 72,
          background: "#09111A",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          display: "flex",
          alignItems: "center",
          padding: "0 32px",
          flexShrink: 0,
          position: "relative",
          zIndex: 1,
        }}
      >
        <button
          onClick={() => navigate("/")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 700,
            fontSize: 14.5,
            color: "rgba(232,220,196,0.45)",
            letterSpacing: "-0.02em",
          }}
        >
          <img
            src={ccsLogo}
            alt="CCS logo"
            style={{
              width: 22,
              height: 22,
              objectFit: "contain",
            }}
          />
          CCS Forms
        </button>
      </header>

      {/* SIGN UP CONTENT */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 24px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 400,
          }}
        >
          <h1
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 700,
              fontSize: 50,
              letterSpacing: "-0.025em",
              color: COLORS.heading,
              margin: "0 0 6px",
              textAlign: "center",
            }}
          >
            Create your account!
          </h1>

          <p
            style={{
              fontSize: 16,
              color: COLORS.muted,
              textAlign: "center",
              margin: "0 0 28px",
            }}
          >
            Start building forms in seconds.
          </p>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {/* FULL NAME */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 11.5,
                  fontWeight: 500,
                  color: COLORS.muted,
                  marginBottom: 5,
                }}
              >
                Full name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
                style={sandyInput}
                onFocus={focusInput}
                onBlur={blurInput}
              />
            </div>

            {/* EMAIL */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 11.5,
                  fontWeight: 500,
                  color: COLORS.muted,
                  marginBottom: 5,
                }}
              >
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                style={sandyInput}
                onFocus={focusInput}
                onBlur={blurInput}
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 11.5,
                  fontWeight: 500,
                  color: COLORS.muted,
                  marginBottom: 5,
                }}
              >
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                required
                style={sandyInput}
                onFocus={focusInput}
                onBlur={blurInput}
              />
            </div>

            {/* CREATE ACCOUNT BUTTON */}
            <button
              type="submit"
              style={{
                ...sandyBtn,
                width: "100%",
                marginTop: 6,
                padding: "11px 24px",
              }}
            >
              Create account
            </button>
          </form>

          {/* LOGIN LINK */}
          <p
            style={{
              textAlign: "center",
              fontSize: 13,
              color: COLORS.muted,
              marginTop: 20,
            }}
          >
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: COLORS.teal,
                fontSize: 13,
                fontWeight: 500,
                padding: 0,
                fontFamily: "'Inter', sans-serif",
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