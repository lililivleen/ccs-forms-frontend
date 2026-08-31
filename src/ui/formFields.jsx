import { useState } from "react";
import { sandyInput, WavyDivider, COLORS } from "./shared";

export const FIELD_TYPES = [
  { type: "short_text",      label: "Short Text",      glyph: "T",  group: "Text"   },
  { type: "long_text",       label: "Long Text",        glyph: "Tt", group: "Text"   },
  { type: "email",           label: "Email",            glyph: "@",  group: "Text"   },
  { type: "number",          label: "Number",           glyph: "#",  group: "Text"   },
  { type: "multiple_choice", label: "Multiple Choice",  glyph: "O",  group: "Choice" },
  { type: "checkbox",        label: "Checkboxes",       glyph: "[]", group: "Choice" },
  { type: "dropdown",        label: "Dropdown",         glyph: "v",  group: "Choice" },
  { type: "rating",          label: "Rating",           glyph: "*",  group: "Scale"  },
  { type: "date",            label: "Date",             glyph: "D",  group: "Date"   },
  { type: "divider",         label: "Divider",          glyph: "--", group: "Layout" },
];

export function genId() {
  return Math.random().toString(36).slice(2, 9);
}

export function defaultField(type) {
  const base = {
    id: genId(),
    type,
    label: FIELD_TYPES.find((f) => f.type === type)?.label ?? "Field",
    required: false,
    placeholder: "",
    helpText: "",
  };
  if (type === "multiple_choice" || type === "checkbox" || type === "dropdown") {
    base.options = [{ id: genId(), label: "Option 1" }, { id: genId(), label: "Option 2" }];
  }
  if (type === "rating") base.maxRating = 5;
  return base;
}

/* ---------------- Icons ---------------- */

export function IconPlus() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
      <path d="M5.5 1v9M1 5.5h9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
export function IconTrash() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M1.5 3h10M4.5 3V2a.5.5 0 01.5-.5h3a.5.5 0 01.5.5v1M11 3l-.8 7.8a.5.5 0 01-.5.45H3.3a.5.5 0 01-.5-.45L2 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
export function IconDrag() {
  return (
    <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
      <circle cx="2" cy="2.5" r="1.2" fill="currentColor" />
      <circle cx="6" cy="2.5" r="1.2" fill="currentColor" />
      <circle cx="2" cy="7" r="1.2" fill="currentColor" />
      <circle cx="6" cy="7" r="1.2" fill="currentColor" />
      <circle cx="2" cy="11.5" r="1.2" fill="currentColor" />
      <circle cx="6" cy="11.5" r="1.2" fill="currentColor" />
    </svg>
  );
}
export function IconDuplicate() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <rect x="1" y="4" width="7.5" height="8" rx="2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M4 4V2.5A1.5 1.5 0 015.5 1H11a1.5 1.5 0 011.5 1.5V8A1.5 1.5 0 0111 9.5H8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
export function IconEye() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path d="M1 7.5s2.5-5 6.5-5 6.5 5 6.5 5-2.5 5-6.5 5-6.5-5-6.5-5z" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="7.5" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}
export function IconEdit() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M9 2l2 2-7 7-2.5.5.5-2.5L9 2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}
export function IconChevronDown() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
      <path d="M2 3.5l3.5 4 3.5-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
export function IconList() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M1.5 3.5h10M1.5 6.5h10M1.5 9.5h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
export function IconGear() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <circle cx="6.5" cy="6.5" r="2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M6.5 1v1.5M6.5 10.5V12M1 6.5h1.5M10.5 6.5H12M2.6 2.6l1.1 1.1M9.3 9.3l1.1 1.1M2.6 10.4l1.1-1.1M9.3 3.7l1.1-1.1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
export function IconBack() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M8.5 2.5L4 7l4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ---------------- Field Palette (sidebar) ---------------- */

