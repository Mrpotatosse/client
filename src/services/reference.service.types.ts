import type {referenceService} from "@/services/reference.service.ts";

export type ReferenceService<T> = ReturnType<typeof referenceService<T>>;
