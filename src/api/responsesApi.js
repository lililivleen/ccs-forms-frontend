import { apiClient } from "./apiClient";

export function getFormResponses(publishedFormId) {
  return apiClient.get(`/published_forms/${publishedFormId}/responses`);
}
export function submitResponse(formId, answers) {
  return apiClient.post(`/form/${formId}/response`, answers);
}
export function updateResponse(responseId, updates) {
  return apiClient.patch(`/response/${responseId}`, updates);
}
export function deleteResponse(responseId) {
  return apiClient.delete(`/response/${responseId}`);
}
export function getResponse(responseId) {
  return apiClient.get(`/responses/${responseId}`);
}