import { INote } from "@/shared/types/post";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/shared/ui/button";
import {
  Pencil,
  Trash,
  ArrowUpRightFromSquare,
  ArrowUpDown,
} from "lucide-react";
import { Link } from "react-router";
import { INotesTableProps } from "../model";
import { Checkbox } from "@/shared/ui/checkbox";
import { titleToSlug } from "@/shared/utils/createSlug";

export const createColumns = (
  handleEdit: (post: INote) => void,
  handleDelete: (post: INote) => void,
  handleComplete: INotesTableProps["onToggleComplete"],
): ColumnDef<INote>[] => {
  return [
    {
      id: "completed",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting()}>
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      accessorKey: "completed",
      cell: ({ row }) => (
        <div className="w-full flex justify-center items-center">
          <Checkbox
            checked={row.original.completed}
            onCheckedChange={(checked) => {
              handleComplete?.(row.original, Boolean(checked));
            }}
          />
        </div>
      ),
    },
    {
      id: "index",
      header: "#",
      cell: ({ row }) => <span>{row.index + 1}</span>,
      enableSorting: false,
    },
    {
      id: "title",
      header: "Название",
      accessorKey: "title",
      cell: ({ row }) => (
        <div className="max-w-[400px] truncate font-medium">
          {row.original.title}
        </div>
      ),
    },
    {
      id: "actions",
      header: "Действия",
      cell: ({ row }) => {
        const post = row.original;

        return (
          <div className="flex items-center gap-2">
            <Link
              to={`/todo/${titleToSlug(post.title)}`}
              className="inline-flex items-center justify-center rounded-md w-8 h-8 text-sm font-medium hover:bg-muted"
            >
              <ArrowUpRightFromSquare className="h-4 w-4" />
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleEdit(post)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDelete(post)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];
};
