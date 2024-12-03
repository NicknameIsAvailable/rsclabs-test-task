import { notesApi } from "@/shared/api";
import { INote } from "@/shared/types/post";
import { NotesTable } from "@/widgets/notes-table/ui/notes-table";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "sonner";

export const HomePage = () => {
  const queryClient = useQueryClient();

  const {
    data: notes,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: notesApi.getAll,
  });

  const updateMutation = useMutation({
    mutationFn: (post: INote) => {
      return notesApi.update(post.id, post);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      toast.success("Заметка успешно обновлена");
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => {
      return notesApi.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      toast.success("Заметка успешно удалена");
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });

  const handleEdit = (note: INote) => {
    updateMutation.mutate(note);
  };

  const handleDelete = (id: number) => {
    console.log("delete", id);
    deleteMutation.mutate(id);
  };

  const handleToggleComplete = (note: INote, completed: boolean) => {
    updateMutation.mutate({ ...note, completed });
  };

  return (
    <main className="flex flex-col gap-4">
      <h1 className="font-bold text-4xl">Заметки</h1>
      <NotesTable
        // @ts-ignore
        data={(notes as INote[]) || []}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleComplete={handleToggleComplete}
        isFetching={
          isFetching || updateMutation.isLoading || deleteMutation.isLoading
        }
        isError={isError || updateMutation.isError || deleteMutation.isError}
      />
    </main>
  );
};
