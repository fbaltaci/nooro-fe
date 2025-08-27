import { Task } from "../types/task";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

async function parseBody<T>(res: Response): Promise<T | undefined> {
  const text = await res.text();
  if (!text) return undefined;
  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) return JSON.parse(text) as T;
  throw new Error(`${res.status} ${res.statusText} – ${text.slice(0, 180)}…`);
}

async function jsonOrThrow<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const maybe = await parseBody<any>(res).catch(() => undefined);
    const msg =
      maybe?.error || maybe?.message || `Request failed: ${res.status}`;
    throw new Error(msg);
  }
  const data = await parseBody<T>(res);
  return data as T;
}

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch(`${API}/tasks`, {
    cache: "no-store",
    headers: { Accept: "application/json" },
  });
  return jsonOrThrow<Task[]>(res);
}

export async function fetchTask(id: number): Promise<Task> {
  const res = await fetch(`${API}/tasks/${id}`, {
    cache: "no-store",
    headers: { Accept: "application/json" },
  });
  return jsonOrThrow<Task>(res);
}

export async function createTask(payload: {
  title: string;
  color: string;
}): Promise<Task> {
  const res = await fetch(`${API}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  return jsonOrThrow<Task>(res);
}

export async function updateTask(
  id: number,
  payload: Partial<Task>
): Promise<Task> {
  const res = await fetch(`${API}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  return jsonOrThrow<Task>(res);
}

export async function deleteTask(id: number): Promise<void> {
  const res = await fetch(`${API}/tasks/${id}`, {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) await jsonOrThrow(res);
}
