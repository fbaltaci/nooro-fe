"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Task } from "@/app/types/task";
import { fetchTask, updateTask } from "@/app/utils/api";
import { TaskForm } from "@/app/components/TaskForm";

export default function TaskDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const numericId = useMemo(() => Number(id), [id]);
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!Number.isFinite(numericId)) {
      setError("Invalid task id.");
      setLoading(false);
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const t = await fetchTask(numericId);
        if (!cancelled) setTask(t);
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? "Failed to load task.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [numericId]);

  if (loading) {
    return (
      <main className="mx-auto max-w-2xl">
        <button
          type="button"
          onClick={() => history.back()}
          className="mb-6 text-zinc-400 hover:text-zinc-200"
        >
          ←
        </button>
        <p className="text-sm text-zinc-400">Loading task…</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-2xl">
        <button
          type="button"
          onClick={() => history.back()}
          className="mb-6 text-zinc-400 hover:text-zinc-200"
        >
          ←
        </button>
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-red-200">
          {error}
        </div>
      </main>
    );
  }

  if (!task) {
    return (
      <main className="mx-auto max-w-2xl">
        <button
          type="button"
          onClick={() => history.back()}
          className="mb-6 text-zinc-400 hover:text-zinc-200"
        >
          ←
        </button>
        <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-zinc-200">
          Task not found.
        </div>
      </main>
    );
  }

  return (
    <main>
      <TaskForm
        defaults={task}
        submitLabel="Save ✔"
        onSubmit={async (payload) => {
          try {
            await updateTask(numericId, payload);
            router.push("/");
          } catch (e: any) {
            setError(e?.message ?? "Failed to update task");
          }
        }}
      />
    </main>
  );
}
