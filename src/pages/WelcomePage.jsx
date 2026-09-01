import { useNavigate } from "react-router-dom";
import ccsLogo from "../assets/ccs-logo.png";

const _noiseSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="200" height="200" filter="url(#n)" opacity="0.07"/></svg>`;
const NOISE_BG = `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(_noiseSvg)}")`;

const sandyBtn = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 32px",
    borderRadius: 12,
    border: "none",
    backgroundColor: "#E8DCC4",
    backgroundImage: NOISE_BG,
    backgroundRepeat: "repeat",
    backgroundSize: "200px 200px",
    backgroundBlendMode: "multiply",
    color: "#2A2118",
    fontSize: 14.5,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "'Bricolage Grotesque', sans-serif",
    letterSpacing: "-0.01em",
};

function WavyDivider({ color = "rgba(255,255,255,0.10)", style }) {
    return (
        <svg
            width="100%"
            height="8"
            viewBox="0 0 400 8"
            preserveAspectRatio="none"
            fill="none"
            style={{ display: "block", ...style }}
        >
            <path
                d="M0 4 C 30 1, 70 7, 100 4 S 170 1, 200 4 S 270 7, 300 4 S 370 1, 400 4"
                stroke={color}
                strokeWidth="1.2"
                strokeLinecap="round"
            />
        </svg>
    );
}

/* 
   ANIMATED FORM
 */

function AnimatedForm() {
    const beige = "#E8DCC4";

    const formPath =
        "M145 45 Q145 28 162 28 L610 28 Q627 28 627 45 L627 625 Q627 642 610 642 L162 642 Q145 642 145 625 Z";

    const signaturePath =
        "M445 585 C458 570 470 568 474 575 C478 583 459 592 452 585 C447 579 460 568 475 580 C486 590 495 575 505 573 C513 571 510 589 518 590 C528 590 531 572 540 574 C548 576 543 590 553 591 C566 592 571 574 580 576";

    return (
        <div
            className="ccs-animation"
            style={{
                width: "100%",
                maxWidth: 680,
                aspectRatio: "720 / 680",
                position: "relative",
            }}
        >
            <style>
                {`
          .ccs-form-line {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
            animation: ccsDrawForm 11s ease-in-out infinite;
          }

          .ccs-field {
            stroke-dasharray: 500;
            stroke-dashoffset: 500;
            animation: ccsDrawField 11s ease-out infinite;
          }

          .ccs-signature {
            stroke-dasharray: 300;
            stroke-dashoffset: 300;
            animation: ccsSignature 11s ease-out infinite;
          }

          @keyframes ccsDrawForm {
            0%, 18% {
              stroke-dashoffset: 1000;
            }

            20% {
              stroke-dashoffset: 1000;
            }

            63% {
              stroke-dashoffset: 0;
            }

            100% {
              stroke-dashoffset: 0;
            }
          }

          @keyframes ccsDrawField {
            0%, 63% {
              stroke-dashoffset: 500;
              opacity: 0;
            }

            66% {
              stroke-dashoffset: 500;
              opacity: 1;
            }

            82% {
              stroke-dashoffset: 0;
              opacity: 1;
            }

            100% {
              stroke-dashoffset: 0;
              opacity: 1;
            }
          }

          @keyframes ccsSignature {
            0%, 81% {
              stroke-dashoffset: 300;
              opacity: 0;
            }

            83% {
              stroke-dashoffset: 300;
              opacity: 1;
            }

            91% {
              stroke-dashoffset: 0;
              opacity: 1;
            }

            100% {
              stroke-dashoffset: 0;
              opacity: 1;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .ccs-form-line,
            .ccs-field,
            .ccs-signature {
              animation: none;
            }

            .ccs-form-line {
              stroke-dashoffset: 0;
            }

            .ccs-field,
            .ccs-signature {
              stroke-dashoffset: 0;
              opacity: 1;
            }
          }

          @media (max-width: 900px) {
            .ccs-animation {
              max-width: 540px !important;
              margin: 30px auto 0 !important;
            }
          }

          @media (max-width: 650px) {
            .ccs-animation {
              max-width: 430px !important;
            }
          }
        `}
            </style>

            <svg
                viewBox="0 0 720 680"
                width="100%"
                height="100%"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ overflow: "visible" }}
            >
                {/* FORM OUTLINE */}
                <path
                    className="ccs-form-line"
                    d={formPath}
                    stroke={beige}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.95"
                />

                {/* FORM TITLE LINE */}
                <path
                    className="ccs-field"
                    d="M195 88 L350 88"
                    stroke={beige}
                    strokeWidth="9"
                    strokeLinecap="round"
                />

                {/* FIRST INPUT */}
                <rect
                    className="ccs-field"
                    x="195"
                    y="125"
                    width="360"
                    height="62"
                    rx="8"
                    stroke={beige}
                    strokeWidth="2.5"
                />

                {/* SECOND INPUT */}
                <rect
                    className="ccs-field"
                    x="195"
                    y="215"
                    width="360"
                    height="62"
                    rx="8"
                    stroke={beige}
                    strokeWidth="2.5"
                />

                {/* RADIO BUTTONS */}
                <circle
                    className="ccs-field"
                    cx="210"
                    cy="340"
                    r="13"
                    stroke={beige}
                    strokeWidth="2.5"
                />

                <path
                    className="ccs-field"
                    d="M245 340 L420 340"
                    stroke={beige}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                />

                <circle
                    className="ccs-field"
                    cx="210"
                    cy="390"
                    r="13"
                    stroke={beige}
                    strokeWidth="2.5"
                />

                <path
                    className="ccs-field"
                    d="M245 390 L420 390"
                    stroke={beige}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                />

                <circle
                    className="ccs-field"
                    cx="210"
                    cy="440"
                    r="13"
                    stroke={beige}
                    strokeWidth="2.5"
                />

                <path
                    className="ccs-field"
                    d="M245 440 L420 440"
                    stroke={beige}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                />

                {/* TEXT AREA */}
                <rect
                    className="ccs-field"
                    x="195"
                    y="485"
                    width="360"
                    height="85"
                    rx="8"
                    stroke={beige}
                    strokeWidth="2.5"
                />

                {/* SUBMIT BUTTON */}
                <rect
                    className="ccs-field"
                    x="195"
                    y="590"
                    width="105"
                    height="30"
                    rx="6"
                    stroke={beige}
                    strokeWidth="2.5"
                />

                {/* CCS SIGNATURE */}
                <path
                    className="ccs-signature"
                    d={signaturePath}
                    stroke={beige}
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
}

