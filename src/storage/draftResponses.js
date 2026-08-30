import { idbGet, idbSet, idbDelete } from "./indexedDb.js";

const STORE = "draftResponses";

export async function saveDraftResponse(formId, answers) {
  await idbSet(STORE, { formId, answers, updatedAt: Date.now() });
}

export async function getDraftResponse(formId) {
  const record = await idbGet(STORE, formId);
  return record ? record.answers : null;
}

export async function clearDraftResponse(formId) {
  await idbDelete(STORE, formId);
}