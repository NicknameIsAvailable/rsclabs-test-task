import { notesApi } from "@/shared/api";
import { INote } from "@/shared/types/post";
import { findNoteBySlug } from "@/shared/utils/createSlug";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router";
import { Button } from "@/shared/ui/button";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/shared/lib/utils";

export const TaskPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const {
    data: notes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: notesApi.getAll,
  });

  const note = findNoteBySlug(notes as INote[], String(slug));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        Загрузка...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
        <div>Произошла ошибка при загрузке заметки</div>
        <Button onClick={() => navigate("/")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Вернуться назад
        </Button>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
        <div>Заметка не найдена</div>
        <Button onClick={() => navigate("/")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Вернуться назад
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto">
      <Button variant="outline" onClick={() => navigate("/")} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Вернуться назад
      </Button>

      <div className="space-y-6">
        <h1 className="text-2xl font-bold">{note.title}</h1>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Статус:</span>
          <div
            className={cn(
              "flex items-center gap-1 text-sm font-medium",
              note.completed ? "text-green-600" : "text-yellow-600",
            )}
          >
            {note.completed ? (
              <>
                <CheckCircle className="h-4 w-4" />
                Выполнено
              </>
            ) : (
              <>
                <XCircle className="h-4 w-4" />В процессе
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
