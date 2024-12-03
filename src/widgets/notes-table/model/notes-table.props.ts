import { INote } from "@/shared/types/post";

export interface INotesTableProps {
  data: INote[];
  onEdit: (post: INote) => void;
  onDelete: (id: number) => void;
  onToggleComplete?: (post: INote, completed: boolean) => void;
  isFetching?: boolean;
  isError?: boolean;
  error?: string;
}
