import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { pageBg, FormTopBar, COLORS, sandyBtn } from "../ui/shared";
import {
  FieldPalette,
  FieldCard,
  PropertiesPanel,
  defaultField,
  genId,
} from "../ui/formFields.jsx";
import {
  getDraft,
  setDraft,
  createEmptySection,
  normalizeFormDraft,
} from "../store/formDraftStore";
import { updateDraftFormContent } from "../api/formsApi";

export default function FormEditorPage() {
  const navigate = useNavigate();
  const { id = "new" } = useParams();

  const draft = getDraft(id);
  const normalizedDraft = normalizeFormDraft(draft);

  const [formTitle, setFormTitle] = useState(normalizedDraft.title || "");
  const [formDescription, setFormDescription] = useState(
    normalizedDraft.description || ""
  );
  const [sections, setSections] = useState(normalizedDraft.sections);
  const [selectedSectionId, setSelectedSectionId] = useState(
    normalizedDraft.sections[0]?.id ?? null
  );
  const [selectedQuestionId, setSelectedQuestionId] = useState(
    normalizedDraft.sections[0]?.questions?.[0]?.id ?? null
  );
  const [draggedFieldId, setDraggedFieldId] = useState(null);
  const [saveState, setSaveState] = useState("idle");

  useEffect(() => {
    setDraft(id, {
      title: formTitle,
      description: formDescription,
      sections,
    });
  }, [id, formTitle, formDescription, sections]);

  async function handleSave() {
    setSaveState("saving");
    try {
      await updateDraftFormContent(id, {
        title: formTitle,
        description: formDescription,
        sections,
      });
      setSaveState("saved");
    } catch {
      setSaveState("error");
    }
  }

  useEffect(() => {
    if (!sections.length) {
      const nextSection = createEmptySection(0);
      setSections([nextSection]);
      setSelectedSectionId(nextSection.id);
      setSelectedQuestionId(null);
      return;
    }

    if (!selectedSectionId || !sections.some((section) => section.id === selectedSectionId)) {
      setSelectedSectionId(sections[0].id);
    }

    const section = sections.find((item) => item.id === selectedSectionId) || sections[0];
    if (section && !section.questions.some((question) => question.id === selectedQuestionId)) {
      setSelectedQuestionId(section.questions[0]?.id ?? null);
    }
  }, [sections, selectedSectionId, selectedQuestionId]);

  const selectedSection =
    sections.find((section) => section.id === selectedSectionId) || sections[0] || createEmptySection(0);
  const selectedField =
    selectedSection.questions.find((question) => question.id === selectedQuestionId) ?? null;

  const updateSection = useCallback((sectionId, updates) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId ? { ...section, ...updates } : section
      )
    );
  }, []);

  const addSection = useCallback(() => {
    setSections((prevSections) => {
      const nextSection = createEmptySection(prevSections.length);
      const nextSections = [...prevSections, nextSection];
      setSelectedSectionId(nextSection.id);
      setSelectedQuestionId(null);
      return nextSections;
    });
  }, []);

  const moveSection = useCallback((sectionId, direction) => {
    setSections((prevSections) => {
      const index = prevSections.findIndex((section) => section.id === sectionId);
      const targetIndex = index + direction;
      if (index < 0 || targetIndex < 0 || targetIndex >= prevSections.length) {
        return prevSections;
      }

      const nextSections = [...prevSections];
      [nextSections[index], nextSections[targetIndex]] = [
        nextSections[targetIndex],
        nextSections[index],
      ];
      return nextSections;
    });
  }, []);

  const duplicateSection = useCallback((sectionId) => {
    setSections((prevSections) => {
      const index = prevSections.findIndex((section) => section.id === sectionId);
      if (index < 0) return prevSections;

      const original = prevSections[index];
      const nextSection = {
        ...original,
        id: genId(),
        title: `${original.title || "Section"} Copy`,
        questions: (original.questions || []).map((question) => ({
          ...question,
          id: genId(),
          options: Array.isArray(question.options)
            ? question.options.map((option) => ({ ...option, id: genId() }))
            : question.options,
        })),
      };

      const nextSections = [...prevSections];
      nextSections.splice(index + 1, 0, nextSection);
      setSelectedSectionId(nextSection.id);
      setSelectedQuestionId(nextSection.questions[0]?.id ?? null);
      return nextSections;
    });
  }, []);

  const deleteSection = useCallback(
    (sectionId) => {
      if (sections.length <= 1) {
        window.alert("A form must contain at least one section.");
        return;
      }

      const section = sections.find((item) => item.id === sectionId);
      if ((section?.questions || []).length > 0) {
        const confirmed = window.confirm(
          "This section contains questions. Delete it and all its questions?"
        );
        if (!confirmed) return;
      }

      setSections((prevSections) => {
        const nextSections = prevSections.filter((sectionItem) => sectionItem.id !== sectionId);
        if (nextSections.length) {
          const nextSection = nextSections[0];
          setSelectedSectionId(nextSection.id);
          setSelectedQuestionId(nextSection.questions[0]?.id ?? null);
        }
        return nextSections;
      });
    },
    [sections]
  );

  const addField = useCallback(
    (type) => {
      const newField = defaultField(type);
      setSections((prevSections) =>
        prevSections.map((section) =>
          section.id === selectedSectionId
            ? { ...section, questions: [...(section.questions || []), newField] }
            : section
        )
      );
      setSelectedQuestionId(newField.id);
    },
    [selectedSectionId]
  );

  const updateField = useCallback((fieldId, updates) => {
    setSections((prevSections) =>
      prevSections.map((section) => ({
        ...section,
        questions: (section.questions || []).map((field) =>
          field.id === fieldId ? { ...field, ...updates } : field
        ),
      }))
    );
  }, []);

  const deleteField = useCallback(
    (fieldId) => {
      setSections((prevSections) =>
        prevSections.map((section) => ({
          ...section,
          questions: (section.questions || []).filter((field) => field.id !== fieldId),
        }))
      );

      if (selectedQuestionId === fieldId) {
        const remainingQuestions = selectedSection.questions.filter((field) => field.id !== fieldId);
        setSelectedQuestionId(remainingQuestions[0]?.id ?? null);
      }
    },
    [selectedQuestionId, selectedSection]
  );

  const duplicateField = useCallback((fieldId) => {
    setSections((prevSections) =>
      prevSections.map((section) => {
        const questions = [...(section.questions || [])];
        const index = questions.findIndex((field) => field.id === fieldId);
        if (index < 0) return section;

        const copy = {
          ...questions[index],
          id: genId(),
          options: Array.isArray(questions[index].options)
            ? questions[index].options.map((option) => ({ ...option, id: genId() }))
            : questions[index].options,
        };

        questions.splice(index + 1, 0, copy);
        return { ...section, questions };
      })
    );
  }, []);

  const moveField = useCallback(
    (fieldId, direction) => {
      setSections((prevSections) =>
        prevSections.map((section) => {
          if (section.id !== selectedSectionId) return section;

          const questions = [...(section.questions || [])];
          const index = questions.findIndex((field) => field.id === fieldId);
          if (index < 0) return section;

          const targetIndex = index + direction;
          if (targetIndex < 0 || targetIndex >= questions.length) return section;

          [questions[index], questions[targetIndex]] = [questions[targetIndex], questions[index]];
          return { ...section, questions };
        })
      );
    },
    [selectedSectionId]
  );

  const reorderFields = useCallback((draggedId, targetId) => {
    if (!draggedId || !targetId || draggedId === targetId) return;

    setSections((prevSections) =>
      prevSections.map((section) => {
        const questions = [...(section.questions || [])];
        const fromIndex = questions.findIndex((field) => field.id === draggedId);
        const toIndex = questions.findIndex((field) => field.id === targetId);
        if (fromIndex < 0 || toIndex < 0) return section;

        const [movedQuestion] = questions.splice(fromIndex, 1);
        questions.splice(toIndex, 0, movedQuestion);
        return { ...section, questions };
      })
    );
  }, []);

  const moveQuestionToSection = useCallback((questionId, targetSectionId) => {
    if (!questionId || !targetSectionId) return;

    setSections((prevSections) => {
      let movedQuestion = null;
      const nextSections = prevSections.map((section) => {
        if (section.id === targetSectionId) {
          return section;
        }

        const questions = [...(section.questions || [])];
        const index = questions.findIndex((field) => field.id === questionId);
        if (index < 0) return section;

        [movedQuestion] = questions.splice(index, 1);
        return { ...section, questions };
      });

      if (!movedQuestion) return prevSections;

      return nextSections.map((section) =>
        section.id === targetSectionId
          ? { ...section, questions: [...(section.questions || []), movedQuestion] }
          : section
      );
    });

    setSelectedSectionId(targetSectionId);
    setSelectedQuestionId(questionId);
  }, []);

  return (
    <div style={{ ...pageBg, display: "flex", flexDirection: "column" }}>
      <FormTopBar formTitle={formTitle} formId={id} activeTab="edit" onNavigate={navigate} />

      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        <aside style={{ width: 214, background: "#09111A", borderRight: "1px solid rgba(255,255,255,0.07)", flexShrink: 0, overflowY: "auto" }}>
          <FieldPalette onAdd={addField} />
        </aside>

        <main style={{ flex: 1, overflowY: "auto", padding: "24px 20px" }}>
          <div style={{ maxWidth: 700, margin: "0 auto 12px", position: "relative" }}>
            <div style={{ position: "absolute", top: -20, left: "5%", right: "5%", height: 60, background: "radial-gradient(ellipse at center, rgba(102,87,131,0.22) 0%, transparent 70%)", pointerEvents: "none" }} />
            <div style={{ background: "#18162A", borderRadius: 16, border: "1px solid rgba(255,255,255,0.07)", borderLeft: "3px solid rgba(102,87,131,0.75)", padding: "20px 24px", position: "relative" }}>
              <input
                value={formTitle}
                onChange={(event) => setFormTitle(event.target.value)}
                placeholder="Form title"
                style={{ width: "100%", border: "none", fontSize: 21, fontWeight: 700, fontFamily: "'Bricolage Grotesque', sans-serif", color: "#F0ECE0", letterSpacing: "-0.022em", outline: "none", background: "transparent", marginBottom: 7, caretColor: COLORS.teal }}
              />
              <input
                value={formDescription}
                onChange={(event) => setFormDescription(event.target.value)}
                placeholder="Description (optional)"
                style={{ width: "100%", border: "none", fontSize: 13.5, color: COLORS.body, outline: "none", background: "transparent", fontFamily: "'Inter', sans-serif", caretColor: COLORS.teal }}
              />
            </div>
          </div>

          <div style={{ maxWidth: 700, margin: "0 auto", display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button type="button" onClick={addSection} style={{ ...sandyBtn, padding: "8px 16px", fontSize: 12.5 }}>+ Add section</button>
            </div>

            {sections.map((section, sectionIndex) => (
              <div key={section.id} style={{ background: selectedSectionId === section.id ? "rgba(102,87,131,0.08)" : "#18162A", border: selectedSectionId === section.id ? "1px solid rgba(102,87,131,0.48)" : "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 18 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 12 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: COLORS.subtle }}>
                    Section {sectionIndex + 1}
                  </span>

                  <div style={{ display: "flex", gap: 6 }}>
                    <button type="button" style={{ ...sandyBtn, padding: "5px 9px", fontSize: 11 }} onClick={() => moveSection(section.id, -1)} disabled={sectionIndex === 0}>Up</button>
                    <button type="button" style={{ ...sandyBtn, padding: "5px 9px", fontSize: 11 }} onClick={() => moveSection(section.id, 1)} disabled={sectionIndex === sections.length - 1}>Down</button>
                    <button type="button" style={{ ...sandyBtn, padding: "5px 9px", fontSize: 11 }} onClick={() => duplicateSection(section.id)}>Duplicate</button>
                    <button type="button" style={{ ...sandyBtn, padding: "5px 9px", fontSize: 11, background: "rgba(248,113,113,0.12)", color: "#F8B4B4" }} onClick={() => deleteSection(section.id)}>Delete</button>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
                  <input
                    value={section.title || `Section ${sectionIndex + 1}`}
                    onClick={() => setSelectedSectionId(section.id)}
                    onChange={(event) => updateSection(section.id, { title: event.target.value || `Section ${sectionIndex + 1}` })}
                    placeholder={`Section ${sectionIndex + 1}`}
                    style={{ width: "100%", border: "none", outline: "none", background: "transparent", color: COLORS.heading, fontSize: 17, fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, letterSpacing: "-0.02em" }}
                  />
                  <input
                    value={section.description || ""}
                    onClick={() => setSelectedSectionId(section.id)}
                    onChange={(event) => updateSection(section.id, { description: event.target.value })}
                    placeholder="Section description (optional)"
                    style={{ width: "100%", border: "none", outline: "none", background: "transparent", color: COLORS.body, fontSize: 13, fontFamily: "'Inter', sans-serif" }}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {(section.questions || []).map((field, index) => (
                    <FieldCard
                      key={field.id}
                      field={field}
                      isSelected={selectedQuestionId === field.id && selectedSectionId === section.id}
                      isDragging={draggedFieldId === field.id}
                      index={index}
                      total={(section.questions || []).length}
                      onSelect={() => {
                        setSelectedSectionId(section.id);
                        setSelectedQuestionId(field.id);
                      }}
                      onDelete={() => deleteField(field.id)}
                      onDuplicate={() => duplicateField(field.id)}
                      onMoveUp={() => {
                        if (index > 0) {
                          const nextQuestions = [...(section.questions || [])];
                          [nextQuestions[index], nextQuestions[index - 1]] = [nextQuestions[index - 1], nextQuestions[index]];
                          updateSection(section.id, { questions: nextQuestions });
                        }
                      }}
                      onMoveDown={() => {
                        if (index < (section.questions || []).length - 1) {
                          const nextQuestions = [...(section.questions || [])];
                          [nextQuestions[index], nextQuestions[index + 1]] = [nextQuestions[index + 1], nextQuestions[index]];
                          updateSection(section.id, { questions: nextQuestions });
                        }
                      }}
                      onDragStart={(event) => {
                        event.dataTransfer.effectAllowed = "move";
                        event.dataTransfer.setData("text/plain", field.id);
                        setDraggedFieldId(field.id);
                        setSelectedSectionId(section.id);
                        setSelectedQuestionId(field.id);
                      }}
                      onDragEnd={() => setDraggedFieldId(null)}
                      onDragOver={(event) => {
                        event.preventDefault();
                        event.dataTransfer.dropEffect = "move";
                      }}
                      onDrop={() => {
                        if (!draggedFieldId) return;
                        if (draggedFieldId === field.id) {
                          setDraggedFieldId(null);
                          return;
                        }

                        setSections((prevSections) =>
                          prevSections.map((sectionItem) => {
                            const questions = [...(sectionItem.questions || [])];
                            const fromIndex = questions.findIndex((question) => question.id === draggedFieldId);
                            const toIndex = questions.findIndex((question) => question.id === field.id);
                            if (fromIndex < 0 || toIndex < 0) return sectionItem;
                            const [movedQuestion] = questions.splice(fromIndex, 1);
                            questions.splice(toIndex, 0, movedQuestion);
                            return { ...sectionItem, questions };
                          })
                        );
                        setDraggedFieldId(null);
                      }}
                    />
                  ))}

                  {(section.questions || []).length === 0 && (
                    <div style={{ padding: "24px 20px", textAlign: "center", background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.08)", borderRadius: 12, color: COLORS.muted, fontSize: 13 }}>
                      This section has no questions yet.
                    </div>
                  )}

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, marginTop: 10 }}>
                    <button type="button" onClick={() => addField("short_text")} style={{ ...sandyBtn, fontSize: 12.5, padding: "8px 12px", background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.09)" }}>+ Add question</button>
                  </div>
                </div>
              </div>
            ))}

            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 12, padding: "4px 0 20px" }}>
              {saveState === "saved" && (
                <span style={{ fontSize: 12, color: COLORS.teal }}>Changes saved</span>
              )}
              {saveState === "error" && (
                <span style={{ fontSize: 12, color: COLORS.danger }}>Could not save changes</span>
              )}
              <button
                type="button"
                onClick={handleSave}
                disabled={saveState === "saving"}
                style={{ ...sandyBtn, minWidth: 112, padding: "10px 20px", opacity: saveState === "saving" ? 0.65 : 1 }}
              >
                {saveState === "saving" ? "Saving..." : "Save changes"}
              </button>
            </div>
          </div>
        </main>

        <aside style={{ width: 264, background: "#09111A", borderLeft: "1px solid rgba(255,255,255,0.07)", flexShrink: 0, overflowY: "auto" }}>
          {selectedField ? (
            <PropertiesPanel
              key={selectedField.id}
              field={selectedField}
              sections={sections}
              currentSectionId={selectedSectionId}
              onMoveToSection={moveQuestionToSection}
              onChange={(updates) => updateField(selectedField.id, updates)}
            />
          ) : (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: 28, textAlign: "center" }}>
              <p style={{ fontSize: 13, color: COLORS.subtle, lineHeight: 1.6, margin: 0 }}>Select a field to configure it</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}