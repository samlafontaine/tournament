import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DialogClose } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";

const matchSchema = z.object({
  team1: z.string(),
  team2: z.string(),
  score1: z.coerce.number(),
  score2: z.coerce.number(),
  date: z.date(),
});

type SubmitHandler = (values: z.infer<typeof matchSchema>) => void;

interface MatchFormProps {
  onSubmit: SubmitHandler; // Define the type for onSubmit prop
}

const MatchForm: React.FC<MatchFormProps> = ({ onSubmit }) => {
  const form = useForm({
    resolver: zodResolver(matchSchema),
    defaultValues: {
      team1: "",
      team2: "",
      score1: 0.0,
      score2: 0.0,
      date: new Date(),
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-row items-center gap-2">
          <div className="size-4/6">
            <FormField
              control={form.control}
              name="team1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team 1</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a team" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Blue">Blue</SelectItem>
                      <SelectItem value="Red">Red</SelectItem>
                      <SelectItem value="Green">Green</SelectItem>
                      <SelectItem value="Yellow">Yellow</SelectItem>
                      <SelectItem value="Orange">Orange</SelectItem>
                      <SelectItem value="Purple">Purple</SelectItem>
                      <SelectItem value="Pink">Pink</SelectItem>
                      <SelectItem value="Cyan">Cyan</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            rules={{ required: true }}
            name="score1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Score</FormLabel>
                <FormControl>
                  <Input placeholder="0" {...field} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-row items-center gap-2">
          <div className="size-4/6">
            <FormField
              control={form.control}
              name="team2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team 2</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a team" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Blue">Blue</SelectItem>
                      <SelectItem value="Red">Red</SelectItem>
                      <SelectItem value="Green">Green</SelectItem>
                      <SelectItem value="Yellow">Yellow</SelectItem>
                      <SelectItem value="Orange">Orange</SelectItem>
                      <SelectItem value="Purple">Purple</SelectItem>
                      <SelectItem value="Pink">Pink</SelectItem>
                      <SelectItem value="Cyan">Cyan</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            rules={{ required: true }}
            name="score2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Score</FormLabel>
                <FormControl>
                  <Input placeholder="0" {...field} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="date"
          rules={{ required: true }}
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        " pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogClose asChild className="w-full">
          <Button type="submit">Submit</Button>
        </DialogClose>
      </form>
    </Form>
  );
};

export default MatchForm;
