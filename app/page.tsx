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
    setList((prevList) => [...prevList, values]);
    console.log(values);
  }

  const sortedList = list.sort(function (a, b) {
    let dateA = new Date(a.date).getTime();
    let dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });

  // Number of games played

  function countOccurrences(arr: Match[], targetTeam: string): number {
    let count = 0;

    arr.forEach((match) => {
      if (match.team1 === targetTeam || match.team2 === targetTeam) {
        count++;
      }
    });

    return count;
  }

  // Number of wins
  function countWins(arr: Match[], targetTeam: string): number {
    let count = 0;

    arr.forEach((match) => {
      if (
        (match.team1 === targetTeam && match.score1 > match.score2) ||
        (match.team2 === targetTeam && match.score2 > match.score1)
      ) {
        count++;
      }
    });

    return count;
  }

  // Number of losses
  function countLosses(arr: Match[], targetTeam: string): number {
    let count = 0;

    arr.forEach((match) => {
      if (
        (match.team1 === targetTeam && match.score1 < match.score2) ||
        (match.team2 === targetTeam && match.score2 < match.score1)
      ) {
        count++;
      }
    });

    return count;
  }

  // Number of ties
  function countTies(arr: Match[], targetTeam: string): number {
    let count = 0;

    arr.forEach((match) => {
      if (
        (match.team1 === targetTeam && match.score1 == match.score2) ||
        (match.team2 === targetTeam && match.score2 == match.score1)
      ) {
        count++;
      }
    });

    return count;
  }

  // Number of points
  function countPoints(arr: Match[], targetTeam: string): number {
    const wins = countWins(arr, targetTeam);
    const ties = countTies(arr, targetTeam);
    return wins * 2 + ties;
  }

  const teams = [
    "Yellow",
    "Red",
    "Blue",
    "Green",
    "Orange",
    "Purple",
    "Pink",
    "Cyan",
  ];

  const sortedTeams = teams.sort(function (a, b) {
    let teamAPoints = countPoints(list, a);
    let teamBPoints = countPoints(list, b);
    let teamAGamesPlayed = countOccurrences(list, a);
    let teamBGamesPlayed = countOccurrences(list, b);

    if (teamBPoints !== teamAPoints) {
      return teamBPoints - teamAPoints;
    } else return teamBGamesPlayed - teamAGamesPlayed;
  });

  return (
    <main className="min-h-screen p-5 md:p-24 flex flex-col items-center">
      <div className="flex flex-col w-full md:w-6/12">
        <div className="mb-12">
          <p className="text-2xl font-medium bg-gradient-to-r from-cyan-500 to-blue-500 inline-block text-transparent bg-clip-text mb-1">
            Fifa tournament
          </p>
          <p className="text-sm text-zinc-600 leading-relaxed">
            Information about the ongoing Fifa tournament. Add and view recently
            played matches, and see who&apos;s currently leading in the
            rankings.
          </p>
        </div>
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
            </DialogContent>
          </Dialog>
        </div>
        {selectedValue === "matches" ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedList.map((item, index) => (
                <TableRow key={index}>
                  <TableCell> {format(item.date, "PPP")}</TableCell>
                  <TableCell className="flex flex-row items-center gap-3">
                    <div className="flex flex-row items-center gap-2">
                      {item.score1 > item.score2 ? (
                        <span className="text-zinc-900 font-medium">
                          {item.team1}
                        </span>
                      ) : (
                        <span className="text-zinc-500">{item.team1}</span>
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
                        <span className="text-zinc-500">{item.team2}</span>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Table>
            <TableCaption>General rankings</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Team</TableHead>
                <TableHead>GP</TableHead>
                <TableHead>Wins</TableHead>
                <TableHead>Losses</TableHead>
                <TableHead>Ties</TableHead>
                <TableHead>Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedTeams.map((team) => (
                <TableRow key={team}>
                  <TableCell className="font-medium">{team}</TableCell>
                  <TableCell>{countOccurrences(list, team)}</TableCell>
                  <TableCell>{countWins(list, team)}</TableCell>
                  <TableCell>{countLosses(list, team)}</TableCell>
                  <TableCell>{countTies(list, team)}</TableCell>
                  <TableCell>{countPoints(list, team)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </main>
  );
}
