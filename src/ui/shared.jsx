// =========================================================
// CCS FORMS
// Shared design tokens and primitive components
// =========================================================


// =========================================================
// NOISE TEXTURE
// =========================================================

const _noiseSvg = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="200"
    height="200"
  >
    <filter id="n">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.68"
        numOctaves="4"
        stitchTiles="stitch"
      />

      <feColorMatrix
        type="saturate"
        values="0"
      />
    </filter>

    <rect
      width="200"
      height="200"
      filter="url(#n)"
      opacity="0.07"
    />
  </svg>
`;

export const NOISE_BG =
  `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    _noiseSvg
  )}")`;


// =========================================================
// COLORS
// =========================================================

export const COLORS = {

  // -------------------------------------------------------
  // Main backgrounds
  // -------------------------------------------------------

  bgApp: "#150e23",

  bgCard: "#18162A",

  bgPanel: "#19152A",

  bgHeader: "#171126",


  // -------------------------------------------------------
  // Purple brand colors
  // -------------------------------------------------------

  primary: "#665783",

  purple: "#786A99",


  // -------------------------------------------------------
  // Small interaction highlight
  // -------------------------------------------------------

  teal: "#2DD4BF",


  // -------------------------------------------------------
  // Cream controls
  // -------------------------------------------------------

  sandy: "#E8DCC4",

  sandyText: "#2A2118",

  placeholder: "#8B7D5F",


  // -------------------------------------------------------
  // Text
  // -------------------------------------------------------

  heading: "#F0ECE0",

  body: "#AEB5C1",

  muted: "#747D8D",

  subtle: "#596477",


  // -------------------------------------------------------
  // Borders
  // -------------------------------------------------------

  border: "rgba(255,255,255,0.08)",

  borderFocus: "#665783",


  // -------------------------------------------------------
  // Feedback
  // -------------------------------------------------------

  danger: "#F87171",
};


// =========================================================
// PAGE BACKGROUND
// =========================================================

export const pageBg = {

  height: "100%",

  minHeight: "100vh",

  backgroundColor: COLORS.bgApp,

  backgroundImage: `
    linear-gradient(
      160deg,
      #150e23 0%,
      #19152a 48%,
      #1b1830 100%
    ),
    ${NOISE_BG}
  `,

  backgroundRepeat:
    "no-repeat, repeat",

  backgroundSize:
    "100% 100%, 200px 200px",

  backgroundBlendMode:
    "normal, overlay",

  fontFamily:
    "'Inter', sans-serif",

  color:
    COLORS.body,
};


// =========================================================
// CREAM INPUT
// =========================================================

export const sandyInput = {

  width: "100%",

  boxSizing: "border-box",

  padding: "9px 13px",

  borderRadius: 12,

  border:
    `1px solid ${COLORS.border}`,

  backgroundColor:
    COLORS.sandy,

  backgroundImage:
    NOISE_BG,

  backgroundRepeat:
    "repeat",

  backgroundSize:
    "200px 200px",

  backgroundBlendMode:
    "multiply",

  color:
    COLORS.sandyText,

  fontSize:
    13.5,

  fontFamily:
    "'Inter', sans-serif",

  outline:
    "none",

  transition:
    "border-color 0.14s ease, box-shadow 0.14s ease",
};


// =========================================================
// CREAM PRIMARY BUTTON
// =========================================================

export const sandyBtn = {

  display: "inline-flex",

  alignItems: "center",

  justifyContent: "center",

  padding: "10px 24px",

  borderRadius: 12,

  border: "none",

  backgroundColor:
    COLORS.sandy,

  backgroundImage:
    NOISE_BG,

  backgroundRepeat:
    "repeat",

  backgroundSize:
    "200px 200px",

  backgroundBlendMode:
    "multiply",

  color:
    COLORS.sandyText,

  fontSize:
    13.5,

  fontWeight:
    600,

  cursor:
    "pointer",

  fontFamily:
    "'Bricolage Grotesque', sans-serif",

  letterSpacing:
    "-0.01em",

  transition:
    "transform 0.14s ease, box-shadow 0.14s ease, opacity 0.14s ease",
};


// =========================================================
// GHOST / SECONDARY BUTTON
// =========================================================

export const ghostBtn = {

  display: "inline-flex",

  alignItems: "center",

  justifyContent: "center",

  padding: "10px 24px",

  borderRadius: 12,

  border:
    `1px solid ${COLORS.border}`,

  background:
    "rgba(102,87,131,0.08)",

  color:
    COLORS.body,

  fontSize:
    13.5,

  fontWeight:
    500,

  cursor:
    "pointer",

  fontFamily:
    "'Inter', sans-serif",

  transition:
    "background 0.14s ease, border-color 0.14s ease, color 0.14s ease",
};


// =========================================================
// INPUT FOCUS
// =========================================================

export function focusInput(e) {

  e.currentTarget.style.borderColor =
    COLORS.primary;

  e.currentTarget.style.boxShadow =
    "0 0 0 2px rgba(102, 87, 131, 0.20)";
}


