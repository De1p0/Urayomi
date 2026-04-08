
export interface ListPreference {
    title: string;
    summary: string;
    valueIndex: number;
    entries: string[];
    entryValues: string[];
}

export interface MultiSelectListPreference {
    title: string;
    summary: string;
    entries: string[];
    entryValues: string[];
    values: string[];
}

export interface EditTextPreference {
    title: string;
    summary: string;
    value: string;
    dialogTitle: string;
    dialogMessage: string;
}

export interface SourcePreference {
    key: string;
    listPreference?: ListPreference;
    multiSelectListPreference?: MultiSelectListPreference;
    editTextPreference?: EditTextPreference;
}
