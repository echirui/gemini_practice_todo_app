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
        <button onClick={() => onDelete(todo.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#dc3545' }} aria-label="Delete task">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
        </button>
      </div>
      {isOpen && todo.content && (
        <div style={{ marginTop: '10px', padding: '10px', backgroundColor: 'rgba(255, 255, 255, 0.15)', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <p style={{ color: 'white' }}>{todo.content}</p>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
