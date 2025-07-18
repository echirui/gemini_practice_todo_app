import React, { useState } from 'react';
import TaskItem from './TaskItem';
import TaskModal from './TaskModal';
import AddTaskButton from './AddTaskButton';
import type { Todo } from '../types/todo';

interface TodoListProps {
  tasks: Todo[];
  onUpdateTask: (task: Todo) => void;
  onDeleteTask: (id: number) => void;
  onAddTask: (title: string, content: string, dueDate: string | null, priority: 'high' | 'medium' | 'low') => void;
}

const TodoList: React.FC<TodoListProps> = ({ tasks, onUpdateTask, onDeleteTask, onAddTask }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTask = (title: string, content: string, dueDate: string | null, priority: 'high' | 'medium' | 'low') => {
    onAddTask(title, content, dueDate, priority);
    setIsModalOpen(false);
  };

  const handleToggle = (id: number, completed: boolean) => {
    const taskToUpdate = tasks.find(t => t.id === id);
    if (taskToUpdate) {
      onUpdateTask({ ...taskToUpdate, completed });
    }
  };

  return (
    <div className="todo-list-container">
      {tasks.map((todo) => (
        <TaskItem key={todo.id} todo={todo} onToggle={handleToggle} onDelete={onDeleteTask} />
      ))}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <AddTaskButton onClick={() => setIsModalOpen(true)} />
      </div>
      {isModalOpen && (
        <TaskModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddTask}
        />
      )}
    </div>
  );
};

export default TodoList;
