import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TodoList from './TodoList';
import type { Todo } from '../types/todo';

describe('TodoList', () => {
  const mockOnUpdateTask = vi.fn();
  const mockOnDeleteTask = vi.fn();
  const mockOnAddTask = vi.fn();

  const todos: Todo[] = [
    { id: 1, title: 'Todo 1', content: '', completed: false, createdAt: new Date().toISOString(), due_date: null },
    { id: 2, title: 'Todo 2', content: 'content', completed: true, createdAt: new Date().toISOString(), due_date: null },
  ];

  it('renders multiple todo items', () => {
    render(<TodoList tasks={todos} onUpdateTask={mockOnUpdateTask} onDeleteTask={mockOnDeleteTask} onAddTask={mockOnAddTask} />);

    expect(screen.getByText('Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Todo 2')).toBeInTheDocument();
  });

  it('displays todo title and completed status', () => {
    render(<TodoList tasks={todos} onUpdateTask={mockOnUpdateTask} onDeleteTask={mockOnDeleteTask} onAddTask={mockOnAddTask} />);

    const todo1Elements = screen.getAllByText('Todo 1');
    const todo1 = todo1Elements[0];
    expect(todo1).toBeInTheDocument();

    const todo2Elements = screen.getAllByText('Todo 2');
    const todo2 = todo2Elements[0];
    expect(todo2).toBeInTheDocument();
  });

  describe('user flow for adding a task', () => {
    it('opens TaskModal when the add button is clicked', () => {
      render(<TodoList tasks={[]} onUpdateTask={mockOnUpdateTask} onDeleteTask={mockOnDeleteTask} onAddTask={mockOnAddTask} />);
      
      expect(screen.queryByPlaceholderText('Title')).not.toBeInTheDocument();

      const addButton = screen.getByRole('button', { name: 'Add Task' });
      fireEvent.click(addButton);

      expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
    });

    it('calls onAddTask and closes the modal when a task is saved', () => {
      render(<TodoList tasks={[]} onUpdateTask={mockOnUpdateTask} onDeleteTask={mockOnDeleteTask} onAddTask={mockOnAddTask} />);
      
      const addButton = screen.getByRole('button', { name: 'Add Task' });
      fireEvent.click(addButton);
      
      fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'New Task from Flow' } });
      fireEvent.change(screen.getByPlaceholderText('Content (optional)'), { target: { value: 'Flow content' } });
      fireEvent.change(screen.getByLabelText('Due Date'), { target: { value: '2025-07-15' } });
      fireEvent.change(screen.getByLabelText('Priority'), { target: { value: 'high' } });
      
      fireEvent.click(screen.getByRole('button', { name: 'Save' }));

      expect(mockOnAddTask).toHaveBeenCalledTimes(1);
      expect(mockOnAddTask).toHaveBeenCalledWith('New Task from Flow', 'Flow content', '2025-07-15', 'high');

      expect(screen.queryByPlaceholderText('Title')).not.toBeInTheDocument();
    });
  });
});
