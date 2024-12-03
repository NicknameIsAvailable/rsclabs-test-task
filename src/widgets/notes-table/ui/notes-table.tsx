import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { DeletePostDialog } from "./delete-note-dialog";
import { EditPostDialog } from "./edit-note-dialog";
import { createColumns } from "../lib";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { cn } from "@/shared/lib/utils";
import { FC, useMemo, useState } from "react";
import { useLocation } from "react-router";
import { INote } from "@/shared/types/post";
import { INotesTableProps } from "../model";
import { Alert, AlertDescription } from "@/shared/ui/alert";
import { Loader2 } from "lucide-react";

const TableSkeleton = () => {
  return (
    <div className="rounded-md border">
      <div className="space-y-3 p-4">
        <div className="h-4 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
      </div>
    </div>
  );
};

export const NotesTable: FC<INotesTableProps> = ({
  data,
  onEdit,
  onDelete,
  onToggleComplete,
  isFetching = false,
  isError = false,
}) => {
  const [editingPost, setEditingPost] = useState<INote | null>(null);
  const [deletingPost, setDeletingPost] = useState<INote | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const showCompleted = searchParams.get("completed") === "true";

  const handleEdit = (note: INote) => {
    setEditingPost(note);
  };

  const handleDelete = (note: INote) => {
    setDeletingPost(note);
  };

  const filteredData = useMemo(() => {
    if (showCompleted) {
      return data?.filter((note: INote) => note.completed);
    }
    return data;
  }, [data, showCompleted]);

  const columns = createColumns(handleEdit, handleDelete, onToggleComplete);

  const table = useReactTable({
    data: filteredData || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Произошла ошибка при загрузке данных
        </AlertDescription>
      </Alert>
    );
  }

  if (isFetching && data?.length === 0) {
    return <TableSkeleton />;
  }

  return (
    <>
      <div className="rounded-md border relative">
        {isFetching && (
          <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        )}

        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className={cn({
                    "bg-green-50": row.original.completed,
                    "opacity-50": isFetching,
                  })}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {isFetching ? "Загрузка..." : "Заметки не найдены."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {editingPost && (
        <EditPostDialog
          post={editingPost}
          open={!!editingPost}
          onClose={() => setEditingPost(null)}
          onSave={(updatedPost) => {
            onEdit?.(updatedPost);
            setEditingPost(null);
          }}
        />
      )}

      {deletingPost && (
        <DeletePostDialog
          post={deletingPost}
          open={!!deletingPost}
          onClose={() => setDeletingPost(null)}
          onConfirm={() => {
            onDelete?.(deletingPost.id);
            setDeletingPost(null);
          }}
        />
      )}
    </>
  );
};
