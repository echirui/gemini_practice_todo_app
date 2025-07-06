import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import TaskModal from './TaskModal';

describe('TaskModal', () => {
  const mockOnClose = vi.fn();
  const mockOnSave = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    // cleanup is handled globally in vitest.setup.ts
  });

  it('renders correctly with title and content inputs', () => {
    render(<TaskModal onClose={mockOnClose} onSave={mockOnSave} />);

    expect(screen.getByText('Add Task')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Content (optional)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('updates title and content on input change', () => {
    render(<TaskModal onClose={mockOnClose} onSave={mockOnSave} />);

    const titleInput = screen.getByPlaceholderText('Title');
    const contentInput = screen.getByPlaceholderText('Content (optional)');

    fireEvent.change(titleInput, { target: { value: 'New Task Title' } });
    fireEvent.change(contentInput, { target: { value: 'New Task Content' } });

    expect(titleInput).toHaveValue('New Task Title');
    expect(contentInput).toHaveValue('New Task Content');
  });

  it('calls onClose when Cancel button is clicked', () => {
    render(<TaskModal onClose={mockOnClose} onSave={mockOnSave} />);

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onSave and onClose with title and content when Save button is clicked and title is not empty', () => {
    render(<TaskModal onClose={mockOnClose} onSave={mockOnSave} />);

    const titleInput = screen.getByPlaceholderText('Title');
    const contentInput = screen.getByPlaceholderText('Content (optional)');
    const saveButton = screen.getByRole('button', { name: 'Save' });

    fireEvent.change(titleInput, { target: { value: 'Task to Save' } });
    fireEvent.change(contentInput, { target: { value: 'Content to Save' } });
    fireEvent.click(saveButton);

    expect(mockOnSave).toHaveBeenCalledTimes(1);
    expect(mockOnSave).toHaveBeenCalledWith('Task to Save', 'Content to Save', null);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onSave or onClose if Save button is clicked with empty title', () => {
    render(<TaskModal onClose={mockOnClose} onSave={mockOnSave} />);

    const saveButton = screen.getByRole('button', { name: 'Save' });

    fireEvent.click(saveButton);

    expect(mockOnSave).not.toHaveBeenCalled();
        expect(mockOnClose).not.toHaveBeenCalled();
  });

  describe('with due_date', () => {
    it('allows entering a due date', () => {
      render(<TaskModal onClose={mockOnClose} onSave={mockOnSave} />);
      const dueDateInput = screen.getByLabelText('Due Date');
      fireEvent.change(dueDateInput, { target: { value: '2025-12-31' } });
      expect(dueDateInput).toHaveValue('2025-12-31');
    });

    it('calls onSave with title, content, and due_date when Save is clicked', () => {
      render(<TaskModal onClose={mockOnClose} onSave={mockOnSave} />);
      
      fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Task with Due Date' } });
      fireEvent.change(screen.getByPlaceholderText('Content (optional)'), { target: { value: 'Content here' } });
      fireEvent.change(screen.getByLabelText('Due Date'), { target: { value: '2025-12-31' } });
      
      fireEvent.click(screen.getByRole('button', { name: 'Save' }));

      // Check if onSave was called with the correct arguments
      // Note: The exact time might vary, so we check for the date part.
      const expectedDate = new Date('2025-12-31').toISOString();
      expect(mockOnSave).toHaveBeenCalledWith('Task with Due Date', 'Content here', expectedDate);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('in edit mode', () => {
    const existingTask = {
      id: 1,
      title: 'Existing Task',
      content: 'Existing Content',
      completed: false,
      createdAt: new Date().toISOString(),
      due_date: new Date('2025-11-20').toISOString(),
    };

    it('populates fields with existing task data', () => {
      render(<TaskModal onClose={mockOnClose} onSave={mockOnSave} task={existingTask} />);
      
      expect(screen.getByPlaceholderText('Title')).toHaveValue('Existing Task');
      expect(screen.getByPlaceholderText('Content (optional)')).toHaveValue('Existing Content');
      expect(screen.getByLabelText('Due Date')).toHaveValue('2025-11-20');
    });
  });
});
