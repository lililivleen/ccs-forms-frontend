import { useNavigate, useParams } from "react-router-dom";
import { COLORS, pageBg, WavyDivider, FormTopBar } from "../ui/shared";

const PLACEHOLDER_RESPONSES = [
  { id: "r1", name: "Alex Rivera",   email: "alex@example.com",    submitted: "Today, 10:42 AM"   },
  { id: "r2", name: "Jordan Lee",    email: "jordan@example.com",  submitted: "Today, 9:15 AM"    },
  { id: "r3", name: "Morgan Chen",   email: "morgan@example.com",  submitted: "Yesterday, 4:30 PM" },
];

export default function FormResponsesPage() {
  const navigate = useNavigate();
  const { id = "form-1" } = useParams();

  return (
    <div style={{ ...pageBg, display: "flex", flexDirection: "column" }}>
      <FormTopBar
        formTitle="Customer Satisfaction Survey"
        formId={id}
        activeTab="responses"
        onNavigate={navigate}
      />
      <div style={{ flex: 1, overflowY: "auto", padding: "32px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 4 }}>
            <h1 style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 700, fontSize: 20, letterSpacing: "-0.02em",
              color: COLORS.heading, margin: 0,
            }}>
              Responses
            </h1>
            <span style={{
              fontSize: 11, color: COLORS.teal,
              border: "1px solid rgba(102,87,131,0.35)",
              borderRadius: 6, padding: "2px 8px",
              background: "rgba(102,87,131,0.10)",
              fontWeight: 600,
            }}>
              {PLACEHOLDER_RESPONSES.length} total
            </span>
          </div>
          <p style={{ fontSize: 13, color: COLORS.muted, margin: "0 0 24px" }}>
            Submissions received for this form.
          </p>
          <WavyDivider color="rgba(255,255,255,0.07)" style={{ marginBottom: 24 }} />

          <div style={{
            background: "#18162A",
            borderRadius: 14,
            border: "1px solid rgba(255,255,255,0.07)",
            overflow: "hidden",
          }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              padding: "11px 20px",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}>
              {["Name", "Email", "Submitted"].map((h) => (
                <span key={h} style={{
                  fontSize: 10.5, fontWeight: 700,
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  color: COLORS.subtle,
                }}>
                  {h}
                </span>
              ))}
            </div>
            {PLACEHOLDER_RESPONSES.map((r, i) => (
              <div
                key={r.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  padding: "14px 20px",
                  borderBottom: i < PLACEHOLDER_RESPONSES.length - 1
                    ? "1px solid rgba(255,255,255,0.05)"
                    : "none",
                }}
              >
                <span style={{ fontSize: 13.5, color: COLORS.heading, fontWeight: 500 }}>{r.name}</span>
                <span style={{ fontSize: 13, color: COLORS.body }}>{r.email}</span>
                <span style={{ fontSize: 12.5, color: COLORS.muted }}>{r.submitted}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}