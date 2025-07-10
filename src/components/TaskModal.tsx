import React, { useState, useEffect } from 'react';
import type { Todo } from '~/types/todo';

interface TaskModalProps {
  onClose: () => void;
  onSave: (title: string, content: string, dueDate: string | null) => void;
  task?: Todo | null;
}

const TaskModal: React.FC<TaskModalProps> = ({ onClose, onSave, task }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [dueDate, setDueDate] = useState<string | null>(null);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setContent(task.content || '');
      setDueDate(task.due_date ? task.due_date.split('T')[0] : null);
    }
  }, [task]);

  const handleSave = () => {
    if (title.trim()) {
      onSave(title, content, dueDate);
      onClose();
    }
  };

  const commonInputStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    boxSizing: 'border-box' as const,
    fontSize: '16px',
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.15)',
        padding: '30px',
        borderRadius: '15px',
        width: '90%',
        maxWidth: '400px',
        boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        boxSizing: 'border-box'
      }}>
        <h2 style={{ margin: '0 0 10px 0', color: 'white' }}>{task ? 'Edit Task' : 'Add Task'}</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          style={commonInputStyle}
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content (optional)"
          style={{
            ...commonInputStyle,
            minHeight: '120px',
            resize: 'vertical'
          }}
        />
        <div>
          <label htmlFor="due-date" style={{ color: 'white', marginBottom: '5px', display: 'block' }}>Due Date</label>
          <input
            id="due-date"
            type="date"
            value={dueDate || ''}
            onChange={(e) => setDueDate(e.target.value || null)}
            style={commonInputStyle}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              cursor: 'pointer',
              fontSize: '16px',
              color: 'white'
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#007bff',
              color: 'white',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;

