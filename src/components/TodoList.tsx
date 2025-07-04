import React, { useState } from 'react';
import type { Todo } from '../types/todo';

interface TodoListProps {
  todos: Todo[];
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'completed'>('all');

  const filteredTodos = todos.filter(todo => {
    if (activeTab === 'pending') {
      return !todo.completed;
    }
    if (activeTab === 'completed') {
      return todo.completed;
    }
    return true; // 'all' tab
  });

  return (
    <div className="todo-container">
      <div className="tabs">
        <button
          className={activeTab === 'all' ? 'active' : ''}
          onClick={() => setActiveTab('all')}
        >
          すべて
        </button>
        <button
          className={activeTab === 'pending' ? 'active' : ''}
          onClick={() => setActiveTab('pending')}
        >
          未実施
        </button>
        <button
          className={activeTab === 'completed' ? 'active' : ''}
          onClick={() => setActiveTab('completed')}
        >
          実施済み
        </button>
      </div>
      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={todo.completed}
              readOnly
              aria-label={todo.title}
            />
            <span>{todo.title}</span>
          </li>
        ))}
      </ul>
      <button className="add-todo-button">+</button>
    </div>
  );
};

export default TodoList;
