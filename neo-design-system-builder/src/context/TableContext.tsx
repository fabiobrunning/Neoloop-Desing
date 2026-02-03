/**
 * Table Context Provider
 * Manages table state: sorting, pagination, selection, filtering
 */

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { TableSort, TableFilter } from '../schemas/table.schema';

/**
 * Table State
 */
export interface TableState {
  page: number;
  pageSize: number;
  sort?: TableSort;
  filters: TableFilter[];
  search: string;
  selectedRows: string[];
}

/**
 * Table Actions
 */
export type TableAction =
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'SET_PAGE_SIZE'; payload: number }
  | { type: 'SET_SORT'; payload: TableSort | undefined }
  | { type: 'ADD_FILTER'; payload: TableFilter }
  | { type: 'REMOVE_FILTER'; payload: string }
  | { type: 'CLEAR_FILTERS' }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SELECT_ROW'; payload: string }
  | { type: 'DESELECT_ROW'; payload: string }
  | { type: 'SELECT_ALL'; payload: string[] }
  | { type: 'CLEAR_SELECTION' }
  | { type: 'RESET' };

/**
 * Initial state
 */
const initialState: TableState = {
  page: 1,
  pageSize: 10,
  sort: undefined,
  filters: [],
  search: '',
  selectedRows: [],
};

/**
 * Table reducer
 */
const tableReducer = (state: TableState, action: TableAction): TableState => {
  switch (action.type) {
    case 'SET_PAGE':
      return { ...state, page: action.payload };

    case 'SET_PAGE_SIZE':
      return { ...state, pageSize: action.payload, page: 1 };

    case 'SET_SORT':
      return { ...state, sort: action.payload, page: 1 };

    case 'ADD_FILTER':
      return {
        ...state,
        filters: [...state.filters, action.payload],
        page: 1,
      };

    case 'REMOVE_FILTER':
      return {
        ...state,
        filters: state.filters.filter((f) => f.field !== action.payload),
        page: 1,
      };

    case 'CLEAR_FILTERS':
      return { ...state, filters: [], page: 1 };

    case 'SET_SEARCH':
      return { ...state, search: action.payload, page: 1 };

    case 'SELECT_ROW':
      return {
        ...state,
        selectedRows: [...state.selectedRows, action.payload],
      };

    case 'DESELECT_ROW':
      return {
        ...state,
        selectedRows: state.selectedRows.filter((id) => id !== action.payload),
      };

    case 'SELECT_ALL':
      return { ...state, selectedRows: action.payload };

    case 'CLEAR_SELECTION':
      return { ...state, selectedRows: [] };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
};

/**
 * Table Context
 */
interface TableContextValue {
  state: TableState;
  dispatch: React.Dispatch<TableAction>;
  // Helper methods
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setSort: (sort: TableSort | undefined) => void;
  addFilter: (filter: TableFilter) => void;
  removeFilter: (field: string) => void;
  clearFilters: () => void;
  setSearch: (search: string) => void;
  selectRow: (id: string) => void;
  deselectRow: (id: string) => void;
  selectAll: (ids: string[]) => void;
  clearSelection: () => void;
  reset: () => void;
  isRowSelected: (id: string) => boolean;
}

const TableContext = createContext<TableContextValue | undefined>(undefined);

/**
 * Table Provider
 */
interface TableProviderProps {
  children: ReactNode;
  initialState?: Partial<TableState>;
}

export const TableProvider: React.FC<TableProviderProps> = ({ children, initialState: customInitialState }) => {
  const [state, dispatch] = useReducer(tableReducer, {
    ...initialState,
    ...customInitialState,
  });

  // Helper methods
  const setPage = (page: number) => dispatch({ type: 'SET_PAGE', payload: page });
  const setPageSize = (size: number) => dispatch({ type: 'SET_PAGE_SIZE', payload: size });
  const setSort = (sort: TableSort | undefined) => dispatch({ type: 'SET_SORT', payload: sort });
  const addFilter = (filter: TableFilter) => dispatch({ type: 'ADD_FILTER', payload: filter });
  const removeFilter = (field: string) => dispatch({ type: 'REMOVE_FILTER', payload: field });
  const clearFilters = () => dispatch({ type: 'CLEAR_FILTERS' });
  const setSearch = (search: string) => dispatch({ type: 'SET_SEARCH', payload: search });
  const selectRow = (id: string) => dispatch({ type: 'SELECT_ROW', payload: id });
  const deselectRow = (id: string) => dispatch({ type: 'DESELECT_ROW', payload: id });
  const selectAll = (ids: string[]) => dispatch({ type: 'SELECT_ALL', payload: ids });
  const clearSelection = () => dispatch({ type: 'CLEAR_SELECTION' });
  const reset = () => dispatch({ type: 'RESET' });
  const isRowSelected = (id: string) => state.selectedRows.includes(id);

  const value: TableContextValue = {
    state,
    dispatch,
    setPage,
    setPageSize,
    setSort,
    addFilter,
    removeFilter,
    clearFilters,
    setSearch,
    selectRow,
    deselectRow,
    selectAll,
    clearSelection,
    reset,
    isRowSelected,
  };

  return <TableContext.Provider value={value}>{children}</TableContext.Provider>;
};

/**
 * Hook to use Table Context
 */
export const useTableContext = (): TableContextValue => {
  const context = useContext(TableContext);

  if (!context) {
    throw new Error('useTableContext must be used within TableProvider');
  }

  return context;
};
