import { idbGet, idbSet } from "./indexedDb.js";

const STORE = "responseCache";

export async function cacheResponses(formId, responses) {
  await idbSet(STORE, { formId, responses, cachedAt: Date.now() });
}

export async function getCachedResponses(formId) {
  const record = await idbGet(STORE, formId);
  return record ? record.responses : null;
}