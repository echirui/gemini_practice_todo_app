import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import type { Todo } from '~/types/todo';
import TaskModal from '~/components/TaskModal';

export default function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState<Todo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`/api/tasks/${id}`)
        .then(res => res.json() as Promise<Todo>)
        .then(data => setTask(data))
        .catch(error => console.error('Error fetching task:', error));
    }
  }, [id]);

<<<<<<< HEAD
  const handleUpdateTask = async (title: string, content: string, dueDate: string | null, priority: 'high' | 'medium' | 'low') => {
    if (!task) return;
    const updatedTask = { ...task, title, content, due_date: dueDate, priority };
    const response = await fetch(`/api/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask),
    });
    const newTask: Todo = await response.json();
    setTask(newTask);
    setIsModalOpen(false);
  };

  if (!task) {
    return <div>Loading task...</div>;
  }

  return (
    <div className="main-container">
      <h1>Task Detail</h1>
      <h2>{task.title}</h2>
      <p>{task.content}</p>
      {task.due_date && <p>Due: {new Date(task.due_date).toLocaleDateString()}</p>}
      <button onClick={() => setIsModalOpen(true)}>Edit Task</button>
      <button onClick={() => navigate('/tasks')}>Back to List</button>

      {isModalOpen && (
        <TaskModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleUpdateTask}
          task={task}
        />
      )}
    </div>
  );
}