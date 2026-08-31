import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { COLORS, pageBg, sandyInput, sandyBtn, focusInput, blurInput, WavyDivider, FormTopBar } from "../ui/shared";

export default function FormSettingsPage() {
  const navigate = useNavigate();
  const { id = "form-1" } = useParams();

  const [title, setTitle] = useState("Customer Satisfaction Survey");
  const [description, setDescription] = useState("Share your feedback. This takes about 2 minutes.");
  const [allowAnon, setAllowAnon] = useState(true);
  const [onePerPerson, setOnePerPerson] = useState(false);

  return (
    <div style={{ ...pageBg, display: "flex", flexDirection: "column" }}>
      <FormTopBar
        formTitle={title}
        formId={id}
        activeTab="settings"
        onNavigate={navigate}
      />

      <div style={{ flex: 1, overflowY: "auto", padding: "32px 24px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h1 style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 700, fontSize: 20, letterSpacing: "-0.02em",
            color: COLORS.heading, margin: "0 0 4px",
          }}>
            Form Settings
          </h1>
          <p style={{ fontSize: 13, color: COLORS.muted, margin: "0 0 24px" }}>
            Configure how this form behaves and appears.
          </p>

          <WavyDivider color="rgba(255,255,255,0.07)" style={{ marginBottom: 24 }} />

          <div style={{
            background: "#18162A",
            borderRadius: 14,
            border: "1px solid rgba(255,255,255,0.07)",
            overflow: "hidden",
          }}>
            <Section label="General">
              <SettingRow label="Form title" hint="Shown at the top of the form">
                <input
                  style={sandyInput}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onFocus={focusInput} onBlur={blurInput}
                />
              </SettingRow>
              <SettingRow label="Description" hint="Optional subtitle for respondents" last>
                <textarea
                  style={{ ...sandyInput, resize: "vertical", lineHeight: 1.55 }}
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  onFocus={focusInput} onBlur={blurInput}
                />
              </SettingRow>
            </Section>

            <WavyDivider color="rgba(255,255,255,0.06)" />

            <Section label="Responses">
              <SettingRow
                label="Allow anonymous responses"
                hint="Respondents do not need to be signed in"
              >
                <Toggle value={allowAnon} onChange={setAllowAnon} />
              </SettingRow>
              <SettingRow
                label="One response per person"
                hint="Limit each signed-in user to one submission"
                last
              >
                <Toggle value={onePerPerson} onChange={setOnePerPerson} />
              </SettingRow>
            </Section>
          </div>

          <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
            <button style={{ ...sandyBtn, padding: "10px 22px" }}>Save settings</button>
            <button
              onClick={() => navigate(`/forms/${id}/edit`)}
              style={{
                padding: "10px 22px", borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.04)",
                color: COLORS.body, fontSize: 13.5, fontWeight: 500,
                cursor: "pointer", fontFamily: "'Inter', sans-serif",
              }}
            >
              Back to editor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ label, children }) {
  return (
    <div>
      <p style={{
        fontSize: 9.5, fontWeight: 700, letterSpacing: "0.1em",
        textTransform: "uppercase", color: COLORS.subtle,
        padding: "14px 20px 6px", margin: 0,
      }}>
        {label}
      </p>
      {children}
    </div>
  );
}

function SettingRow({ label, hint, children, last }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      gap: 16, padding: "14px 20px",
      borderBottom: last ? "none" : "1px solid rgba(255,255,255,0.05)",
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13.5, fontWeight: 500, color: COLORS.heading, margin: 0 }}>{label}</p>
        {hint && <p style={{ fontSize: 12, color: COLORS.muted, margin: "2px 0 0" }}>{hint}</p>}
      </div>
      <div style={{ flexShrink: 0, minWidth: 180 }}>{children}</div>
    </div>
  );
}

function Toggle({ value, onChange }) {
  return (
    <div
      onClick={() => onChange(!value)}
      style={{
        width: 36, height: 20, borderRadius: 10,
        background: value ? COLORS.primary : "rgba(255,255,255,0.09)",
        border: "1px solid rgba(255,255,255,0.1)",
        position: "relative", cursor: "pointer",
        transition: "background 0.2s",
      }}
    >
      <div style={{
        width: 14, height: 14, borderRadius: "50%",
        background: value ? COLORS.bgApp : "rgba(255,255,255,0.5)",
        position: "absolute", top: 2,
        left: value ? 18 : 2,
        transition: "left 0.15s",
      }} />
    </div>
  );
}