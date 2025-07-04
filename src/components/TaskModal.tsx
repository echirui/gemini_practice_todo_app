import React, { useState } from 'react';

interface TaskModalProps {
  onClose: () => void;
  onSave: (title: string, content: string) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSave = () => {
    if (title.trim()) {
      onSave(title, content);
      onClose();
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.7)', // Darker overlay
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000 // Ensure modal is on top
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.15)', // More transparent white
        padding: '30px',
        borderRadius: '15px', // More rounded corners
        width: '90%',
        maxWidth: '400px',
        boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )', // Glass-like shadow
        backdropFilter: 'blur(10px)', // Glass-like blur
        WebkitBackdropFilter: 'blur(10px)', // For Safari
        border: '1px solid rgba(255, 255, 255, 0.18)', // Subtle border
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        boxSizing: 'border-box'
      }}>
        <h2 style={{ margin: '0 0 10px 0', color: 'white' }}>Add Task</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.3)', // Lighter border
            backgroundColor: 'rgba(255, 255, 255, 0.2)', // Transparent background
            color: 'white', // White text
            boxSizing: 'border-box',
            fontSize: '16px'
          }}
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content (optional)"
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.3)', // Lighter border
            backgroundColor: 'rgba(255, 255, 255, 0.2)', // Transparent background
            color: 'white', // White text
            boxSizing: 'border-box',
            minHeight: '120px',
            fontSize: '16px',
            resize: 'vertical'
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: 'rgba(255, 255, 255, 0.3)', // Transparent background
              cursor: 'pointer',
              fontSize: '16px',
              color: 'white' // White text
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
