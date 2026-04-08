export type TriState = 0 | 1 | 2;

export interface FilterStateOption {
    type_name: string;
    name: string;
    value?: string;
    state?: boolean | number;
    values?: FilterStateOption[];
}
export interface Filter {
    type_name: string;
    type?: string;
    name: string;
    state?: number | FilterStateOption[];
    values?: FilterStateOption[];
}