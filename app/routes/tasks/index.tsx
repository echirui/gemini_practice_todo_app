import React, { useState, useEffect } from 'react';
import type { Todo } from '~/types/todo';
import TodoList from '~/components/TodoList';
import Tabs from '~/components/Tabs';

export function meta() {
  return [
    { title: "Todo App" },
    { name: "description", content: "A simple Todo application." },
  ];
}

export default function TasksIndex() {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    fetch('/api/tasks')
      .then((res) => res.json() as Promise<Todo[]>)
      .then((data: Todo[]) => setTasks(data));
  }, []);

  const handleAddTask = async (title: string, content: string, due_date: string | null, priority: 'high' | 'medium' | 'low') => {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, due_date, priority }),
    });
    const newTask: Todo = await response.json();
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const handleUpdateTask = async (task: Todo) => {
    const response = await fetch(`/api/tasks/${task.id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      }
    );
    const updatedTask: Todo = await response.json();
    setTasks(prevTasks => prevTasks.map((t) => (t.id === task.id ? updatedTask : t)));
  };

  const handleDeleteTask = async (id: number) => {
    await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
    setTasks(prevTasks => prevTasks.filter((todo) => todo.id !== id));
  };

  const filteredTasks = tasks.filter(todo => {
    if (activeTab === 'active') {
      return !todo.completed;
    }
    if (activeTab === 'completed') {
      return todo.completed;
    }
    return true;
  });

  return (
    <div className="main-container">
      <h1>My Todos</h1>
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
      <TodoList tasks={filteredTasks} onUpdateTask={handleUpdateTask} onDeleteTask={handleDeleteTask} onAddTask={handleAddTask} />
    </div>
  );
}