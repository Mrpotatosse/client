export type ReferenceTableColumn = {
  name: string;
  order: number;
  searchable: boolean;
  sortable: boolean;
}
export type ReferenceTableProperty = {
  name: string;
  type: string;
  order: number;
  fetch?: string;
  fetchValueKey?: string;
  display?: string
  required?: boolean
  min?: number
  max?: number
}
