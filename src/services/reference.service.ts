import {api} from "@/clients";
import type {ToastServiceMethods} from "primevue";
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
import type {Page} from "@/components/references/types.ts";
import type {LocationQuery} from "vue-router";
import type {Options} from "ky";
import {abortContent, errorContent} from "@/components/references/const.ts";
import type {ReferenceTableColumn, ReferenceTableProperty} from "@/services/types.ts";
import {ABORT_ERROR} from "@/services/const.ts";
import {locationQueryToSearchParams} from "@/services/utils.ts";


function referenceService<T>(referenceName: string, toast: ToastServiceMethods, disableToastOnSuccess = false) {
  return {
    create: async (body: object, options?: Options) =>
      await api.post<T>(`api/v1/references/${referenceName}`, {json: body, ...options})
        .then((response) => {
          if (!disableToastOnSuccess) toast.add(createSuccessToast(referenceName));
          return response.json<T>();
        })
        .catch((err) => {
          if (err.name === ABORT_ERROR) return abortContent;
          toast.add(createErrorToast(referenceName));
          return errorContent;
        }),
    getAll: async (query: LocationQuery, options?: Options) =>
      await api.get<Page<T>>(`api/v1/references/${referenceName}`, {
        searchParams: locationQueryToSearchParams(query),
        ...options
      })
        .then((response) => {
          if (!disableToastOnSuccess) toast.add(getSuccessToast(referenceName));
          return response.json<Page<T>>();
        })
        .catch((err) => {
          if (err.name === ABORT_ERROR) return abortContent;
          toast.add(getErrorToast(referenceName));
          return errorContent;
        }),
    get: async (id: number, options?: Options) =>
      await api.get<T>(`api/v1/references/${referenceName}/${id}`, options)
        .then((response) => {
          if (!disableToastOnSuccess) toast.add(getSuccessToast(referenceName));
          return response.json<T>();
        })
        .catch((err) => {
          if (err.name === ABORT_ERROR) return abortContent;
          toast.add(getErrorToast(referenceName));
          return errorContent;
        }),
    delete: async (id: number, options?: Options) =>
      await api.delete(`api/v1/references/${referenceName}/${id}`, options)
        .then(() => {
          if (!disableToastOnSuccess) toast.add(deleteSuccessToast(referenceName));
          return {} as object;
        })
        .catch((err) => {
          if (err.name === ABORT_ERROR) return abortContent;
          toast.add(deleteErrorToast(referenceName));
          return errorContent;
        }),
    update: async (id: number, body: object, options?: Options) =>
      await api.patch<T>(`api/v1/references/${referenceName}/${id}`, {json: body, ...options})
        .then((response) => {
          if (!disableToastOnSuccess) toast.add(updateSuccessToast(referenceName));
          return response.json<T>();
        })
        .catch((err) => {
          if (err.name === ABORT_ERROR) return abortContent;
          toast.add(updateErrorToast(referenceName));
          return errorContent;
        }),
    tableDefault: async <V>(options?: Options) =>
      await api.get<V>(`api/v1/references/${referenceName}/table/default`, options)
        .then((response) => {
          if (!disableToastOnSuccess) toast.add(getSuccessToast(referenceName));
          return response.json<V>();
        })
        .catch((err) => {
          if (err.name === ABORT_ERROR) return abortContent;
          toast.add(getErrorToast(referenceName));
          return errorContent;
        })
    ,
    tableCreationProperties: async (options?: Options) =>
      await api.get<ReferenceTableProperty[]>(`api/v1/references/${referenceName}/table/creation-properties`, options)
        .then((response) => {
          if (!disableToastOnSuccess) toast.add(getSuccessToast(referenceName));
          return response.json<ReferenceTableProperty[]>();
        })
        .catch((err) => {
          if (err.name === ABORT_ERROR) return abortContent;
          toast.add(getErrorToast(referenceName));
          return errorContent;
        }),
    tableModificationProperties: async (options?: Options) =>
      await api.get<ReferenceTableProperty[]>(`api/v1/references/${referenceName}/table/modification-properties`, options)
        .then((response) => {
          if (!disableToastOnSuccess) toast.add(getSuccessToast(referenceName));
          return response.json<ReferenceTableProperty[]>();
        })
        .catch((err) => {
          if (err.name === ABORT_ERROR) return abortContent;
          toast.add(getErrorToast(referenceName));
          return errorContent;
        }),
    tableColumns: async (options?: Options) =>
      await api.get<ReferenceTableColumn[]>(`api/v1/references/${referenceName}/table/columns`, options)
        .then((response) => {
          if (!disableToastOnSuccess) toast.add(getSuccessToast(referenceName));
          return response.json<ReferenceTableColumn[]>();
        })
        .catch((err) => {
          if (err.name === ABORT_ERROR) return abortContent;
          toast.add(getErrorToast(referenceName));
          return errorContent;
        })
  };
}

export {referenceService};
