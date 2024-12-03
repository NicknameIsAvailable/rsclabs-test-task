import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { INote } from "@/shared/types/post";
import { useState } from "react";

interface EditPostDialogProps {
  post: INote;
  open: boolean;
  onClose: () => void;
  onSave: (updatedPost: INote) => void;
}

export const EditPostDialog = ({
  post,
  open,
  onClose,
  onSave,
}: EditPostDialogProps) => {
  const [title, setTitle] = useState(post.title);

  const handleSave = () => {
    onSave({ ...post, title });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактировать</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Название"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button onClick={handleSave}>Сохранить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
