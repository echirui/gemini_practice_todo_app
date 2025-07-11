import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import TaskModal from './TaskModal';
import type { Todo } from '~/types/todo';

describe('TaskModal', () => {
  const mockOnClose = vi.fn();
  const mockOnSave = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with title, content, and due date inputs', () => {
    render(<TaskModal onClose={mockOnClose} onSave={mockOnSave} />);

    expect(screen.getByText('Add Task')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Content (optional)')).toBeInTheDocument();
    expect(screen.getByLabelText('Due Date')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('updates title, content, and due date on input change', () => {
    render(<TaskModal onClose={mockOnClose} onSave={mockOnSave} />);

    const titleInput = screen.getByPlaceholderText('Title');
    const contentInput = screen.getByPlaceholderText('Content (optional)');
    const dueDateInput = screen.getByLabelText('Due Date');

    fireEvent.change(titleInput, { target: { value: 'New Task Title' } });
    fireEvent.change(contentInput, { target: { value: 'New Task Content' } });
    fireEvent.change(dueDateInput, { target: { value: '2025-12-31' } });

    expect(titleInput).toHaveValue('New Task Title');
    expect(contentInput).toHaveValue('New Task Content');
    expect(dueDateInput).toHaveValue('2025-12-31');
  });

  it('calls onClose when Cancel button is clicked', () => {
    render(<TaskModal onClose={mockOnClose} onSave={mockOnSave} />);
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onSave with title and content (and null due date) when Save is clicked', () => {
    render(<TaskModal onClose={mockOnClose} onSave={mockOnSave} />);

    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Task to Save' } });
    fireEvent.change(screen.getByPlaceholderText('Content (optional)'), { target: { value: 'Content to Save' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(mockOnSave).toHaveBeenCalledTimes(1);
    expect(mockOnSave).toHaveBeenCalledWith('Task to Save', 'Content to Save', null, 'medium');
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onSave with title, content, due_date, and priority when Save is clicked', () => {
    render(<TaskModal onClose={mockOnClose} onSave={mockOnSave} />);
    
    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Task with Due Date' } });
    fireEvent.change(screen.getByPlaceholderText('Content (optional)'), { target: { value: 'Content here' } });
    fireEvent.change(screen.getByLabelText('Due Date'), { target: { value: '2025-12-31' } });
    fireEvent.change(screen.getByLabelText('Priority'), { target: { value: 'high' } });
    
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(mockOnSave).toHaveBeenCalledWith('Task with Due Date', 'Content here', '2025-12-31', 'high');
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onSave or onClose if Save button is clicked with empty title', () => {
    render(<TaskModal onClose={mockOnClose} onSave={mockOnSave} />);
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(mockOnSave).not.toHaveBeenCalled();
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  describe('in edit mode', () => {
    const existingTask: Todo = {
      id: 1,
      title: 'Existing Task',
      content: 'Existing Content',
      completed: false,
      createdAt: new Date().toISOString(),
      due_date: new Date('2025-11-20T12:00:00Z').toISOString(),
      priority: 'low',
    };

    it('populates fields with existing task data', () => {
      render(<TaskModal onClose={mockOnClose} onSave={mockOnSave} task={existingTask} />);
      
      expect(screen.getByText('Edit Task')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Title')).toHaveValue('Existing Task');
      expect(screen.getByPlaceholderText('Content (optional)')).toHaveValue('Existing Content');
      expect(screen.getByLabelText('Due Date')).toHaveValue('2025-11-20');
      expect(screen.getByLabelText('Priority')).toHaveValue('low');
    });

    it('calls onSave with updated details', () => {
      render(<TaskModal onClose={mockOnClose} onSave={mockOnSave} task={existingTask} />);

      fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Updated Task' } });
      fireEvent.change(screen.getByLabelText('Due Date'), { target: { value: '2026-01-15' } });
      fireEvent.change(screen.getByLabelText('Priority'), { target: { value: 'high' } });
      fireEvent.click(screen.getByRole('button', { name: 'Save' }));

      expect(mockOnSave).toHaveBeenCalledWith('Updated Task', 'Existing Content', '2026-01-15', 'high');
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });
});
