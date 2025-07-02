export interface FormField {
  type: string;
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  row?: string;
}

export interface FormConfig {
  steps: {
    title: string;
    fields: FormField[];
  }[];
}
