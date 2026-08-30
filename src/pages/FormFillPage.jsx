import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { COLORS, pageBg, sandyInput, sandyBtn, WavyDivider } from "../ui/shared";
import { getPublicForm } from "../api/formsApi";
import { submitResponse } from "../api/responsesApi";
import { getDraft } from "../store/formDraftStore";
import { saveDraftResponse, getDraftResponse, clearDraftResponse } from "../storage/draftResponses";

function FieldInput({ field, value, onChange }) {
  if (field.type === "divider") {
    return <WavyDivider color="rgba(255,255,255,0.13)" />;
  }
  if (field.type === "short_text" || field.type === "email" || field.type === "number") {
    return (
      <input
        type={field.type === "email" ? "email" : field.type === "number" ? "number" : "text"}
        placeholder={field.placeholder || "Your answer"}
        required={field.required}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        style={sandyInput}
      />
    );
  }
  if (field.type === "long_text") {
    return (
      <textarea
        placeholder={field.placeholder || "Your answer"}
        rows={3}
        required={field.required}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        style={{ ...sandyInput, resize: "vertical", lineHeight: 1.55 }}
      />
    );
  }
  if (field.type === "date") {
    return (
      <input
        type="date"
        required={field.required}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        style={{ ...sandyInput, colorScheme: "light" }}
      />
    );
  }
  if (field.type === "rating") {
    const max = field.maxRating ?? 5;
    return (
      <div style={{ display: "flex", gap: 4 }}>
        {Array.from({ length: max }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onChange(i + 1)}
            style={{
              fontSize: 22,
              color: i < (value ?? 0) ? COLORS.teal : "rgba(255,255,255,0.15)",
              background: "none", border: "none",
              cursor: "pointer", padding: 0, lineHeight: 1,
            }}
          >
            *
          </button>
        ))}
      </div>
    );
  }
  if (field.type === "dropdown") {
    return (
      <select
        required={field.required}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        style={{ ...sandyInput, cursor: "pointer" }}
      >
        <option value="">Select an option</option>
        {field.options?.map((o) => (
          <option key={o.id} value={o.id}>{o.label}</option>
        ))}
      </select>
    );
  }
  if (field.type === "multiple_choice") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {field.options?.map((o) => (
          <label key={o.id} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontSize: 13.5, color: COLORS.body }}>
            <input
              type="radio"
              name={field.id}
              required={field.required}
              checked={value === o.id}
              onChange={() => onChange(o.id)}
              style={{ accentColor: COLORS.teal, width: 15, height: 15, flexShrink: 0 }}
            />
            {o.label}
          </label>
        ))}
      </div>
    );
  }
  if (field.type === "checkbox") {
    const selected = Array.isArray(value) ? value : [];
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {field.options?.map((o) => (
          <label key={o.id} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontSize: 13.5, color: COLORS.body }}>
            <input
              type="checkbox"
              checked={selected.includes(o.id)}
              onChange={(e) => {
                if (e.target.checked) onChange([...selected, o.id]);
                else onChange(selected.filter((id) => id !== o.id));
              }}
              style={{ accentColor: COLORS.teal, width: 15, height: 15, flexShrink: 0 }}
            />
            {o.label}
          </label>
        ))}
      </div>
    );
  }
  return null;
}

export default function FormFillPage() {
  const { id } = useParams();

  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loadError, setLoadError] = useState(null);

  // Load the form: try the real backend first, fall back to the local draft.
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await getPublicForm(id);
        if (!cancelled) setForm(data);
      } catch {
        const draft = getDraft(id);
        if (!cancelled) setForm(draft);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [id]);

  // Restore any saved draft answers for this form from IndexedDB.
  useEffect(() => {
    let cancelled = false;
    getDraftResponse(id).then((saved) => {
      if (!cancelled && saved) setAnswers(saved);
    });
    return () => { cancelled = true; };
  }, [id]);

  const updateAnswer = useCallback((fieldId, value) => {
    setAnswers((prev) => {
      const next = { ...prev, [fieldId]: value };
      saveDraftResponse(id, next);
      return next;
    });
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form) return;
    setSubmitting(true);
    setLoadError(null);

    const payload = form.fields.map((f) => ({
      fieldId: f.id,
      label: f.label,
      value: answers[f.id] ?? null,
    }));

    try {
      await submitResponse(id, { answers: payload });
      await clearDraftResponse(id);
      setSubmitted(true);
    } catch (err) {
      setLoadError(err.message || "Something went wrong submitting your response.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!form) {
    return (
      <div style={{ ...pageBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: COLORS.muted, fontSize: 14 }}>Loading form…</p>
      </div>
    );
  }

  if (submitted) {
    return (
      <div style={{ ...pageBg, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ textAlign: "center", maxWidth: 380 }}>
          <p style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 700, fontSize: 22, color: COLORS.heading, margin: "0 0 8px",
          }}>
            Response received
          </p>
          <p style={{ fontSize: 14, color: COLORS.muted, margin: 0 }}>
            Thanks for filling out {form.title}. Your answers have been recorded.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ ...pageBg }}>
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "48px 16px" }}>
        <div style={{
          background: "#112231",
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.08)",
          borderLeft: "3px solid #2C4A5E",
          padding: "26px 30px", marginBottom: 12,
        }}>
          <h1 style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 700, fontSize: 26, color: "#F0ECE0",
            margin: "0 0 8px", letterSpacing: "-0.025em",
          }}>
            {form.title || "Untitled Form"}
          </h1>
          {form.description && (
            <p style={{ color: COLORS.body, fontSize: 13.5, margin: 0, lineHeight: 1.65 }}>
              {form.description}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {form.fields.map((field) => {
            if (field.type === "divider") {
              return <WavyDivider key={field.id} color="rgba(255,255,255,0.11)" style={{ margin: "4px 0" }} />;
            }
            return (
              <div key={field.id} style={{
                background: "#112231", borderRadius: 14,
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
                <FieldInput
                  field={field}
                  value={answers[field.id]}
                  onChange={(v) => updateAnswer(field.id, v)}
                />
              </div>
            );
          })}

          {loadError && (
            <p style={{ color: "#F87171", fontSize: 13, margin: "4px 0" }}>{loadError}</p>
          )}

          <div style={{ marginTop: 8 }}>
            <button type="submit" disabled={submitting} style={{ ...sandyBtn, opacity: submitting ? 0.6 : 1 }}>
              {submitting ? "Submitting…" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}