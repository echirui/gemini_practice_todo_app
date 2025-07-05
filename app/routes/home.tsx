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

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    fetch('/api/tasks')
      .then((res) => res.json() as Promise<Todo[]>)
      .then((data: Todo[]) => setTodos(data));
  }, []);

  const handleAddTask = async (title: string, content: string, due_date: string | null) => {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, due_date }),
    });
    const newTasks: Todo[] = await response.json();
    const newTask = newTasks[0];
    setTodos([...todos, newTask]);
  };

  const handleToggleTask = async (id: number, completed: boolean) => {
    const response = await fetch(`/api/tasks/${id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed }),
      }
    );
    const updatedTask: Todo[] = await response.json();
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, ...(updatedTask[0] as Todo) } : todo)));
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
    <div className="main-container">
      <h1>My Todos</h1>
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
      <TodoList todos={filteredTodos} onToggle={handleToggleTask} onDelete={handleDeleteTask} onAddTask={handleAddTask} />
    </div>
  );
}