import {
  abortContent,
  errorContent,
  loadingContent,
  type noContent
} from "@/components/references/const.ts";

export type SmartFetchParams = {
  signal?: AbortSignal
} & Record<string, never>

export type ReferenceItem = {
  label: string;
  value: string
}

export type Page<T> = {
  content: T[];
  page: {
    number: number,
    size: number,
    totalElements: number,
    totalPages: number
  }
}

export type NoResult = typeof noContent;
export type ErrorResult = typeof errorContent;
export type AbortResult = typeof abortContent;
export type LoadingResult = typeof loadingContent;

export type ReferenceResult<T> = T | NoResult | ErrorResult | AbortResult | LoadingResult;
export type ReferencePageResult<T> = ReferenceResult<Page<T>>;
