import { apiClient } from "./apiClient";

// Draft forms (admin)
export function getDraftForms() {
  return apiClient.get("/draft_forms/");
}
export function createDraftForm() {
  return apiClient.post("/draft_forms/");
}
export function getDraftForm(id) {
  return apiClient.get(`/draft_forms/${id}`);
}
export function updateDraftFormContent(id, formJson) {
  return apiClient.put(`/draft_forms/${id}`, formJson);
}
export function updateDraftFormMeta(id, metaUpdates) {
  return apiClient.patch(`/draft_forms/${id}`, metaUpdates);
}
export function deleteDraftForm(id) {
  return apiClient.delete(`/draft_forms/${id}`);
}
export function publishDraftForm(id) {
  return apiClient.post(`/draft_forms/${id}/publish`);
}

// Published forms (admin)
export function getPublishedForms() {
  return apiClient.get("/published_forms/");
}
export function updatePublishedFormMeta(id, metaUpdates) {
  return apiClient.patch(`/published_forms/${id}`, metaUpdates);
}
export function unpublishForm(id) {
  return apiClient.delete(`/published_forms/${id}`);
}

// Responder-facing
export function getPublicForm(id) {
  return apiClient.get(`/form/${id}`);
}