import { INote } from "../types/post";
import { api } from ".";
import { TCreateNoteValues } from "@/widgets/note-form";

export const notesApi = {
  getAll: () => api.get<INote[]>("/todos"),
  getById: (id: number) => api.get<INote>(`/todos/${id}`),
  create: (data: TCreateNoteValues) => api.post<INote>("/todos", data),
  update: (id: number, data: Partial<INote>) =>
    api.put<INote>(`/todos/${id}`, data),
  delete: (id: number) => api.delete<void>(`/todos/${id}`),
};
