import { useNavigate } from "react-router-dom";
import { COLORS, pageBg, sandyBtn, WavyDivider } from "../ui/shared";
import ccsLogo from "../assets/ccs-logo.png";

const PLACEHOLDER_FORMS = [
  { id: "form-1", title: "Customer Satisfaction Survey", fields: 4, updated: "2 hours ago" },
  { id: "form-2", title: "Event Registration Form",      fields: 6, updated: "Yesterday"   },
  { id: "form-3", title: "Product Feedback",             fields: 3, updated: "3 days ago"  },
];

const BUBBLES = [
  { size: 16, left: "8%",  delay: 0  },
  { size: 24, left: "22%", delay: 4  },
  { size: 12, left: "45%", delay: 2  },
  { size: 20, left: "68%", delay: 6  },
  { size: 14, left: "85%", delay: 3  },
  { size: 18, left: "35%", delay: 8  },
];

function AmbientBubbles() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <style>{`
        @keyframes dashboardFloatUp {
          0%   { transform: translateY(0);      opacity: 0; }
          10%  { opacity: 0.5; }
          90%  { opacity: 0.3; }
          100% { transform: translateY(-100vh); opacity: 0; }
        }
      `}</style>
      {BUBBLES.map((b, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            bottom: -40,
            left: b.left,
            width: b.size,
            height: b.size,
            borderRadius: "50%",
            border: "1px solid #2DD4BF",
            background: "rgba(45,212,191,0.03)",
            animation: `dashboardFloatUp ${18 + b.delay}s linear ${b.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div style={{ ...pageBg, display: "flex", flexDirection: "column", position: "relative" }}>
      <AmbientBubbles />

      <header style={{
        height: 72,
        background: "rgba(11,26,36,0.92)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        display: "flex", alignItems: "center",
        padding: "0 32px", gap: 12, flexShrink: 0,
        position: "relative", zIndex: 1,
      }}>
        <button
          onClick={() => navigate("/")}
          style={{
            background: "none", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 8,
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 700, fontSize: 14.5,
            color: COLORS.heading, letterSpacing: "-0.02em",
          }}
        >
          <img src={ccsLogo} alt="CCS logo" style={{ width: 22, height: 22, objectFit: "contain" }} />
          CCS Forms
        </button>

        <div style={{ flex: 1 }} />

        <button
          onClick={() => navigate("/forms/new/edit")}
          style={{ ...sandyBtn, padding: "7px 18px", fontSize: 13 }}
        >
          New form
        </button>
      </header>

      <div style={{ flex: 1, overflowY: "auto", padding: "32px 24px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <h1 style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 700, fontSize: 40, letterSpacing: "-0.02em",
            color: COLORS.heading, margin: "0 0 4px",
          }}>
            My Forms
          </h1>
          <p style={{ fontSize: 13, color: COLORS.muted, margin: "0 0 24px" }}>
            {PLACEHOLDER_FORMS.length} forms
          </p>

          <WavyDivider color="rgba(255,255,255,0.07)" style={{ marginBottom: 24 }} />

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 14,
          }}>
            {PLACEHOLDER_FORMS.map((form) => (
              <FormCard
                key={form.id}
                form={form}
                onOpen={() => navigate(`/forms/${form.id}/edit`)}
              />
            ))}

            <button
              onClick={() => navigate("/forms/new/edit")}
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px dashed rgba(255,255,255,0.1)",
                borderRadius: 14, padding: "28px 20px",
                cursor: "pointer", display: "flex",
                flexDirection: "column", alignItems: "center",
                justifyContent: "center", gap: 10,
                color: COLORS.subtle, minHeight: 120,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `rgba(45,212,191,0.3)`;
                e.currentTarget.style.color = COLORS.teal;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                e.currentTarget.style.color = COLORS.subtle;
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 3v14M3 10h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <span style={{ fontSize: 13, fontWeight: 500, fontFamily: "'Inter', sans-serif" }}>
                New form
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormCard({ form, onOpen }) {
  return (
    <div
      onClick={onOpen}
      style={{
        background: "#112231",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 14, padding: "20px 20px 16px",
        cursor: "pointer", display: "flex",
        flexDirection: "column", gap: 10,
        minHeight: 120,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(44,74,94,0.6)";
        e.currentTarget.style.background = "#152838";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
        e.currentTarget.style.background = "#112231";
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: "rgba(44,74,94,0.35)",
          border: "1px solid rgba(44,74,94,0.4)",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="4"  width="9" height="1.5" rx="0.75" fill={COLORS.teal} />
            <rect x="1" y="8"  width="7" height="1.5" rx="0.75" fill={COLORS.teal} opacity="0.6" />
            <rect x="1" y="12" width="8" height="1.5" rx="0.75" fill={COLORS.teal} opacity="0.35" />
          </svg>
        </div>
        <span style={{
          fontSize: 10.5, color: COLORS.teal,
          border: "1px solid rgba(45,212,191,0.2)",
          borderRadius: 6, padding: "2px 7px",
          background: "rgba(45,212,191,0.06)",
          fontWeight: 600, flexShrink: 0,
        }}>
          {form.fields} fields
        </span>
      </div>

      <div style={{ flex: 1 }}>
        <p style={{
          fontFamily: "'Bricolage Grotesque', sans-serif",
          fontWeight: 600, fontSize: 14.5,
          color: COLORS.heading, margin: "0 0 4px",
          letterSpacing: "-0.015em", lineHeight: 1.3,
        }}>
          {form.title}
        </p>
        <p style={{ fontSize: 11.5, color: COLORS.subtle, margin: 0 }}>
          Updated {form.updated}
        </p>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <span style={{ fontSize: 12, color: COLORS.muted, fontWeight: 500 }}>
          Open
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ display: "inline", marginLeft: 4, verticalAlign: "middle" }}>
            <path d="M3 6h6M7 4l2 2-2 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </div>
  );
}