import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TodoList from './TodoList';
import { Todo } from '../types/todo';

describe('TodoList', () => {
  it('renders multiple todo items', () => {
    const todos: Todo[] = [
      { id: '1', title: 'Todo 1', completed: false },
      { id: '2', title: 'Todo 2', completed: true },
    ];

    render(<TodoList todos={todos} />);

    expect(screen.getByText('Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Todo 2')).toBeInTheDocument();
  });

  it('displays todo title and completed status', () => {
    const todos: Todo[] = [
      { id: '1', title: 'Buy groceries', completed: false },
      { id: '2', title: 'Walk the dog', completed: true },
    ];

    render(<TodoList todos={todos} />);

    const buyGroceries = screen.getByText('Buy groceries');
    expect(buyGroceries).toBeInTheDocument();
    expect(buyGroceries.closest('li')).not.toHaveClass('completed');

    const walkTheDog = screen.getByText('Walk the dog');
    expect(walkTheDog).toBeInTheDocument();
    expect(walkTheDog.closest('li')).toHaveClass('completed');

    const checkbox1 = screen.getByRole('checkbox', { name: 'Buy groceries' });
    expect(checkbox1).not.toBeChecked();

    const checkbox2 = screen.getByRole('checkbox', { name: 'Walk the dog' });
    expect(checkbox2).toBeChecked();
  });
});
