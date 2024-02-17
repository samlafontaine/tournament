"use client";

import Matches from "./matches";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@heroicons/react/24/outline";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const matchSchema = z.object({
  team1: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  team2: z.string().min(2).max(50),
  score1: z.number(),
  score2: z.number(),
  date: z.date(),
});

export default function Home() {
  const form = useForm<z.infer<typeof matchSchema>>({
    resolver: zodResolver(matchSchema),
    defaultValues: {
      team1: "",
      team2: "",
      score1: 0,
      score2: 0,
      date: new Date(),
    },
  });

  function onSubmit(values: z.infer<typeof matchSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <main className="min-h-screen p-24 flex flex-col items-center">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed mb-20 left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Fifa tournament
        </p>
      </div>
      <div className="flex flex-col w-6/12">
        <div className="flex flex-row justify-between mb-4">
          <div>
            <ToggleGroup type="single">
              <ToggleGroupItem value="matches">Recent matches</ToggleGroupItem>
              <ToggleGroupItem value="rankings">Rankings</ToggleGroupItem>
            </ToggleGroup>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <PlusIcon className="h-4 w-4 mr-1" />
                New match
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Title</DialogTitle>
                <DialogDescription>Description</DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="team1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Team 1</FormLabel>
                        <FormControl>
                          <Input placeholder="Team 1" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is the name of the first team.
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
        </div>
        <Matches />
      </div>
    </main>
  );
}
