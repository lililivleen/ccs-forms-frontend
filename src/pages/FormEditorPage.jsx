import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { pageBg, FormTopBar, COLORS } from "../ui/shared";
import {
  FieldPalette,
  FieldCard,
  PropertiesPanel,
  defaultField,
} from "../ui/formFields.jsx";
import { getDraft, setDraft } from "../store/formDraftStore";

export default function FormEditorPage() {
  const navigate = useNavigate();
  const { id = "new" } = useParams();

  const draft = getDraft(id);

  const [fields, setFields] = useState(draft.fields || []);
  const [selectedId, setSelectedId] = useState(
    draft.fields?.[0]?.id ?? null
  );
  const [draggedFieldId, setDraggedFieldId] = useState(null);
  const [formTitle, setFormTitle] = useState(draft.title || "");
  const [formDescription, setFormDescription] = useState(
    draft.description || ""
  );

  // Save the latest form data to the shared draft store.
  useEffect(() => {
    setDraft(id, {
      title: formTitle,
      description: formDescription,
      fields,
    });
  }, [id, formTitle, formDescription, fields]);

  const selectedField =
    fields.find((field) => field.id === selectedId) ?? null;

  // Add a new field after the currently selected field.
  const addField = useCallback(
    (type) => {
      const newField = defaultField(type);

      setFields((prevFields) => {
        const selectedIndex = prevFields.findIndex(
          (field) => field.id === selectedId
        );

        const insertAt =
          selectedIndex >= 0
            ? selectedIndex + 1
            : prevFields.length;

        const nextFields = [...prevFields];

        nextFields.splice(insertAt, 0, newField);

        return nextFields;
      });

      setSelectedId(newField.id);
    },
    [selectedId]
  );

  // Update a field.
  const updateField = useCallback((fieldId, updates) => {
    setFields((prevFields) =>
      prevFields.map((field) =>
        field.id === fieldId
          ? { ...field, ...updates }
          : field
      )
    );
  }, []);

  // Delete a field.
  const deleteField = useCallback(
    (fieldId) => {
      setFields((prevFields) => {
        const nextFields = prevFields.filter(
          (field) => field.id !== fieldId
        );

        return nextFields;
      });

      if (selectedId === fieldId) {
        const currentIndex = fields.findIndex(
          (field) => field.id === fieldId
        );

        const nextField =
          fields[currentIndex + 1] ||
          fields[currentIndex - 1] ||
          null;

        setSelectedId(nextField?.id ?? null);
      }
    },
    [selectedId, fields]
  );

  // Duplicate a field.
  const duplicateField = useCallback(
    (fieldId) => {
      const index = fields.findIndex(
        (field) => field.id === fieldId
      );

      if (index < 0) return;

      const copy = {
        ...fields[index],
        id: Math.random().toString(36).slice(2, 9),
      };

      setFields((prevFields) => {
        const nextFields = [...prevFields];

        nextFields.splice(index + 1, 0, copy);

        return nextFields;
      });

      setSelectedId(copy.id);
    },
    [fields]
  );

  // Move a field up or down.
  const moveField = useCallback((fieldId, direction) => {
    setFields((prevFields) => {
      const index = prevFields.findIndex(
        (field) => field.id === fieldId
      );

      if (index < 0) return prevFields;

      const newIndex = index + direction;

      if (
        newIndex < 0 ||
        newIndex >= prevFields.length
      ) {
        return prevFields;
      }

      const nextFields = [...prevFields];

      [nextFields[index], nextFields[newIndex]] = [
        nextFields[newIndex],
        nextFields[index],
      ];

      return nextFields;
    });
  }, []);

  const reorderFields = useCallback((draggedId, targetId) => {
    if (!draggedId || !targetId || draggedId === targetId) {
      return;
    }

    setFields((prevFields) => {
      const from = prevFields.findIndex(
        (field) => field.id === draggedId
      );
      const to = prevFields.findIndex(
        (field) => field.id === targetId
      );

      if (from < 0 || to < 0) return prevFields;

      const nextFields = [...prevFields];
      const [movedField] = nextFields.splice(from, 1);
      nextFields.splice(to, 0, movedField);

      return nextFields;
    });
  }, []);

  return (
    <div
      style={{
        ...pageBg,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <FormTopBar
        formTitle={formTitle}
        formId={id}
        activeTab="edit"
        onNavigate={navigate}
      />

      <div
        style={{
          display: "flex",
          flex: 1,
          minHeight: 0,
        }}
      >
        {/* LEFT SIDEBAR */}
        <aside
          style={{
            width: 214,
            background: "#09111A",
            borderRight: "1px solid rgba(255,255,255,0.07)",
            flexShrink: 0,
            overflowY: "auto",
          }}
        >
          <FieldPalette onAdd={addField} />
        </aside>

        {/* MAIN EDITOR */}
        <main
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "24px 20px",
          }}
        >
          {/* FORM HEADER */}
          <div
            style={{
              maxWidth: 700,
              margin: "0 auto 12px",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -20,
                left: "5%",
                right: "5%",
                height: 60,
                background:
                  "radial-gradient(ellipse at center, rgba(102,87,131,0.22) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

            <div
              style={{
                background: "#18162A",
                borderRadius: 16,
                borderLeft: "3px solid rgba(102,87,131,0.75)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderLeftColor: "rgba(102,87,131,0.75)",
                padding: "20px 24px",
                position: "relative",
              }}
            >
              <input
                value={formTitle}
                onChange={(e) =>
                  setFormTitle(e.target.value)
                }
                placeholder="Form title"
                style={{
                  width: "100%",
                  border: "none",
                  fontSize: 21,
                  fontWeight: 700,
                  fontFamily:
                    "'Bricolage Grotesque', sans-serif",
                  color: "#F0ECE0",
                  letterSpacing: "-0.022em",
                  outline: "none",
                  background: "transparent",
                  marginBottom: 7,
                  caretColor: COLORS.teal,
                }}
              />

              <input
                value={formDescription}
                onChange={(e) =>
                  setFormDescription(e.target.value)
                }
                placeholder="Description (optional)"
                style={{
                  width: "100%",
                  border: "none",
                  fontSize: 13.5,
                  color: COLORS.body,
                  outline: "none",
                  background: "transparent",
                  fontFamily: "'Inter', sans-serif",
                  caretColor: COLORS.teal,
                }}
              />
            </div>
          </div>

          {/* FIELDS */}
          <div
            style={{
              maxWidth: 700,
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              gap: 9,
            }}
          >
            {fields.map((field, index) => (
              <FieldCard
                key={field.id}
                field={field}
                isSelected={selectedId === field.id}
                isDragging={draggedFieldId === field.id}
                index={index}
                total={fields.length}
                onSelect={() =>
                  setSelectedId(field.id)
                }
                onDelete={() =>
                  deleteField(field.id)
                }
                onDuplicate={() =>
                  duplicateField(field.id)
                }
                onMoveUp={() =>
                  moveField(field.id, -1)
                }
                onMoveDown={() =>
                  moveField(field.id, 1)
                }
                onDragStart={(event) => {
                  event.dataTransfer.effectAllowed = "move";
                  event.dataTransfer.setData("text/plain", field.id);
                  setDraggedFieldId(field.id);
                  setSelectedId(field.id);
                }}
                onDragEnd={() => setDraggedFieldId(null)}
                onDragOver={(event) => {
                  event.preventDefault();
                  event.dataTransfer.dropEffect = "move";
                }}
                onDrop={() => {
                  if (draggedFieldId) {
                    reorderFields(draggedFieldId, field.id);
                    setDraggedFieldId(null);
                  }
                }}
              />
            ))}

            {/* EMPTY STATE */}
            {fields.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "64px 24px",
                  background: "#18162A",
                  borderRadius: 16,
                  border:
                    "1px dashed rgba(255,255,255,0.08)",
                }}
              >
                <p
                  style={{
                    fontFamily:
                      "'Bricolage Grotesque', sans-serif",
                    fontWeight: 700,
                    fontSize: 17,
                    color: COLORS.heading,
                    marginBottom: 6,
                  }}
                >
                  No fields
                </p>

                <p
                  style={{
                    color: COLORS.muted,
                    fontSize: 13.5,
                    margin: 0,
                  }}
                >
                  Select a field type from the sidebar to
                  begin.
                </p>
              </div>
            )}
          </div>
        </main>

        {/* RIGHT PROPERTIES PANEL */}
        <aside
          style={{
            width: 264,
            background: "#09111A",
            borderLeft:
              "1px solid rgba(255,255,255,0.07)",
            flexShrink: 0,
            overflowY: "auto",
          }}
        >
          {selectedField ? (
            <PropertiesPanel
              key={selectedField.id}
              field={selectedField}
              onChange={(updates) =>
                updateField(selectedField.id, updates)
              }
            />
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                padding: 28,
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontSize: 13,
                  color: COLORS.subtle,
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                Select a field to configure it
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}