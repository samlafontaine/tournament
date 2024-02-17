"use client";

import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { PlusIcon, CalendarIcon } from "@heroicons/react/24/outline";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const matchSchema = z.object({
  team1: z.string(),
  team2: z.string(),
  score1: z.coerce.number(),
  score2: z.coerce.number(),
  date: z.date(),
});

type Match = {
  team1: string;
  team2: string;
  score1: number;
  score2: number;
  date: Date;
};

export default function Home() {
  const [list, setList] = useState<Match[]>([]);
  const [selectedValue, setSelectedValue] = useState("matches");

  const handleToggleChange = (value: string) => {
    setSelectedValue(value);
  };

  const form = useForm<z.infer<typeof matchSchema>>({
    resolver: zodResolver(matchSchema),
    defaultValues: {
      team1: "",
      team2: "",
      score1: 0.0,
      score2: 0.0,
      date: new Date(),
    },
  });

  function onSubmit(values: z.infer<typeof matchSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setList((prevList) => [...prevList, values]);
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
            <ToggleGroup
              type="single"
              defaultValue="matches"
              value={selectedValue}
              onValueChange={handleToggleChange}
            >
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
                <DialogTitle>Add match</DialogTitle>
                <DialogDescription>Add recently played match</DialogDescription>
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
                  <FormField
                    control={form.control}
                    rules={{ required: true }}
                    name="score1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Score 1</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="0"
                            {...field}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    rules={{ required: true }}
                    name="score2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Score 2</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="0"
                            {...field}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="date"
                    rules={{ required: true }}
                    render={({ field }) => (
                      <FormItem className="flex flex-col w-full">
                        <FormLabel>Match date</FormLabel>
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
                  <DialogClose asChild>
                    <Button type="submit">Submit</Button>
                  </DialogClose>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
        {selectedValue === "matches" ? (
          <div>
            {list.map((item, index) => (
              <div key={index}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Date</TableHead>
                      <TableHead>Result</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-normal">
                        {item.date.toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-row items-center gap-3">
                          <div className="flex flex-row items-center gap-2">
                            {item.score1 > item.score2 ? (
                              <span className="text-zinc-900 font-medium">
                                {item.team1}
                              </span>
                            ) : (
                              <span className="text-zinc-500">
                                {item.team1}
                              </span>
                            )}
                            <span className="p-1 bg-zinc-100 text-zinc-900 rounded">
                              {item.score1}
                            </span>
                          </div>
                          <div>–</div>
                          <div className="flex flex-row items-center gap-2">
                            <span className="p-1 bg-zinc-100 text-zinc-900 rounded">
                              {item.score2}
                            </span>
                            {item.score2 > item.score1 ? (
                              <span className="text-zinc-900 font-medium">
                                {item.team2}
                              </span>
                            ) : (
                              <span className="text-zinc-500">
                                {item.team2}
                              </span>
                            )}
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            ))}
          </div>
        ) : (
          <p>hello</p>
        )}
      </div>
    </main>
  );
}
