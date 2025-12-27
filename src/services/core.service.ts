import type {ToastServiceMethods} from "primevue";
import type {Options} from "ky";
import {api} from "@/clients";
import {abortContent, errorContent} from "@/components/references/const.ts";
import {coreDiscoverErrorToast, coreDiscoverSuccessToast} from "@/toasts/core.service.toast.ts";
import {ABORT_ERROR} from "@/services/const.ts";

function coreReferenceService(toast: ToastServiceMethods, disableToastOnSuccess = false) {
  return {
    discover: async (options?: Options) =>
      await api.get<string[]>(`api/v1/core/references`, options)
        .then((response) => {
          if (!disableToastOnSuccess) toast.add(coreDiscoverSuccessToast());
          return response.json<string[]>();
        })
        .catch((err) => {
          if (err.name === ABORT_ERROR) return abortContent;
          toast.add(coreDiscoverErrorToast());
          return errorContent;
        }),
  };
}

export {coreReferenceService};
