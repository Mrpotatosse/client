import {api} from "@/clients";
import {type ToastServiceMethods} from "primevue";
import {
  createErrorToast,
  createSuccessToast,
  deleteErrorToast,
  deleteSuccessToast,
  getErrorToast,
  getSuccessToast,
  updateErrorToast,
  updateSuccessToast
} from "@/toasts/reference.service.toast.ts";

export const referenceService = (referenceName: string, toast: ToastServiceMethods) => {
  return {
    create: async (body: object) =>
      api.post(`references/${referenceName}`, {json: body})
        .then(() => toast.add(createSuccessToast(referenceName)))
        .catch(() => toast.add(createErrorToast(referenceName))),
    getAll: async () =>
      api.get(`references/${referenceName}`)
        .then(() => toast.add(getSuccessToast(referenceName)))
        .catch(() => toast.add(getErrorToast(referenceName))),
    get: async (id: number) =>
      api.get(`references/${referenceName}/${id}`)
        .then(() => toast.add(getSuccessToast(referenceName)))
        .catch(() => toast.add(getErrorToast(referenceName))),
    delete: async (id: number) =>
      api.delete(`references/${referenceName}/${id}`)
        .then(() => toast.add(deleteSuccessToast(referenceName)))
        .catch(() => toast.add(deleteErrorToast(referenceName))),
    update: async (id: number, body: object) =>
      api.patch(`references/${referenceName}/${id}`, {json: body})
        .then(() => toast.add(updateSuccessToast(referenceName)))
        .catch(() => toast.add(updateErrorToast(referenceName)))
  };
};
