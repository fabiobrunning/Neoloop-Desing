import type { DesignSystem, DesignSystemAction } from '../types/design-system';

export function designSystemReducer(
  state: DesignSystem,
  action: DesignSystemAction
): DesignSystem {
  switch (action.type) {
    case 'UPDATE_COLOR':
      return {
        ...state,
        colors: state.colors.map(c =>
          c.id === action.payload.id ? action.payload : c
        ),
      };

    case 'ADD_COLOR':
      return {
        ...state,
        colors: [...state.colors, action.payload],
      };

    case 'DELETE_COLOR':
      return {
        ...state,
        colors: state.colors.filter(c => c.id !== action.payload),
      };

    case 'UPDATE_TYPOGRAPHY':
      return {
        ...state,
        typography: state.typography.map(t =>
          t.id === action.payload.id ? action.payload : t
        ),
      };

    case 'ADD_TYPOGRAPHY':
      return {
        ...state,
        typography: [...state.typography, action.payload],
      };

    case 'DELETE_TYPOGRAPHY':
      return {
        ...state,
        typography: state.typography.filter(t => t.id !== action.payload),
      };

    case 'UPDATE_SPACING':
      return {
        ...state,
        spacing: state.spacing.map(s =>
          s.id === action.payload.id ? action.payload : s
        ),
      };

    case 'ADD_SPACING':
      return {
        ...state,
        spacing: [...state.spacing, action.payload],
      };

    case 'DELETE_SPACING':
      return {
        ...state,
        spacing: state.spacing.filter(s => s.id !== action.payload),
      };

    case 'RESTORE_STATE':
      return action.payload;

    default:
      return state;
  }
}
