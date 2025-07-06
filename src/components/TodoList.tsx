import React, { useState } from 'react';
import type { Todo } from '../types/todo';
import TaskItem from './TaskItem';
import TaskModal from './TaskModal';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
  onAddTask: (title: string, content: string, due_date?: string | null) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete, onAddTask }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveTask = (title: string, content: string, due_date?: string | null) => {
    onAddTask(title, content, due_date);
    setIsModalOpen(false);
  };

  return (
    <div className="todo-list-container">
      {todos.map((todo) => (
        <TaskItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
      ))}
      <button
        onClick={() => setIsModalOpen(true)}
        className="add-todo-button"
      >
        +
      </button>
      {isModalOpen && (
        <TaskModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveTask}
        />
      )}
    </div>
  );
};

export default TodoList;