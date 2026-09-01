import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { COLORS, pageBg, sandyInput, sandyBtn, WavyDivider } from "../ui/shared";
import { getPublicForm } from "../api/formsApi";
import { submitResponse } from "../api/responsesApi";
import { getDraft, normalizeFormDraft } from "../store/formDraftStore";
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
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

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

  useEffect(() => {
    let cancelled = false;
    getDraftResponse(id).then((saved) => {
      if (!cancelled && saved) setAnswers(saved);
    });
    return () => { cancelled = true; };
  }, [id]);

  const normalizedForm = form ? normalizeFormDraft(form) : null;
  const sections = normalizedForm?.sections?.length
    ? normalizedForm.sections
    : [{ id: "section-1", title: "Section 1", description: "", questions: normalizedForm?.fields || [] }];
  const currentSection = sections[activeSectionIndex] || sections[0];

  const updateAnswer = useCallback((fieldId, value) => {
    setAnswers((prev) => {
      const next = { ...prev, [fieldId]: value };
      saveDraftResponse(id, next);
      return next;
    });
  }, [id]);

  const validateCurrentSection = () => {
    for (const field of currentSection.questions || []) {
      const value = answers[field.id];
      const isEmpty = value === undefined || value === null || value === "" || (Array.isArray(value) && value.length === 0);
      if (field.required && isEmpty) {
        window.alert(`Please complete "${field.label}" before continuing.`);
        return false;
      }
    }
    return true;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!normalizedForm) return;
    setSubmitting(true);
    setLoadError(null);

    const payload = normalizedForm.fields.map((field) => ({
      fieldId: field.id,
      label: field.label,
      value: answers[field.id] ?? null,
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

  if (!normalizedForm) {
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
            Thanks for filling out {normalizedForm.title}. Your answers have been recorded.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ ...pageBg }}>
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "48px 16px" }}>
        <div style={{
          background: "#18162A",
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.08)",
          borderLeft: "3px solid rgba(102,87,131,0.75)",
          padding: "26px 30px", marginBottom: 12,
        }}>
          <h1 style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 700, fontSize: 26, color: "#F0ECE0",
            margin: "0 0 8px", letterSpacing: "-0.025em",
          }}>
            {normalizedForm.title || "Untitled Form"}
          </h1>
          {normalizedForm.description && (
            <p style={{ color: COLORS.body, fontSize: 13.5, margin: 0, lineHeight: 1.65 }}>
              {normalizedForm.description}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "12px 14px" }}>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: COLORS.heading, fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              {currentSection.title || `Section ${activeSectionIndex + 1}`}
            </p>
            {currentSection.description && (
              <p style={{ margin: "6px 0 0", fontSize: 12.5, color: COLORS.muted }}>{currentSection.description}</p>
            )}
          </div>

          {(currentSection.questions || []).map((field) => {
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
                <FieldInput field={field} value={answers[field.id]} onChange={(value) => updateAnswer(field.id, value)} />
              </div>
            );
          })}

          <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
            <button
              type="button"
              style={{ ...sandyBtn, opacity: activeSectionIndex === 0 ? 0.55 : 1 }}
              onClick={() => setActiveSectionIndex((prev) => Math.max(prev - 1, 0))}
              disabled={activeSectionIndex === 0}
            >
              Back
            </button>

            {activeSectionIndex < sections.length - 1 ? (
              <button
                type="button"
                style={sandyBtn}
                onClick={() => {
                  if (validateCurrentSection()) setActiveSectionIndex((prev) => prev + 1);
                }}
              >
                Next
              </button>
            ) : (
              <button type="submit" style={sandyBtn} disabled={submitting}>
                {submitting ? "Submitting…" : "Submit"}
              </button>
            )}
          </div>

          {loadError && (
            <p style={{ color: "#FCA5A5", fontSize: 12.5, marginTop: 8 }}>{loadError}</p>
          )}
        </form>
      </div>
    </div>
  );
}