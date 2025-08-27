"use client";
import { TaskForm } from "@/app/components/TaskForm";
import { createTask } from "@/app/utils/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewTaskPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  return (
    <main className="mx-auto max-w-2xl">
      {error && (
        <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-red-200">
          {error}
        </div>
      )}
      <TaskForm
        submitLabel="Add Task ⏺"
        onSubmit={async (payload) => {
          setError(null);
          try {
            await createTask(payload);
            router.push("/");
          } catch (e: any) {
            setError(e?.message ?? "Failed to create task");
          }
        }}
      />
    </main>
  );
}
