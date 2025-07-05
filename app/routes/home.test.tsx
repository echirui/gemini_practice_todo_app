import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Home from './home';
import type { Todo } from '~/types/todo';

const mockTodos: Todo[] = [
  { id: 1, title: 'Active Task', content: '', completed: false, createdAt: new Date().toISOString(), due_date: null },
  { id: 2, title: 'Completed Task', content: '', completed: true, createdAt: new Date().toISOString(), due_date: null },
  { id: 3, title: 'Another Active Task', content: '', completed: false, createdAt: new Date().toISOString(), due_date: null },
];

describe('Home component tab integration', () => {

  beforeEach(() => {
    // Mock the global fetch API
    global.fetch = vi.fn((url) => {
      if (url === '/api/tasks') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockTodos),
        });
      }
      // Mock other API calls if necessary
      return Promise.resolve({ ok: true, json: () => Promise.resolve([]) });
    }) as any;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should filter tasks correctly when different tabs are clicked', async () => {
    render(<Home />);

    // Wait for the initial tasks to be loaded and displayed
    await waitFor(() => {
      expect(screen.getByText('Active Task')).toBeInTheDocument();
      expect(screen.getByText('Completed Task')).toBeInTheDocument();
    });

    // 1. "All" tab (initial state)
    expect(screen.getByText('Active Task')).toBeInTheDocument();
    expect(screen.getByText('Completed Task')).toBeInTheDocument();
    expect(screen.getByText('Another Active Task')).toBeInTheDocument();

    // 2. Click "Active" tab
    fireEvent.click(screen.getByRole('button', { name: 'Active' }));

    await waitFor(() => {
      expect(screen.getByText('Active Task')).toBeInTheDocument();
      expect(screen.queryByText('Completed Task')).not.toBeInTheDocument();
      expect(screen.getByText('Another Active Task')).toBeInTheDocument();
    });

    // 3. Click "Completed" tab
    fireEvent.click(screen.getByRole('button', { name: 'Completed' }));

    await waitFor(() => {
      expect(screen.queryByText('Active Task')).not.toBeInTheDocument();
      expect(screen.getByText('Completed Task')).toBeInTheDocument();
      expect(screen.queryByText('Another Active Task')).not.toBeInTheDocument();
    });

    // 4. Click "All" tab again
    fireEvent.click(screen.getByRole('button', { name: 'All' }));

    await waitFor(() => {
      expect(screen.getByText('Active Task')).toBeInTheDocument();
      expect(screen.getByText('Completed Task')).toBeInTheDocument();
      expect(screen.getByText('Another Active Task')).toBeInTheDocument();
    });
  });
});
