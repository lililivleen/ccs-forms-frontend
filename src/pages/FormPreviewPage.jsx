import { useNavigate, useParams } from "react-router-dom";
import { pageBg, FormTopBar, sandyBtn, WavyDivider, COLORS } from "../ui/shared";
import { FieldPreviewContent } from "../ui/formFields";
import { getDraft } from "../store/formDraftStore";

export default function FormPreviewPage() {
  const navigate = useNavigate();
  const { id = "new" } = useParams();

  const draft = getDraft(id);
  const { title, description, fields } = draft;

  return (
    <div style={{ ...pageBg, display: "flex", flexDirection: "column" }}>
      <FormTopBar
        formTitle={title}
        formId={id}
        activeTab="preview"
        onNavigate={navigate}
      />

      <div style={{ flex: 1, overflowY: "auto" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "36px 16px" }}>
          <div style={{ position: "relative" }}>
            <div style={{
              position: "absolute",
              top: -30, left: "10%", right: "10%", height: 80,
              background: "radial-gradient(ellipse at center, rgba(102,87,131,0.22) 0%, transparent 70%)",
              pointerEvents: "none",
            }} />
            <div style={{
              background: "#18162A",
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.08)",
              borderLeft: "3px solid rgba(102,87,131,0.75)",
              padding: "26px 30px", marginBottom: 12, position: "relative",
            }}>
              <h1 style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 700, fontSize: 26,
                color: "#F0ECE0", margin: "0 0 8px",
                letterSpacing: "-0.025em",
              }}>
                {title || "Untitled Form"}
              </h1>
              {description && (
                <p style={{ color: COLORS.body, fontSize: 13.5, margin: 0, lineHeight: 1.65 }}>
                  {description}
                </p>
              )}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {fields.map((field) => {
              if (field.type === "divider") {
                return <WavyDivider key={field.id} color="rgba(255,255,255,0.11)" style={{ margin: "4px 0" }} />;
              }
              return (
                <div key={field.id} style={{
                  background: "#18162A", borderRadius: 14,
                  border: "1px solid rgba(255,255,255,0.07)",
                  padding: "20px 24px",
                }}>
                  <p style={{
                    fontSize: 14.5, fontWeight: 600, color: "#F0ECE0",
                    margin: "0 0 10px",
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    letterSpacing: "-0.01em",
                  }}>
                    {field.label}
                    {field.required && <span style={{ color: "#F87171", marginLeft: 4 }}>*</span>}
                  </p>
                  {field.helpText && (
                    <p style={{ fontSize: 12.5, color: COLORS.muted, margin: "-5px 0 10px", lineHeight: 1.4 }}>
                      {field.helpText}
                    </p>
                  )}
                  <FieldPreviewContent field={field} />
                </div>
              );
            })}
          </div>

          {fields.length > 0 && (
            <div style={{ marginTop: 18 }}>
              <button style={sandyBtn}>Submit</button>
            </div>
          )}

          {fields.length === 0 && (
            <div style={{
              background: "#18162A", borderRadius: 14,
              border: "1px dashed rgba(255,255,255,0.08)",
              padding: "44px 24px", textAlign: "center",
            }}>
              <p style={{ color: COLORS.muted, fontSize: 14, margin: 0 }}>
                No fields added yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}