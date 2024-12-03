import { Button } from "@/shared/ui/button";

import { useMutation } from "react-query";
import { notesApi } from "@/shared/api";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { AddNoteForm, TCreateNoteValues } from "@/widgets/note-form";

export const AddTaskPage = () => {
  const navigate = useNavigate();

  const createNoteMutation = useMutation({
    mutationFn: notesApi.create,
    onSuccess: () => {
      toast.success("Заметка успешно создана");
      navigate("/");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Произошла ошибка при создании заметки",
      );
    },
  });

  const onSubmit = (data: TCreateNoteValues) => {
    createNoteMutation.mutate(data);
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <div className="mb-6 space-y-4">
        <Button variant="outline" onClick={() => navigate("/")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Назад к списку
        </Button>
        <h1 className="text-2xl font-bold">Создать заметку</h1>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <AddNoteForm
          isLoading={createNoteMutation.isLoading}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};
