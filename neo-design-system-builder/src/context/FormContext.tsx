/**
 * Form Context Provider
 * Manages form state with validation and submission
 */

import React, { createContext, useContext, useReducer, ReactNode, useCallback } from 'react';

/**
 * Form Field
 */
export interface FormField<T = unknown> {
  value: T;
  error?: string;
  touched: boolean;
  dirty: boolean;
}

/**
 * Form State
 */
export interface FormState {
  fields: Record<string, FormField>;
  isSubmitting: boolean;
  isValid: boolean;
  submitCount: number;
}

/**
 * Form Actions
 */
export type FormAction =
  | { type: 'SET_FIELD_VALUE'; payload: { field: string; value: unknown } }
  | { type: 'SET_FIELD_ERROR'; payload: { field: string; error?: string } }
  | { type: 'SET_FIELD_TOUCHED'; payload: { field: string; touched: boolean } }
  | { type: 'SET_SUBMITTING'; payload: boolean }
  | { type: 'INCREMENT_SUBMIT_COUNT' }
  | { type: 'RESET_FORM'; payload?: Partial<FormState> }
  | { type: 'RESET_FIELD'; payload: string };

/**
 * Validation function
 */
export type ValidatorFn<T = unknown> = (value: T) => string | undefined;

/**
 * Form reducer
 */
const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'SET_FIELD_VALUE': {
      const { field, value } = action.payload;
      const currentField = state.fields[field] || { value: '', error: undefined, touched: false, dirty: false };

      return {
        ...state,
        fields: {
          ...state.fields,
          [field]: {
            ...currentField,
            value,
            dirty: true,
          },
        },
      };
    }

    case 'SET_FIELD_ERROR': {
      const { field, error } = action.payload;
      const currentField = state.fields[field];

      if (!currentField) return state;

      return {
        ...state,
        fields: {
          ...state.fields,
          [field]: {
            ...currentField,
            error,
          },
        },
        isValid: !error && Object.values(state.fields).every((f) => !f.error),
      };
    }

    case 'SET_FIELD_TOUCHED': {
      const { field, touched } = action.payload;
      const currentField = state.fields[field];

      if (!currentField) return state;

      return {
        ...state,
        fields: {
          ...state.fields,
          [field]: {
            ...currentField,
            touched,
          },
        },
      };
    }

    case 'SET_SUBMITTING':
      return { ...state, isSubmitting: action.payload };

    case 'INCREMENT_SUBMIT_COUNT':
      return { ...state, submitCount: state.submitCount + 1 };

    case 'RESET_FORM': {
      const resetState: FormState = {
        fields: {},
        isSubmitting: false,
        isValid: true,
        submitCount: 0,
        ...action.payload,
      };
      return resetState;
    }

    case 'RESET_FIELD': {
      const field = action.payload;
      const newFields = { ...state.fields };
      delete newFields[field];

      return {
        ...state,
        fields: newFields,
      };
    }

    default:
      return state;
  }
};

/**
 * Form Context Value
 */
interface FormContextValue {
  state: FormState;
  dispatch: React.Dispatch<FormAction>;
  // Helper methods
  setFieldValue: (field: string, value: unknown) => void;
  setFieldError: (field: string, error?: string) => void;
  setFieldTouched: (field: string, touched?: boolean) => void;
  validateField: (field: string, validator: ValidatorFn) => void;
  getFieldValue: <T = unknown>(field: string) => T | undefined;
  getFieldError: (field: string) => string | undefined;
  isFieldTouched: (field: string) => boolean;
  isFieldDirty: (field: string) => boolean;
  handleSubmit: (onSubmit: () => Promise<void> | void) => Promise<void>;
  resetForm: (initialState?: Partial<FormState>) => void;
  resetField: (field: string) => void;
}

const FormContext = createContext<FormContextValue | undefined>(undefined);

/**
 * Form Provider
 */
