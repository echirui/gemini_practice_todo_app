export interface Todo {
  id: number;
  title: string;
  content: string | null;
  completed: boolean;
  createdAt: string;
  due_date: string | null;
}