/**
 * Tests: Mock Table API
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fetchTableData, fetchTableRow, updateTableRow, deleteTableRow } from '../tables';
import { TableQuery } from '../../../schemas/table.schema';

// Mock fetch
global.fetch = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Mock Table API', () => {
  describe('fetchTableData', () => {
    it('should fetch table data successfully', async () => {
      const mockData = {
        rows: [
          {
            id: '550e8400-e29b-41d4-a716-446655440001',
            name: 'Test Component',
            status: 'active' as const,
            category: 'Buttons',
            value: 100,
            date: '2024-01-15T10:30:00Z',
            tags: ['test'],
          },
        ],
      };

      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const query: TableQuery = {
        page: 1,
        pageSize: 10,
      };

      const result = await fetchTableData(query);

      expect(result).toHaveProperty('rows');
      expect(result).toHaveProperty('total');
      expect(result).toHaveProperty('page', 1);
      expect(result).toHaveProperty('pageSize', 10);
    });

    it('should apply search filter', async () => {
      const mockData = {
        rows: [
          {
            id: '550e8400-e29b-41d4-a716-446655440001',
            name: 'Button Component',
            status: 'active' as const,
            category: 'Buttons',
            value: 100,
            date: '2024-01-15T10:30:00Z',
          },
          {
            id: '550e8400-e29b-41d4-a716-446655440002',
            name: 'Card Component',
            status: 'active' as const,
            category: 'Cards',
            value: 200,
            date: '2024-01-15T10:30:00Z',
          },
        ],
      };

      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const query: TableQuery = {
        page: 1,
        pageSize: 10,
        search: 'button',
      };

      const result = await fetchTableData(query);

      expect(result.rows.length).toBe(1);
      expect(result.rows[0].name).toContain('Button');
    });

    it('should apply sorting', async () => {
      const mockData = {
        rows: [
          {
            id: '1',
            name: 'A Component',
            status: 'active' as const,
            category: 'Test',
            value: 200,
            date: '2024-01-15T10:30:00Z',
          },
          {
            id: '2',
            name: 'B Component',
            status: 'active' as const,
            category: 'Test',
            value: 100,
            date: '2024-01-15T10:30:00Z',
          },
        ],
      };

      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const query: TableQuery = {
        page: 1,
        pageSize: 10,
        sort: { field: 'value', direction: 'asc' },
      };

      const result = await fetchTableData(query);

      expect(result.rows[0].value).toBeLessThan(result.rows[1].value);
    });
  });

  describe('fetchTableRow', () => {
    it('should fetch single row by ID', async () => {
      const mockData = {
        rows: [
          {
            id: 'test-id',
            name: 'Test Component',
            status: 'active' as const,
            category: 'Test',
            value: 100,
            date: '2024-01-15T10:30:00Z',
          },
        ],
      };

      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await fetchTableRow('test-id');

      expect(result.id).toBe('test-id');
    });

    it('should throw error if row not found', async () => {
      const mockData = { rows: [] };

      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      await expect(fetchTableRow('non-existent')).rejects.toThrow();
    });
  });

  describe('updateTableRow', () => {
    it('should update row successfully', async () => {
      const mockData = {
        rows: [
          {
            id: 'test-id',
            name: 'Original Name',
            status: 'active' as const,
            category: 'Test',
            value: 100,
            date: '2024-01-15T10:30:00Z',
          },
        ],
      };

      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
        ok: true,
        json: async () => mockData,
      });

      const result = await updateTableRow('test-id', { name: 'Updated Name' });

      expect(result.name).toBe('Updated Name');
    });
  });

  describe('deleteTableRow', () => {
    it('should delete row successfully', async () => {
      const mockData = {
        rows: [
          {
            id: 'test-id',
            name: 'Test',
            status: 'active' as const,
            category: 'Test',
            value: 100,
            date: '2024-01-15T10:30:00Z',
          },
        ],
      };

      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
        ok: true,
        json: async () => mockData,
      });

      await expect(deleteTableRow('test-id')).resolves.not.toThrow();
    });
  });
});
