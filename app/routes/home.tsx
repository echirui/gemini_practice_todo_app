import React from 'react';
import { Todo } from '~/types/todo';
import TodoList from '~/components/TodoList';

export function meta() {
  return [
    { title: "Todo App" },
    { name: "description", content: "A simple Todo application." },
  ];
}

export default function Home() {
  const todos: Todo[] = [
    { id: '1', title: 'Learn React', completed: false },
    { id: '2', title: 'Build a Todo App', completed: true },
    { id: '3', title: 'Deploy to Cloudflare', completed: false },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px' }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>My Todos</h1>
      <TodoList todos={todos} />
    </div>
  );
}
