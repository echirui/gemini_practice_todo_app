import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TodoList from './TodoList';
import type { Todo } from '../types/todo';

describe('TodoList', () => {
  const mockOnToggle = vi.fn();
  const mockOnDelete = vi.fn();
  const mockOnAddTask = vi.fn();

  const todos: Todo[] = [
    { id: 1, title: 'Todo 1', content: '', completed: false, createdAt: new Date().toISOString() },
    { id: 2, title: 'Todo 2', content: 'content', completed: true, createdAt: new Date().toISOString() },
  ];

  it('renders multiple todo items', () => {
    render(<TodoList todos={todos} onToggle={mockOnToggle} onDelete={mockOnDelete} onAddTask={mockOnAddTask} />);

    expect(screen.getByText('Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Todo 2')).toBeInTheDocument();
  });

  it('displays todo title and completed status', () => {
    render(<TodoList todos={todos} onToggle={mockOnToggle} onDelete={mockOnDelete} onAddTask={mockOnAddTask} />);

    const todo1Elements = screen.getAllByText('Todo 1');
    const todo1 = todo1Elements[0];
    expect(todo1).toBeInTheDocument();
    expect(todo1.closest('div[style*="opacity: 1"]')).toBeInTheDocument();

    const todo2Elements = screen.getAllByText('Todo 2');
        const todo2 = todo2Elements[0];
    expect(todo2).toBeInTheDocument();
    expect(todo2.closest('div[style*="opacity: 0.5"]')).toBeInTheDocument();
  });

  describe('user flow for adding a task', () => {
    it('opens TaskModal when the add button is clicked', () => {
      render(<TodoList todos={[]} onToggle={mockOnToggle} onDelete={mockOnDelete} onAddTask={mockOnAddTask} />);
      
      // Initially, the modal should not be visible
      expect(screen.queryByText('Add Task')).not.toBeInTheDocument();

      // Click the add button
      const addButton = screen.getByRole('button', { name: '+' });
      fireEvent.click(addButton);

      // Now the modal should be visible
      expect(screen.getByText('Add Task')).toBeInTheDocument();
    });

    it('calls onAddTask and closes the modal when a task is saved', () => {
      render(<TodoList todos={[]} onToggle={mockOnToggle} onDelete={mockOnDelete} onAddTask={mockOnAddTask} />);
      
      // Open the modal
      fireEvent.click(screen.getByRole('button', { name: '+' }));
      
      // Fill out the form
      fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'New Task from Flow' } });
      fireEvent.change(screen.getByPlaceholderText('Content (optional)'), { target: { value: 'Flow content' } });
      
      // Save the task
      fireEvent.click(screen.getByRole('button', { name: 'Save' }));

      // Check if onAddTask was called correctly
      expect(mockOnAddTask).toHaveBeenCalledTimes(1);
      expect(mockOnAddTask).toHaveBeenCalledWith('New Task from Flow', 'Flow content', null);

      // The modal should be closed after saving
      expect(screen.queryByText('Add Task')).not.toBeInTheDocument();
    });
  });
});
