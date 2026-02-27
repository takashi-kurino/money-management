import { serverFetchWithAuth } from "./serverFetchAuth";
type CreateTodoInput = {
  title: string;
  description?: string;
};

export async function createTodo(data: CreateTodoInput) {
  const res = await serverFetchWithAuth("todos/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("failed to create");
  }

  return res.json();
}

export async function updateTodo(id: string, data: Partial<CreateTodoInput>) {
  return serverFetchWithAuth(`todos/${id}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function deleteTodo(id: string) {
  return serverFetchWithAuth(`todos/${id}/`, {
    method: "DELETE",
  });
}
