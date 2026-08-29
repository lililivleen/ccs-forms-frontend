import { useNavigate } from "react-router-dom";

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

export default function WelcomePage() {
    const navigate = useNavigate();
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                minHeight: "100vh",
                backgroundColor: "#0B1A24",
                backgroundImage: `linear-gradient(160deg, #0B1A24 0%, #16283A 100%), ${NOISE_BG}`,
                backgroundRepeat: "no-repeat, repeat",
                backgroundSize: "100% 100%, 200px 200px",
                backgroundBlendMode: "normal, overlay",
                fontFamily: "'Inter', sans-serif",
                color: "#A8BAC4",
            }}
        >
            <header
                style={{
                    height: 50,
                    background: "rgba(11,26,36,0.92)",
                    borderBottom: "1px solid rgba(255,255,255,0.07)",
                    display: "flex",
                    alignItems: "center",
                    padding: "0 24px",
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
                    FormCraft
                </span>
            </header>

            <div
                style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "40px 24px",
                }}
            >
                <div style={{ width: "100%", maxWidth: 480, textAlign: "center" }}>
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
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <rect x="1" y="5" width="11" height="1.5" rx="0.75" fill="#2DD4BF" />
                                <rect x="1" y="9" width="8" height="1.5" rx="0.75" fill="#2DD4BF" opacity="0.6" />
                                <rect x="1" y="13" width="9" height="1.5" rx="0.75" fill="#2DD4BF" opacity="0.35" />
                                <rect x="14" y="2" width="3" height="14" rx="1.5" fill="#2C4A5E" />
                            </svg>
                        </div>
                        <span
                            style={{
                                fontFamily: "'Bricolage Grotesque', sans-serif",
                                fontWeight: 700,
                                fontSize: 18,
                                color: "#F0ECE0",
                                letterSpacing: "-0.025em",
                            }}
                        >
                            FormCraft
                        </span>
                    </div>

                    <div style={{ position: "relative" }}>
                        <div
                            style={{
                                position: "absolute",
                                top: -40,
                                left: "15%",
                                right: "15%",
                                height: 120,
                                background:
                                    "radial-gradient(ellipse at center, rgba(107,91,149,0.2) 0%, transparent 70%)",
                                pointerEvents: "none",
                            }}
                        />

                        <h1
                            style={{
                                fontFamily: "'Bricolage Grotesque', sans-serif",
                                fontWeight: 700,
                                fontSize: "clamp(30px, 6vw, 42px)",
                                color: "#F0ECE0",
                                letterSpacing: "-0.03em",
                                lineHeight: 1.15,
                                margin: "0 0 16px",
                                position: "relative",
                            }}
                        >
                            Build forms.
                            <br />
                            Get answers.
                        </h1>
                    </div>

                    <p
                        style={{
                            fontSize: 15,
                            color: "#7A8E9A",
                            lineHeight: 1.65,
                            margin: "0 auto 36px",
                            maxWidth: 360,
                        }}
                    >
                        Create and share forms in minutes. Drag in the fields you need,
                        configure them, and start collecting responses right away.
                    </p>

                    <WavyDivider
                        color="rgba(255,255,255,0.08)"
                        style={{ marginBottom: 36, maxWidth: 240, marginLeft: "auto", marginRight: "auto" }}
                    />

                    <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                        <button
                            onClick={() => navigate("/dashboard")}
                            style={sandyBtn}
                            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
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
                                border: "1px solid rgba(255,255,255,0.12)",
                                background: "rgba(255,255,255,0.04)",
                                color: "#A8BAC4",
                                fontSize: 14.5,
                                fontWeight: 500,
                                cursor: "pointer",
                                fontFamily: "'Inter', sans-serif",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                                e.currentTarget.style.color = "#F0ECE0";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                                e.currentTarget.style.color = "#A8BAC4";
                            }}
                        >
                            Log in
                        </button>
                    </div>

                    <p
                        style={{
                            fontSize: 11.5,
                            color: "#2C4A5E",
                            marginTop: 32,
                            letterSpacing: "0.02em",
                        }}
                    >
                        No account required to try the builder
                    </p>
                </div>
            </div>
        </div>
    );
}