

export type FormField = {
    type: 'text' | 'email' | 'password' | 'checkbox' | 'select' | 'button' | 'captcha' | 'otp';
    name: string;
    label: string;
    placeholder?: string;
    options?: { label: string; value: string }[];
    required?: boolean;
    dependsOn?: { field: string; value: string };
    row?: number;
  };
  
  export type FormStepType = {
    title: string;
    fields: FormField[];
  };
  
  export type FormConfig = {
    steps: FormStepType[];
  };
  