import { TCreateNoteValues } from "./schema";

export interface INoteFormProps {
  onSubmit: (data: TCreateNoteValues) => void | Promise<void>; // Исправленная типизация
  isLoading: boolean;
}
