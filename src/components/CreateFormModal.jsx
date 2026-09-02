import { useState } from "react";
import { COLORS, sandyInput, sandyBtn, ghostBtn } from "../ui/shared";

export default function CreateFormModal({ open, onClose, onCreate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  if (!open) return null;

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    onCreate(title.trim(), description.trim());
    setTitle("");
    setDescription("");
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.55)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24, zIndex: 50,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: 440,
          background: "#11131B",
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.07)",
          borderLeft: "3px solid rgba(102,87,131,0.6)",
          boxShadow: "0 10px 18px rgba(9,9,15,0.24), inset 0 1px 0 rgba(255,255,255,0.04)",
          padding: "28px 28px 24px",
        }}
      >
        <h2 style={{
          fontFamily: "'Bricolage Grotesque', sans-serif",
          fontWeight: 700, fontSize: 20,
          color: COLORS.heading, margin: "0 0 4px",
          letterSpacing: "-0.02em",
        }}>
          Create a new form
        </h2>
        <p style={{ fontSize: 13, color: COLORS.muted, margin: "0 0 22px" }}>
          Give your form a title and description to get started.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 14 }}>
            <label style={{
              display: "block", fontSize: 11.5, fontWeight: 500,
              color: COLORS.muted, marginBottom: 5,
            }}>
              Title
            </label>
            <input
              autoFocus
              style={sandyInput}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Customer Satisfaction Survey"
              required
            />
          </div>

          <div style={{ marginBottom: 22 }}>
            <label style={{
              display: "block", fontSize: 11.5, fontWeight: 500,
              color: COLORS.muted, marginBottom: 5,
            }}>
              Description
            </label>
            <textarea
              style={{ ...sandyInput, resize: "vertical", lineHeight: 1.55 }}
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional"
            />
          </div>

          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button type="button" onClick={onClose} style={ghostBtn}>
              Cancel
            </button>
            <button type="submit" style={sandyBtn}>
              Create form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}