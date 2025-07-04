import React, { useState } from 'react';
import type { Todo } from '~/types/todo';

interface TaskItemProps {
  todo: Todo;
  onToggle: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ todo, onToggle, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div data-testid="task-item-container" style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', opacity: todo.completed ? 0.5 : 1, transition: 'opacity 0.5s' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div onClick={() => todo.content && setIsOpen(!isOpen)} style={{ cursor: todo.content ? 'pointer' : 'default' }}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={(e) => {
              e.stopPropagation();
              onToggle(todo.id, e.target.checked);
            }}
            style={{ marginRight: '10px' }}
          />
          <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.title}
          </span>
        </div>
        <button onClick={() => onDelete(todo.id)}>Delete</button>
      </div>
      {isOpen && todo.content && (
        <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f9f9f9' }}>
          <p>{todo.content}</p>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
