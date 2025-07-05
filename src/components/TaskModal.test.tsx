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
    expect(mockOnSave).toHaveBeenCalledWith('Task to Save', 'Content to Save', '');
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onSave or onClose if Save button is clicked with empty title', () => {
    render(<TaskModal onClose={mockOnClose} onSave={mockOnSave} />);

    const saveButton = screen.getByRole('button', { name: 'Save' });

    fireEvent.click(saveButton);

    expect(mockOnSave).not.toHaveBeenCalled();
    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
