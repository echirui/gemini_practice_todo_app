import React from 'react';
import { render, screen } from '@testing-library/react';
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
});
