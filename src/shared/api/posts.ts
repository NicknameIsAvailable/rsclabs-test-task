import { INote } from "../types/post";
import { api } from ".";
import { TCreateNoteValues } from "@/widgets/note-form";

export const notesApi = {
  getAll: async () => {
    const response = await api.get<INote[]>("/todos");
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get<INote>(`/todos/${id}`);
    return response.data;
  },
  create: async (data: TCreateNoteValues) => {
    const response = await api.post<INote>("/todos", data);
    return response.data;
  },
  update: async (id: number, data: Partial<INote>) => {
    const response = await api.put<INote>(`/todos/${id}`, data);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/todos/${id}`);
    return response.data;
  },
};