interface FormProviderProps {
  children: ReactNode;
  initialValues?: Record<string, unknown>;
  validators?: Record<string, ValidatorFn>;
}

export const FormProvider: React.FC<FormProviderProps> = ({ children, initialValues = {}, validators = {} }) => {
  // Initialize state with initial values
  const initialState: FormState = {
    fields: Object.keys(initialValues).reduce((acc, key) => {
      acc[key] = {
        value: initialValues[key],
        error: undefined,
        touched: false,
        dirty: false,
      };
      return acc;
    }, {} as Record<string, FormField>),
    isSubmitting: false,
    isValid: true,
    submitCount: 0,
  };

  const [state, dispatch] = useReducer(formReducer, initialState);

  // Helper methods
  const setFieldValue = useCallback((field: string, value: unknown) => {
    dispatch({ type: 'SET_FIELD_VALUE', payload: { field, value } });

    // Auto-validate if validator exists
    if (validators[field]) {
      const error = validators[field](value);
      dispatch({ type: 'SET_FIELD_ERROR', payload: { field, error } });
    }
  }, [validators]);

  const setFieldError = useCallback((field: string, error?: string) => {
    dispatch({ type: 'SET_FIELD_ERROR', payload: { field, error } });
  }, []);

  const setFieldTouched = useCallback((field: string, touched: boolean = true) => {
    dispatch({ type: 'SET_FIELD_TOUCHED', payload: { field, touched } });
  }, []);

  const validateField = useCallback((field: string, validator: ValidatorFn) => {
    const fieldData = state.fields[field];
    if (fieldData) {
      const error = validator(fieldData.value);
      dispatch({ type: 'SET_FIELD_ERROR', payload: { field, error } });
    }
  }, [state.fields]);

  const getFieldValue = useCallback(<T = unknown>(field: string): T | undefined => {
    return state.fields[field]?.value as T | undefined;
  }, [state.fields]);

  const getFieldError = useCallback((field: string): string | undefined => {
    return state.fields[field]?.error;
  }, [state.fields]);

  const isFieldTouched = useCallback((field: string): boolean => {
    return state.fields[field]?.touched || false;
  }, [state.fields]);

  const isFieldDirty = useCallback((field: string): boolean => {
    return state.fields[field]?.dirty || false;
  }, [state.fields]);

  const handleSubmit = useCallback(async (onSubmit: () => Promise<void> | void) => {
    // Mark all fields as touched
    Object.keys(state.fields).forEach((field) => {
      dispatch({ type: 'SET_FIELD_TOUCHED', payload: { field, touched: true } });
    });

    // Validate all fields
    let hasErrors = false;
    Object.keys(validators).forEach((field) => {
      const value = state.fields[field]?.value;
      const error = validators[field](value);
      if (error) {
        hasErrors = true;
        dispatch({ type: 'SET_FIELD_ERROR', payload: { field, error } });
      }
    });

    if (hasErrors) return;

    dispatch({ type: 'SET_SUBMITTING', payload: true });
    dispatch({ type: 'INCREMENT_SUBMIT_COUNT' });

    try {
      await onSubmit();
    } finally {
      dispatch({ type: 'SET_SUBMITTING', payload: false });
    }
  }, [state.fields, validators]);

  const resetForm = useCallback((initialState?: Partial<FormState>) => {
    dispatch({ type: 'RESET_FORM', payload: initialState });
  }, []);

  const resetField = useCallback((field: string) => {
    dispatch({ type: 'RESET_FIELD', payload: field });
  }, []);

  const value: FormContextValue = {
    state,
    dispatch,
    setFieldValue,
    setFieldError,
    setFieldTouched,
    validateField,
    getFieldValue,
    getFieldError,
    isFieldTouched,
    isFieldDirty,
    handleSubmit,
    resetForm,
    resetField,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

/**
 * Hook to use Form Context
 */
export const useFormContext = (): FormContextValue => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error('useFormContext must be used within FormProvider');
  }

  return context;
};
