import React, { useState, useEffect } from 'react';
import type { Todo } from '~/types/todo';
import TodoList from '~/components/TodoList';
import AddTaskButton from '~/components/AddTaskButton';
import TaskModal from '~/components/TaskModal';
import Tabs from '~/components/Tabs';

export function meta() {
  return [
    { title: "Todo App" },
    { name: "description", content: "A simple Todo application." },
  ];
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    fetch('/api/tasks')
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  const handleAddTask = async (title: string, content: string) => {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
    const newTask = await response.json();
    setTodos([...todos, ...newTask]);
  };

  const handleToggleTask = async (id: number, completed: boolean) => {
    const response = await fetch(`/api/tasks/${id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed }),
      }
    );
    const updatedTask = await response.json();
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, ...updatedTask[0] } : todo)));
  };

  const handleDeleteTask = async (id: number) => {
    await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (activeTab === 'active') {
      return !todo.completed;
    }
    if (activeTab === 'completed') {
      return todo.completed;
    }
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px' }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>My Todos</h1>
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
      <TodoList todos={filteredTodos} onToggle={handleToggleTask} onDelete={handleDeleteTask} />
      <AddTaskButton onClick={() => setIsModalOpen(true)} />
      {isModalOpen && <TaskModal onClose={() => setIsModalOpen(false)} onSave={handleAddTask} />}
    </div>
  );
}