import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import TaskItem from './TaskItem';
import type { Todo } from '../types/todo';

describe('TaskItem', () => {
  const mockOnToggle = vi.fn();
  const mockOnDelete = vi.fn();

  const baseTodo: Todo = {
    id: 1,
    title: 'Test Todo',
    content: '',
    completed: false,
    createdAt: new Date().toISOString(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(cleanup);

  it('renders todo title and checkbox', () => {
    render(<TaskItem todo={baseTodo} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Delete task' })).toBeInTheDocument();
  });

  it('calls onToggle when checkbox is clicked', () => {
    render(<TaskItem todo={baseTodo} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

    fireEvent.click(screen.getByRole('checkbox'));
    expect(mockOnToggle).toHaveBeenCalledTimes(1);
    expect(mockOnToggle).toHaveBeenCalledWith(baseTodo.id, true);
  });

  it('calls onDelete when Delete button is clicked', () => {
    render(<TaskItem todo={baseTodo} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

    fireEvent.click(screen.getByRole('button', { name: 'Delete task' }));
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith(baseTodo.id);
  });

  it('displays content when todo has content and title area is clicked', () => {
    const todoWithContent = { ...baseTodo, content: 'Detailed content here' };
    render(<TaskItem todo={todoWithContent} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

    expect(screen.queryByText('Detailed content here')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Test Todo'));
    expect(screen.getByText('Detailed content here')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Test Todo'));
    expect(screen.queryByText('Detailed content here')).not.toBeInTheDocument();
  });

  it('does not display content area if todo has no content', () => {
    render(<TaskItem todo={baseTodo} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

    fireEvent.click(screen.getByText('Test Todo'));
    expect(screen.queryByText('Detailed content here')).not.toBeInTheDocument();
  });

  it('applies line-through style when todo is completed', () => {
    const completedTodo = { ...baseTodo, completed: true };
    render(<TaskItem todo={completedTodo} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

    expect(screen.getByText('Test Todo')).toHaveStyle('text-decoration: line-through');
  });

  it('applies opacity style based on completed status', () => {
    const completedTodo = { ...baseTodo, completed: true };
    const { rerender } = render(<TaskItem todo={baseTodo} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

    expect(screen.getByTestId('task-item-container')).toHaveStyle('opacity: 1');
    expect(screen.getByTestId('task-item-container')).toHaveStyle('transition: opacity 0.5s');

    rerender(<TaskItem todo={completedTodo} onToggle={mockOnToggle} onDelete={mockOnDelete} />);
    expect(screen.getByTestId('task-item-container')).toHaveStyle('opacity: 0.5');
    expect(screen.getByTestId('task-item-container')).toHaveStyle('transition: opacity 0.5s');
  });

  describe('due_date display', () => {
    it('displays remaining days when due_date is in the future', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 3);
      const todoWithDueDate = { ...baseTodo, due_date: futureDate.toISOString() };
      render(<TaskItem todo={todoWithDueDate} onToggle={mockOnToggle} onDelete={mockOnDelete} />);
      expect(screen.getByText('3 days left')).toBeInTheDocument();
    });

    it('displays "Overdue" when due_date is in the past', () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);
      const todoWithDueDate = { ...baseTodo, due_date: pastDate.toISOString() };
      render(<TaskItem todo={todoWithDueDate} onToggle={mockOnToggle} onDelete={mockOnDelete} />);
      expect(screen.getByText('Overdue')).toBeInTheDocument();
    });

    it('does not display due date info when due_date is null', () => {
      render(<TaskItem todo={baseTodo} onToggle={mockOnToggle} onDelete={mockOnDelete} />);
      expect(screen.queryByText(/days left/)).not.toBeInTheDocument();
      expect(screen.queryByText('Overdue')).not.toBeInTheDocument();
    });
  });
});
