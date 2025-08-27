"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Task } from "./types/task";
import { deleteTask, fetchTasks, updateTask } from "./utils/api";
import { EmptyState } from "./components/EmptyState";
import { TaskItem } from "./components/TaskItem";

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks().then(setTasks);
  }, []);

  const completed = useMemo(
    () => tasks.filter((t) => t.completed).length,
    [tasks]
  );

  async function toggleComplete(id: number, completed: boolean) {
    await updateTask(id, { completed });
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed } : t))
    );
  }

  async function handleDelete(id: number) {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  if (!tasks.length) {
    return (
      <main>
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/tasks/new"
            className="mx-auto inline-flex w-full max-w-md items-center justify-center rounded-xl bg-sky-700 px-6 py-3 text-sm font-medium text-white ring-1 ring-sky-500/30 hover:bg-sky-600"
          >
            Create Task ⏺
          </Link>
        </div>
        <EmptyState />
      </main>
    );
  }

  return (
    <main>
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/tasks/new"
          className="mx-auto inline-flex w-full max-w-md items-center justify-center rounded-xl bg-sky-700 px-6 py-3 text-sm font-medium text-white ring-1 ring-sky-500/30 hover:bg-sky-600"
        >
          Create Task ⏺
        </Link>
      </div>

      <div className="mb-2 flex items-center justify-between text-sm text-zinc-400">
        <div className="font-medium text-zinc-300">
          Tasks{" "}
          <span className="ml-1 rounded-full bg-white/5 px-2 py-0.5 text-xs">
            {tasks.length}
          </span>
        </div>
        <div className="">
          Completed{" "}
          <span className="ml-1 rounded-full bg-white/5 px-2 py-0.5 text-xs">
            {completed} of {tasks.length}
          </span>
        </div>
      </div>

      <ul className="mt-2 space-y-3">
        {tasks.map((t) => (
          <TaskItem
            key={t.id}
            task={t}
            onToggle={toggleComplete}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </main>
  );
}