export function FieldPalette({ onAdd }) {
  const groups = Array.from(new Set(FIELD_TYPES.map((f) => f.group)));
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "20px 16px 14px" }}>
        <p style={{
          fontFamily: "'Bricolage Grotesque', sans-serif",
          fontWeight: 700, fontSize: 16,
          color: COLORS.heading,
          letterSpacing: "-0.02em", margin: 0,
        }}>
          CCS Forms
        </p>
        <p style={{ fontSize: 10.5, color: COLORS.muted, margin: "3px 0 0" }}>
          Click to add fields
        </p>
      </div>

      <WavyDivider color="rgba(255,255,255,0.08)" style={{ margin: "0 12px 12px" }} />

      <div style={{ flex: 1, overflowY: "auto", padding: "0 8px 16px" }}>
        {groups.map((group) => (
          <div key={group} style={{ marginBottom: 16 }}>
            <p style={{
              fontSize: 9.5, fontWeight: 700, letterSpacing: "0.1em",
              textTransform: "uppercase", color: COLORS.subtle,
              padding: "0 8px", marginBottom: 4,
            }}>
              {group}
            </p>
            {FIELD_TYPES.filter((f) => f.group === group).map((ft) => (
              <button
                key={ft.type}
                onClick={() => onAdd(ft.type)}
                style={{
                  display: "flex", alignItems: "center", gap: 9, width: "100%",
                  padding: "7px 10px", borderRadius: 10,
                  border: "1px solid transparent",
                  background: "transparent", cursor: "pointer",
                  color: COLORS.body, textAlign: "left", marginBottom: 1,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "transparent";
                }}
              >
                <span style={{
                  width: 26, height: 26, borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 10, fontWeight: 700, color: COLORS.muted,
                  fontFamily: "monospace", flexShrink: 0,
                  background: "rgba(255,255,255,0.04)",
                }}>
                  {ft.glyph}
                </span>
                <span style={{ fontSize: 13, fontWeight: 500 }}>{ft.label}</span>
                <span style={{ marginLeft: "auto", color: COLORS.teal, opacity: 0.5 }}>
                  <IconPlus />
                </span>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Star Rating ---------------- */

export function StarRating({ max }) {
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {Array.from({ length: max }).map((_, i) => (
        <button
          key={i}
          onMouseEnter={() => setHovered(i + 1)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => setSelected(i + 1)}
          style={{
            fontSize: 22,
            color: i < (hovered || selected) ? COLORS.teal : "rgba(255,255,255,0.15)",
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

/* ---------------- Field Preview Content ---------------- */

export function FieldPreviewContent({ field }) {
  if (field.type === "divider") {
    return <WavyDivider color="rgba(255,255,255,0.13)" />;
  }
  if (field.type === "short_text" || field.type === "email" || field.type === "number") {
    return (
      <input
        type={field.type === "email" ? "email" : field.type === "number" ? "number" : "text"}
        placeholder={field.placeholder || "Your answer"}
        style={sandyInput}
      />
    );
  }
  if (field.type === "long_text") {
    return (
      <textarea
        placeholder={field.placeholder || "Your answer"}
        rows={3}
        style={{ ...sandyInput, resize: "vertical", lineHeight: 1.55 }}
      />
    );
  }
  if (field.type === "date") {
    return <input type="date" style={{ ...sandyInput, colorScheme: "light" }} />;
  }
  if (field.type === "rating") {
    return <StarRating max={field.maxRating ?? 5} />;
  }
  if (field.type === "dropdown") {
    return (
      <div style={{ position: "relative" }}>
        <select style={{ ...sandyInput, appearance: "none", paddingRight: 32, cursor: "pointer" }}>
          <option value="" style={{ background: "#E8DCC4", color: "#8B7D5F" }}>Select an option</option>
          {field.options?.map((o) => (
            <option key={o.id} value={o.id} style={{ background: "#E8DCC4", color: "#2A2118" }}>{o.label}</option>
          ))}
        </select>
        <span style={{
          position: "absolute", right: 11, top: "50%",
          transform: "translateY(-50%)", pointerEvents: "none",
          color: "#8B7D5F",
        }}>
          <IconChevronDown />
        </span>
      </div>
    );
  }
  if (field.type === "multiple_choice") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {field.options?.map((o) => (
          <label key={o.id} style={{
            display: "flex", alignItems: "center", gap: 10,
            cursor: "pointer", fontSize: 13.5, color: COLORS.body,
          }}>
            <input type="radio" name={field.id}
              style={{ accentColor: COLORS.teal, width: 15, height: 15, flexShrink: 0 }} />
            {o.label}
          </label>
        ))}
      </div>
    );
  }
  if (field.type === "checkbox") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {field.options?.map((o) => (
          <label key={o.id} style={{
            display: "flex", alignItems: "center", gap: 10,
            cursor: "pointer", fontSize: 13.5, color: COLORS.body,
          }}>
            <input type="checkbox"
              style={{ accentColor: COLORS.teal, width: 15, height: 15, flexShrink: 0 }} />
            {o.label}
          </label>
        ))}
      </div>
    );
  }
  return null;
}

/* ---------------- Field Card (Editor view) ---------------- */

export function FieldCard({
  field, isSelected, isDragging, index, total,
  onSelect, onDelete, onDuplicate, onMoveUp, onMoveDown,
  onDragStart, onDragEnd, onDragOver, onDrop,
}) {
  const isDivider = field.type === "divider";
  return (
    <div
      draggable={!isDivider}
      onClick={onSelect}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDrop={onDrop}
      style={{
        background: isSelected ? "#152838" : "#112231",
        borderRadius: 14,
        border: isSelected ? "1.5px solid #2C4A5E" : "1px solid rgba(255,255,255,0.07)",
        padding: isDivider ? "14px 22px" : "20px 24px",
        cursor: isDragging ? "grabbing" : "pointer",
        position: "relative",
        opacity: isDragging ? 0.65 : 1,
        boxShadow: isDragging ? "0 8px 18px rgba(0,0,0,0.18)" : "none",
        userSelect: "none",
      }}
    >
      <div style={{
        position: "absolute", left: 8, top: "50%",
        transform: "translateY(-50%)",
        color: isSelected ? "rgba(44,74,94,0.7)" : "rgba(255,255,255,0.12)",
        cursor: "grab",
      }}>
        <IconDrag />
      </div>

      {!isDivider && (
        <div style={{
          position: "absolute", top: 14, right: 14,
          fontSize: 10, fontWeight: 600,
          color: isSelected ? COLORS.teal : COLORS.subtle,
          background: isSelected ? "rgba(45,212,191,0.1)" : "rgba(255,255,255,0.05)",
          borderRadius: 6, padding: "2px 7px",
          border: isSelected ? "1px solid rgba(45,212,191,0.2)" : "none",
        }}>
          {index + 1}
        </div>
      )}

      {!isDivider && (
        <div style={{ marginBottom: 12, paddingLeft: 14 }}>
          <p style={{
            fontSize: 14.5, fontWeight: 600,
            color: "#F0ECE0",
            margin: 0,
            fontFamily: "'Bricolage Grotesque', sans-serif",
            letterSpacing: "-0.01em",
          }}>
            {field.label}
            {field.required && <span style={{ color: "#F87171", marginLeft: 4 }}>*</span>}
          </p>
          {field.helpText && (
            <p style={{ fontSize: 12, color: COLORS.muted, margin: "4px 0 0", lineHeight: 1.4 }}>
              {field.helpText}
            </p>
          )}
        </div>
      )}

      <div style={{ paddingLeft: isDivider ? 0 : 14 }}>
        <FieldPreviewContent field={field} />
      </div>

      {isSelected && (
        <div
          style={{
            display: "flex", gap: 5, marginTop: isDivider ? 10 : 14,
            paddingTop: isDivider ? 0 : 12,
            borderTop: isDivider ? "none" : "1px solid rgba(255,255,255,0.06)",
            paddingLeft: 14,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <CardBtn onClick={onMoveUp} disabled={index === 0}>Up</CardBtn>
          <CardBtn onClick={onMoveDown} disabled={index === total - 1}>Down</CardBtn>
          <div style={{ flex: 1 }} />
          <CardBtn onClick={onDuplicate}><IconDuplicate /></CardBtn>
          <CardBtn onClick={onDelete} danger><IconTrash /></CardBtn>
        </div>
      )}
    </div>
  );
}

function CardBtn({ children, onClick, disabled, danger }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "5px 12px", borderRadius: 8,
        border: "1px solid rgba(255,255,255,0.09)",
        background: "rgba(255,255,255,0.04)",
        color: disabled ? "rgba(255,255,255,0.15)" : danger ? "#F87171" : COLORS.body,
        cursor: disabled ? "not-allowed" : "pointer",
        fontSize: 12, fontWeight: 500,
      }}
    >
      {children}
    </button>
  );
}

/* ---------------- Properties Panel ---------------- */

const sectionLabel = {
  fontSize: 9.5, fontWeight: 700, letterSpacing: "0.1em",
  textTransform: "uppercase", color: COLORS.subtle, marginBottom: 9,
};

function PropRow({ label, children }) {
  return (
    <div style={{ marginBottom: 13 }}>
      <label style={{
        display: "block", fontSize: 11.5, fontWeight: 500,
        color: COLORS.muted, marginBottom: 5,
      }}>
        {label}
      </label>
      {children}
    </div>
  );
}

export function PropertiesPanel({ field, onChange }) {
  const ft = FIELD_TYPES.find((f) => f.type === field.type);

  return (
    <div style={{ padding: "20px 16px", display: "flex", flexDirection: "column", gap: 22 }}>
      <div>
        <p style={sectionLabel}>Properties</p>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 7,
          padding: "5px 12px", borderRadius: 10,
          background: "rgba(44,74,94,0.35)",
          border: "1px solid rgba(44,74,94,0.5)",
          fontSize: 12, fontWeight: 600, color: "#A8BAC4",
          marginBottom: 16,
        }}>
          <span style={{ fontFamily: "monospace", fontSize: 10, color: COLORS.teal }}>{ft?.glyph}</span>
          {ft?.label}
        </div>

        {field.type !== "divider" && (
          <>
            <PropRow label="Question">
              <input style={sandyInput} value={field.label}
                onChange={(e) => onChange({ label: e.target.value })} />
            </PropRow>

            {(field.type === "short_text" || field.type === "long_text" ||
              field.type === "email" || field.type === "number") && (
              <PropRow label="Placeholder">
                <input style={sandyInput} value={field.placeholder ?? ""}
                  onChange={(e) => onChange({ placeholder: e.target.value })} />
              </PropRow>
            )}

            <PropRow label="Help text">
              <input style={sandyInput} value={field.helpText ?? ""}
                placeholder="Optional"
                onChange={(e) => onChange({ helpText: e.target.value })} />
            </PropRow>

            <PropRow label="Required">
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <div
                  onClick={() => onChange({ required: !field.required })}
                  style={{
                    width: 36, height: 20, borderRadius: 10,
                    background: field.required ? COLORS.teal : "rgba(255,255,255,0.09)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    position: "relative", cursor: "pointer",
                  }}
                >
                  <div style={{
                    width: 14, height: 14, borderRadius: "50%",
                    background: field.required ? "#0B1A24" : "rgba(255,255,255,0.5)",
                    position: "absolute", top: 2,
                    left: field.required ? 18 : 2,
                    transition: "left 0.15s",
                  }} />
                </div>
                <span style={{ fontSize: 12.5, color: COLORS.muted }}>
                  {field.required ? "Yes" : "No"}
                </span>
              </div>
            </PropRow>
          </>
        )}

        {field.type === "rating" && (
          <PropRow label="Max stars">
            <div style={{ display: "flex", gap: 6 }}>
              {[3, 5, 7, 10].map((n) => (
                <button key={n} onClick={() => onChange({ maxRating: n })} style={{
                  padding: "5px 11px", borderRadius: 9,
                  border: "1px solid",
                  borderColor: field.maxRating === n ? COLORS.teal : "rgba(255,255,255,0.1)",
                  background: field.maxRating === n ? "rgba(45,212,191,0.12)" : "rgba(255,255,255,0.04)",
                  color: field.maxRating === n ? COLORS.teal : COLORS.body,
                  fontSize: 12.5, fontWeight: 600, cursor: "pointer",
                }}>
                  {n}
                </button>
              ))}
            </div>
          </PropRow>
        )}
      </div>

      {(field.type === "multiple_choice" || field.type === "checkbox" || field.type === "dropdown") && (
        <div>
          <p style={sectionLabel}>Options</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {field.options?.map((opt) => (
              <div key={opt.id} style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <input
                  style={{ ...sandyInput, flex: 1 }}
                  value={opt.label}
                  onChange={(e) =>
                    onChange({ options: field.options.map((o) =>
                      o.id === opt.id ? { ...o, label: e.target.value } : o) })}
                />
                <button
                  onClick={() => onChange({ options: field.options.filter((o) => o.id !== opt.id) })}
                  disabled={(field.options?.length ?? 0) <= 1}
                  style={{
                    padding: 8, borderRadius: 10,
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.04)",
                    color: (field.options?.length ?? 0) <= 1 ? "rgba(255,255,255,0.15)" : "#F87171",
                    cursor: (field.options?.length ?? 0) <= 1 ? "not-allowed" : "pointer",
                    display: "flex", alignItems: "center", flexShrink: 0,
                  }}
                >
                  <IconTrash />
                </button>
              </div>
            ))}
            <button
              onClick={() => onChange({ options: [
                ...(field.options ?? []),
                { id: genId(), label: `Option ${(field.options?.length ?? 0) + 1}` },
              ]})}
              style={{
                display: "flex", alignItems: "center", gap: 7,
                padding: "7px 12px", borderRadius: 10,
                border: "1px dashed rgba(255,255,255,0.12)",
                background: "transparent",
                color: COLORS.muted,
                fontSize: 12.5, fontWeight: 500, cursor: "pointer",
                marginTop: 2,
              }}
            >
              <IconPlus /> Add option
            </button>
          </div>
        </div>
      )}
    </div>
  );
}