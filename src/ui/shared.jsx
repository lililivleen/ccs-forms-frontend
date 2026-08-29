const _noiseSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="200" height="200" filter="url(#n)" opacity="0.07"/></svg>`;
export const NOISE_BG = `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(_noiseSvg)}")`;

export const COLORS = {
  navyDeep: "#0B1A24",
  navyLight: "#16283A",
  heading: "#F0ECE0",
  muted: "#7A8E9A",
  subtle: "#54636C",
  teal: "#2DD4BF",
  cream: "#E8DCC4",
  ink: "#2A2118",
  purple: "#6B5B95",
  border: "rgba(255,255,255,0.12)",
};

export const pageBg = {
  height: "100%",
  minHeight: "100vh",
  backgroundColor: COLORS.navyDeep,
  backgroundImage: `linear-gradient(160deg, ${COLORS.navyDeep} 0%, ${COLORS.navyLight} 100%), ${NOISE_BG}`,
  backgroundRepeat: "no-repeat, repeat",
  backgroundSize: "100% 100%, 200px 200px",
  backgroundBlendMode: "normal, overlay",
  fontFamily: "'Inter', sans-serif",
  color: COLORS.muted,
};

export const sandyBtn = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "12px 32px",
  borderRadius: 12,
  border: "none",
  backgroundColor: COLORS.cream,
  backgroundImage: NOISE_BG,
  backgroundRepeat: "repeat",
  backgroundSize: "200px 200px",
  backgroundBlendMode: "multiply",
  color: COLORS.ink,
  fontSize: 14.5,
  fontWeight: 600,
  cursor: "pointer",
  fontFamily: "'Bricolage Grotesque', sans-serif",
  letterSpacing: "-0.01em",
};

export const sandyInput = {
  width: "100%",
  boxSizing: "border-box",
  padding: "11px 14px",
  borderRadius: 10,
  border: `1px solid ${COLORS.border}`,
  backgroundColor: COLORS.cream,
  backgroundImage: NOISE_BG,
  backgroundRepeat: "repeat",
  backgroundSize: "200px 200px",
  backgroundBlendMode: "multiply",
  color: COLORS.ink,
  fontSize: 14,
  fontFamily: "'Inter', sans-serif",
  outline: "none",
  transition: "border-color 0.15s ease",
};

export function focusInput(e) {
  e.currentTarget.style.borderColor = COLORS.teal;
}

export function blurInput(e) {
  e.currentTarget.style.borderColor = COLORS.border;
}

export function WavyDivider({ color = "rgba(255,255,255,0.10)", style }) {
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