export default function WelcomePage() {
    const navigate = useNavigate();

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                minHeight: "100vh",
                backgroundColor: "#150e23fa",
                backgroundImage: `linear-gradient(160deg, #150e23 0%, #1b1629 100%), ${NOISE_BG}`,
                backgroundRepeat: "no-repeat, repeat",
                backgroundSize: "100% 100%, 200px 200px",
                backgroundBlendMode: "normal, overlay",
                fontFamily: "'Inter', sans-serif",
                color: "#A8BAC4",
            }}
        >
            <header
                style={{
                    height: 72,
                    background: "#09111A",
                    borderBottom: "1px solid rgba(255,255,255,0.07)",
                    display: "flex",
                    alignItems: "center",
                    padding: "0 32px",
                    flexShrink: 0,
                }}
            >
                <span
                    style={{
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        fontWeight: 700,
                        fontSize: 14.5,
                        color: "#F0ECE0",
                        letterSpacing: "-0.02em",
                    }}
                >
                    CCS Forms
                </span>
            </header>

            <div
                style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    padding: "40px 48px",
                    gap: 40,
                }}
            >
                <div
                    style={{
                        width: "100%",
                        maxWidth: 480,
                        textAlign: "left",
                        marginLeft: 100,
                        flexShrink: 0,
                    }}
                >
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 10,
                            marginBottom: 36,
                        }}
                    >
                        <div
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 12,
                                background: "#112231",
                                border: "1px solid rgba(255,255,255,0.1)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <img
                                src={ccsLogo}
                                alt="CCS logo"
                                style={{ width: 36, height: 36, objectFit: "contain" }}
                            />
                        </div>

                        <span
                            style={{
                                fontFamily: "'Bricolage Grotesque', sans-serif",
                                fontWeight: 700,
                                fontSize: 14.5,
                                color: "rgba(232, 220, 196, 0.45)",
                                letterSpacing: "-0.02em",
                            }}
                        >
                            CCS Forms
                        </span>
                    </div>

                    <div style={{ position: "relative" }}>
                        <div
                            style={{
                                position: "absolute",
                                top: -40,
                                left: "0%",
                                right: "20%",
                                height: 120,
                                background:
                                    "radial-gradient(ellipse at center, rgba(102,87,131,0.25) 0%, transparent 70%)",
                                pointerEvents: "none",
                            }}
                        />

                        <h1
                            style={{
                                fontFamily: "'Bricolage Grotesque', sans-serif",
                                fontWeight: 900,
                                fontSize: "clamp(40px, 6vw, 80px)",
                                color: "#F0ECE0",
                                letterSpacing: "-0.03em",
                                lineHeight: 1.15,
                                margin: "0 0 16px",
                                position: "relative",
                            }}
                        >
                            BUILD FORMS.
                            <br />
                            GET ANSWERS.
                        </h1>
                    </div>

                    <p
                        style={{
                            fontSize: 15,
                            color: "#7A8E9A",
                            lineHeight: 1.65,
                            margin: "0 0 36px",
                            maxWidth: 360,
                        }}
                    >
                        Create and share forms in minutes. Drag in the fields you need,
                        configure them, and start collecting responses right away.
                    </p>

                    <WavyDivider
                        color="rgba(255,255,255,0.08)"
                        style={{ marginBottom: 36, maxWidth: 240 }}
                    />

                    <div
                        style={{
                            display: "flex",
                            gap: 12,
                            justifyContent: "flex-start",
                            flexWrap: "wrap",
                        }}
                    >
                        <button
                            onClick={() => navigate("/dashboard")}
                            style={sandyBtn}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.opacity = "0.9")
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.opacity = "1")
                            }
                        >
                            Get Started
                        </button>

                        <button
                            onClick={() => navigate("/login")}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "12px 32px",
                                borderRadius: 12,
                                border: "1px solid rgba(102,87,131,0.35)",
                                background: "rgba(102,87,131,0.08)",
                                color: "#D9D1E3",
                                fontSize: 14.5,
                                fontWeight: 500,
                                cursor: "pointer",
                                fontFamily: "'Inter', sans-serif",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor =
                                    "rgba(102,87,131,0.75)";
                                e.currentTarget.style.color = "#F0ECE0";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor =
                                    "rgba(102,87,131,0.35)";
                                e.currentTarget.style.color = "#D9D1E3";
                            }}
                        >
                            Log in
                        </button>
                    </div>

                    <p
                        style={{
                            fontSize: 11.5,
                            color: "rgba(102,87,131,0.75)",
                            marginTop: 32,
                            letterSpacing: "0.02em",
                        }}
                    >
                        No account required to try the builder
                    </p>
                </div>

                <AnimatedForm />
            </div>
        </div>
    );
}