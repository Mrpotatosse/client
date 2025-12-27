import type {ToastServiceMethods} from "primevue";
import type {Options} from "ky";
import {api} from "@/clients";
import {ABORT_ERROR} from "@/services/const.ts";
import {abortContent, errorContent} from "@/components/references/const.ts";
import type {Page} from "@/components/references/types.ts";
import type {LocationQuery} from "vue-router";
import {locationQueryToSearchParams} from "@/services/utils.ts";
import {formGetErrorToast, formGetSuccessToast} from "@/toasts/form.service.toast.ts";

function formService(path: string, toast: ToastServiceMethods, disableToastOnSuccess = false) {
  const correctedPath = path.startsWith("/") ? path.substring(1) : path;
  return {
    getAll: async <T>(query: LocationQuery, options?: Options) =>
      await api.get<Page<T>>(correctedPath, {
        searchParams: locationQueryToSearchParams(query),
        ...options
      })
        .then((response) => {
          if (!disableToastOnSuccess) toast.add(formGetSuccessToast(path));
          return response.json<Page<T>>();
        })
        .catch((err) => {
          if (err.name === ABORT_ERROR) return abortContent;
          toast.add(formGetErrorToast(path));
          return errorContent;
        }),
    get: async <T>(id: unknown, options?: Options) =>
      await api.get<T>(`${correctedPath}/${id}`, options)
        .then((response) => {
          if (!disableToastOnSuccess) toast.add(formGetSuccessToast(path));
          return response.json<T>();
        })
        .catch((err) => {
          if (err.name === ABORT_ERROR) return abortContent;
          toast.add(formGetErrorToast(path));
          return errorContent;
        }),
  };
}

export {formService};
