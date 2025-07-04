import React from 'react';
import { Todo } from '../types/todo';

interface TodoListProps {
  todos: Todo[];
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
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
  );
};

export default TodoList;
