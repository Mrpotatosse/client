import {api} from "@/clients";
import type {ToastServiceMethods} from "primevue";
import {
  createErrorToast,
  createSuccessToast,
  deleteSuccessToast,
  getSuccessToast,
  updateSuccessToast
} from "@/toasts/reference.service.toast.ts";
import type {ServiceError} from "@/services/types.ts";
import type {Page} from "@/components/references/types.ts";
import type {LocationQuery} from "vue-router";
import type {Options} from "ky";

const ABORT_ERROR = "AbortError";

export function referenceService<T>(referenceName: string, toast: ToastServiceMethods, disableToastOnSuccess = false) {
  if (referenceName === "") return;
  return {
    create: async (body: object, options?: Options) =>
      api.post<T>(`references/${referenceName}`, {json: body, ...options})
        .then((response) => {
          if (!disableToastOnSuccess) toast.add(createSuccessToast(referenceName));
          return response.json<T>();
        })
        .catch((err) => {
          if (err.name === ABORT_ERROR) return {abort: true};
          toast.add(createErrorToast(referenceName));
          return {error: true} as ServiceError;
        }),
    getAll: async (query: LocationQuery, options?: Options) =>
      api.get<T>(`references/${referenceName}`, {
        searchParams: {
          page: query.page as string ?? "0",
          size: query.size as string ?? "20"
        },
        ...options
      })
        .then((response) => {
          if (!disableToastOnSuccess) toast.add(getSuccessToast(referenceName));
          return response.json<Page<T>>();
        })
        .catch((err) => {
          if (err.name === ABORT_ERROR) return {abort: true};
          toast.add(createErrorToast(referenceName));
          return {error: true} as ServiceError;
        }),
    get: async (id: number, options?: Options) =>
      api.get<T>(`references/${referenceName}/${id}`, options)
        .then((response) => {
          if (!disableToastOnSuccess) toast.add(getSuccessToast(referenceName));
          return response.json<T>();
        })
        .catch((err) => {
          if (err.name === ABORT_ERROR) return {abort: true};
          toast.add(createErrorToast(referenceName));
          return {error: true} as ServiceError;
        }),
    delete: async (id: number, options?: Options) =>
      api.delete(`references/${referenceName}/${id}`, options)
        .then(() => {
          if (!disableToastOnSuccess) toast.add(deleteSuccessToast(referenceName));
        })
        .catch((err) => {
          if (err.name === ABORT_ERROR) return {abort: true};
          toast.add(createErrorToast(referenceName));
          return {error: true} as ServiceError;
        }),
    update: async (id: number, body: object, options?: Options) =>
      api.patch<T>(`references/${referenceName}/${id}`, {json: body, ...options})
        .then((response) => {
          if (!disableToastOnSuccess) toast.add(updateSuccessToast(referenceName));
          return response.json<T>();
        })
        .catch((err) => {
          if (err.name === ABORT_ERROR) return {abort: true};
          toast.add(createErrorToast(referenceName));
          return {error: true} as ServiceError;
        })
  };
}