// =========================================================
// INPUT BLUR
// =========================================================

export function blurInput(e) {

  e.currentTarget.style.borderColor =
    COLORS.border;

  e.currentTarget.style.boxShadow =
    "none";
}


// =========================================================
// WAVY DIVIDER
// =========================================================

export function WavyDivider({
  color = "rgba(255,255,255,0.10)",
  style,
}) {

  return (
    <svg
      width="100%"
      height="8"
      viewBox="0 0 400 8"
      preserveAspectRatio="none"
      fill="none"
      style={{
        display: "block",
        ...style,
      }}
    >

      <path
        d="
          M0 4
          C30 1, 70 7, 100 4
          S170 1, 200 4
          S270 7, 300 4
          S370 1, 400 4
        "

        stroke={color}

        strokeWidth="1.2"

        strokeLinecap="round"
      />

    </svg>
  );
}


// =========================================================
// FORM TOP BAR
// =========================================================

export function FormTopBar({
  formTitle,
  formId,
  activeTab,
  onNavigate,
}) {

  const tabs = [
    {
      key: "edit",
      label: "Edit",
    },

    {
      key: "preview",
      label: "Preview",
    },

    {
      key: "responses",
      label: "Responses",
    },

    {
      key: "settings",
      label: "Settings",
    },
  ];


  return (
    <header
      style={{
        height: 50,

        background:
          "#09111A",

        borderBottom:
          "1px solid rgba(255,255,255,0.07)",

        display: "flex",

        alignItems: "center",

        padding: "0 18px",

        gap: 12,

        flexShrink: 0,
      }}
    >

      {/* =================================================
          DASHBOARD BUTTON
          ================================================= */}

      <button
        onClick={() =>
          onNavigate("/dashboard")
        }

        style={{
          background: "none",

          border: "none",

          color: COLORS.muted,

          cursor: "pointer",

          padding: "4px 6px",

          borderRadius: 6,

          display: "flex",

          alignItems: "center",

          gap: 5,

          fontSize: 12,

          fontFamily:
            "'Inter', sans-serif",

          transition:
            "color 0.14s ease",
        }}

        onMouseEnter={(e) => {
          e.currentTarget.style.color =
            COLORS.body;
        }}

        onMouseLeave={(e) => {
          e.currentTarget.style.color =
            COLORS.muted;
        }}
      >

        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
        >

          <path
            d="M8.5 2.5L4 7l4.5 4.5"

            stroke="currentColor"

            strokeWidth="1.5"

            strokeLinecap="round"

            strokeLinejoin="round"
          />

        </svg>

        Dashboard

      </button>


      {/* =================================================
          DIVIDER
          ================================================= */}

      <div
        style={{
          width: 1,

          height: 18,

          background:
            "rgba(255,255,255,0.08)",
        }}
      />


      {/* =================================================
          APP NAME
          ================================================= */}

      <span
        style={{
          fontFamily:
            "'Bricolage Grotesque', sans-serif",

          fontWeight: 700,

          fontSize: 14.5,

          color: COLORS.heading,

          letterSpacing:
            "-0.02em",

          flexShrink: 0,
        }}
      >
        CCS Forms
      </span>


      {/* =================================================
          DIVIDER
          ================================================= */}

      <div
        style={{
          width: 1,

          height: 18,

          background:
            "rgba(255,255,255,0.08)",
        }}
      />


      {/* =================================================
          FORM TITLE
          ================================================= */}

      <span
        style={{
          fontSize: 13,

          color: COLORS.body,

          fontWeight: 500,

          overflow: "hidden",

          textOverflow:
            "ellipsis",

          whiteSpace:
            "nowrap",

          flex: 1,

          minWidth: 0,
        }}
      >
        {formTitle}
      </span>


      {/* =================================================
          TAB CONTAINER
          ================================================= */}

      <div
        style={{
          display: "flex",

          background:
            "rgba(102,87,131,0.07)",

          border:
            "1px solid rgba(255,255,255,0.07)",

          borderRadius: 12,

          padding: 3,

          gap: 2,

          flexShrink: 0,
        }}
      >

        {tabs.map(({ key, label }) => (

          <button
            key={key}

            onClick={() =>
              onNavigate(
                `/forms/${formId}/${key}`
              )
            }

            style={{
              padding:
                "5px 13px",

              borderRadius: 9,

              border: "none",

              background:
                activeTab === key
                  ? "rgba(102,87,131,0.32)"
                  : "transparent",

              color:
                activeTab === key
                  ? COLORS.heading
                  : COLORS.subtle,

              fontSize: 12,

              fontWeight: 500,

              cursor: "pointer",

              fontFamily:
                "'Inter', sans-serif",

              transition:
                "background 0.14s ease, color 0.14s ease",
            }}
          >

            {label}

          </button>

        ))}

      </div>

    </header>
  );
}