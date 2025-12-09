import {ref} from "vue";

export function useSmartFetch<T>(
  fetchFn: (signal?: AbortSignal) => Promise<T>,
  defaultResult: T
) {
  const loading = ref(false);
  const result = ref<T>(defaultResult);

  let controller: AbortController | undefined = undefined;

  const execute = async () => {
    controller?.abort();
    controller = new AbortController();
    loading.value = true;
    result.value = await fetchFn(controller?.signal);
    loading.value = false;
  };

  return {
    loading,
    result,
    execute
  };
}
