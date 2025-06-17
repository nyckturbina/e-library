import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface CadastroDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  titulo: string;
  mensagem: string;
}

export default function CadastroDialog({ open, onOpenChange, titulo, mensagem }: CadastroDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{titulo}</DialogTitle>
          <DialogDescription className="whitespace-pre-line">
            {mensagem}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
