/**
 * Tests: Data Helper Utilities
 */

import { describe, it, expect } from 'vitest';
import {
  formatFileSize,
  formatDate,
  formatNumber,
  formatPercentage,
  deepClone,
  groupBy,
  sortBy,
  unique,
  searchArray,
  calculatePagination,
  truncate,
} from '../dataHelpers';

describe('Data Helper Utilities', () => {
  describe('formatFileSize', () => {
    it('should format bytes correctly', () => {
      expect(formatFileSize(0)).toBe('0 Bytes');
      expect(formatFileSize(1024)).toBe('1 KB');
      expect(formatFileSize(1048576)).toBe('1 MB');
      expect(formatFileSize(1073741824)).toBe('1 GB');
    });
  });

  describe('formatDate', () => {
    it('should format date in short format', () => {
      const date = new Date('2024-01-15T10:30:00Z');
      const result = formatDate(date, 'short');
      expect(result).toContain('2024');
    });
  });

  describe('formatNumber', () => {
    it('should format number with thousands separator', () => {
      expect(formatNumber(1000)).toBe('1,000');
      expect(formatNumber(1000000)).toBe('1,000,000');
      expect(formatNumber(1234.56, 2)).toBe('1,234.56');
    });
  });

  describe('formatPercentage', () => {
    it('should format percentage correctly', () => {
      expect(formatPercentage(25.5)).toBe('25.5%');
      expect(formatPercentage(100, 0)).toBe('100%');
    });
  });

  describe('deepClone', () => {
    it('should deep clone object', () => {
      const obj = { a: 1, b: { c: 2 } };
      const cloned = deepClone(obj);

      expect(cloned).toEqual(obj);
      expect(cloned).not.toBe(obj);
      expect(cloned.b).not.toBe(obj.b);
    });

    it('should clone array', () => {
      const arr = [1, 2, [3, 4]];
      const cloned = deepClone(arr);

      expect(cloned).toEqual(arr);
      expect(cloned).not.toBe(arr);
    });
  });

  describe('groupBy', () => {
    it('should group array by key', () => {
      const items = [
        { id: 1, category: 'A' },
        { id: 2, category: 'B' },
        { id: 3, category: 'A' },
      ];

      const grouped = groupBy(items, 'category');

      expect(grouped.A).toHaveLength(2);
      expect(grouped.B).toHaveLength(1);
    });
  });

  describe('sortBy', () => {
    it('should sort array by key ascending', () => {
      const items = [{ value: 3 }, { value: 1 }, { value: 2 }];
      const sorted = sortBy(items, 'value', 'asc');

      expect(sorted[0].value).toBe(1);
      expect(sorted[2].value).toBe(3);
    });

    it('should sort array by key descending', () => {
      const items = [{ value: 1 }, { value: 3 }, { value: 2 }];
      const sorted = sortBy(items, 'value', 'desc');

      expect(sorted[0].value).toBe(3);
      expect(sorted[2].value).toBe(1);
    });
  });

  describe('unique', () => {
    it('should remove duplicates from primitive array', () => {
      const arr = [1, 2, 2, 3, 3, 3];
      const result = unique(arr);

      expect(result).toEqual([1, 2, 3]);
    });

    it('should remove duplicates by key', () => {
      const items = [
        { id: 1, name: 'A' },
        { id: 2, name: 'B' },
        { id: 1, name: 'C' },
      ];

      const result = unique(items, 'id');

      expect(result).toHaveLength(2);
    });
  });

  describe('searchArray', () => {
    it('should filter array by search query', () => {
      const items = [
        { id: 1, name: 'Apple', category: 'Fruit' },
        { id: 2, name: 'Banana', category: 'Fruit' },
        { id: 3, name: 'Carrot', category: 'Vegetable' },
      ];

      const result = searchArray(items, 'app', ['name', 'category']);

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Apple');
    });
  });

  describe('calculatePagination', () => {
    it('should calculate pagination info', () => {
      const result = calculatePagination(2, 10, 25);

      expect(result.page).toBe(2);
      expect(result.pageSize).toBe(10);
      expect(result.totalItems).toBe(25);
      expect(result.totalPages).toBe(3);
      expect(result.startIndex).toBe(10);
      expect(result.endIndex).toBe(20);
      expect(result.hasNext).toBe(true);
      expect(result.hasPrev).toBe(true);
    });
  });

  describe('truncate', () => {
    it('should truncate text', () => {
      const text = 'This is a long text';
      const result = truncate(text, 10);

      expect(result).toBe('This is...');
    });

    it('should not truncate if text is shorter', () => {
      const text = 'Short';
      const result = truncate(text, 10);

      expect(result).toBe('Short');
    });
  });
});
