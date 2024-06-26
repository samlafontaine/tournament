import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";

const tournamentFormSchema = z.object({
  name: z.string().min(1, "Tournament name is required"),
});

interface EditNameProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: { name: string }) => void;
}

const EditName: React.FC<EditNameProps> = ({ open, onClose, onSubmit }) => {
  const form = useForm<z.infer<typeof tournamentFormSchema>>({
    resolver: zodResolver(tournamentFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleTournamentNameSubmit = (
    values: z.infer<typeof tournamentFormSchema>,
  ) => {
    onSubmit(values);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Tournament Name</DialogTitle>
          <DialogDescription>
            Enter the name of your tournament
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleTournamentNameSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tournament Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter tournament name" {...field} />
                  </FormControl>
                  <FormDescription>
                    You can always change it again later.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditName;
