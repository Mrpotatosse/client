import {ref} from "vue";
import type {
  AbortResult,
  ErrorResult,
  LoadingResult,
  NoResult,
  Page,
  ReferencePageResult,
  ReferenceResult,
  SmartFetchParams
} from "@/components/references/types.ts";


export const isError = function (result: ReferenceResult<unknown> | ReferencePageResult<unknown>)
  : result is ErrorResult {
  return "_error" in (result as never);
};

export const isAbort = function (result: ReferenceResult<unknown> | ReferencePageResult<unknown>)
  : result is AbortResult {
  return "_abort" in (result as never);
};

export const isLoading = function (result: ReferenceResult<unknown> | ReferencePageResult<unknown>)
  : result is LoadingResult {
  return "_loading" in (result as never);
};

export const isNo = function (result: ReferenceResult<unknown> | ReferencePageResult<unknown>)
  : result is NoResult {
  return "_noContent" in (result as never);
};

export const isValid = function <T>(result: ReferenceResult<T> | ReferencePageResult<T>)
  : result is T | Page<T> {
  if (!result) return false;
  return !isError(result) && !isAbort(result) && !isLoading(result) && !isNo(result);
};

export const isValidPage = function <T>(result: ReferencePageResult<T>)
  : result is Page<T> {
  return isValid(result);
};

export function useSmartFetch<T>(
  fetchFn: (params: SmartFetchParams) => Promise<T>,
  defaultValue: T
) {
  const loading = ref(false);
  const result = ref<T>(defaultValue);
  const controller = ref<AbortController>();

  const execute = async (params: SmartFetchParams) => {
    loading.value = true;
    if (controller.value && !controller.value.signal.aborted) {
      controller.value.abort();
    }
    controller.value = new AbortController();
    result.value = await fetchFn({...params, signal: controller.value?.signal} as SmartFetchParams);
    loading.value = false;
  };

  return {
    loading,
    result,
    execute,
    controller
  };
}
