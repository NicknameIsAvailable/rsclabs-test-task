import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { INote } from "@/shared/types/post";

interface DeletePostDialogProps {
  post: INote;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeletePostDialog = ({
  post,
  open,
  onClose,
  onConfirm,
}: DeletePostDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Удалить заметку</DialogTitle>
          <DialogDescription>
            Вы уверены, что хотите удалить заметку "{post.title}"?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Удалить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
