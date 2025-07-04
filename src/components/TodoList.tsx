import React from 'react';
import type { Todo } from '../types/todo';
import TaskItem from './TaskItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete }) => {
  return (
    <div style={{ width: '100%', maxWidth: '500px' }}>
      {todos.map((todo) => (
        <TaskItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default TodoList;