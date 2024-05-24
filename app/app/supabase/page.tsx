"use client";
import { createClient } from "@supabase/supabase-js";
import { useRef, useState } from "react";

// Add clerk to Window to avoid type errors
declare global {
  interface Window {
    Clerk: any;
  }
}

function createClerkSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    {
      global: {
        // Get the Supabase token with a custom fetch method
        fetch: async (url, options = {}) => {
          const clerkToken = await window.Clerk.session?.getToken({
            template: "supabase",
          });

          // Construct fetch headers
          const headers = new Headers(options?.headers);
          headers.set("Authorization", `Bearer ${clerkToken}`);

          // Now call the default fetch
          return fetch(url, {
            ...options,
            headers,
          });
        },
      },
    },
  );
}

const client = createClerkSupabaseClient();

export default function Supabase() {
  const [addresses, setAddresses] = useState<any>();
  const [tournamentName, setTournamentName] = useState<any>();
  const listAddresses = async () => {
    // Fetches all addresses scoped to the user
    // Replace "Addresses" with your table name
    const { data, error } = await client.from("Addresses").select();
    if (!error) setAddresses(data);
  };

  const listTournamentName = async () => {
    const { data, error } = await client.from("Addresses").select();
    if (!error) setTournamentName(data);
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const sendAddress = async () => {
    if (!inputRef.current?.value) return;
    await client.from("Addresses").insert({
      // Replace content with whatever field you want
      content: inputRef.current?.value,
    });
  };

  const sendTournamentName = async () => {
    if (!inputRef.current?.value) return;
    await client.from("Addresses").insert({
      // Replace content with whatever field you want
      tournament_name: inputRef.current?.value,
    });
  };

  return (
    <>
      <div className="flex flex-col w-6/12">
        <input
          onSubmit={sendAddress}
          style={{ color: "black" }}
          type="text"
          ref={inputRef}
          className="bg-zinc-50 outline outline-1 outline-zinc-500"
        />
        <button onClick={sendAddress}>Send Address</button>
        <input
          onSubmit={sendTournamentName}
          style={{ color: "black" }}
          type="text"
          ref={inputRef}
          className="bg-zinc-50 outline outline-1 outline-zinc-500"
        />
        <button onClick={sendTournamentName}>Set tournament name</button>
        <button onClick={listAddresses}>Fetch Addresses</button>
        <button onClick={listTournamentName}>Fetch tournament name</button>
      </div>
      <h2>Addresses</h2>
      {!addresses ? (
        <p>No addresses</p>
      ) : (
        <ul>
          {addresses.map((address: any) => (
            <li key={address.id}>{address.content}</li>
          ))}
        </ul>
      )}

      <h2>Tournament name</h2>
      {!tournamentName ? (
        <p>No tournament name</p>
      ) : (
        <ul>
          {tournamentName.map((tournament_name: any) => (
            <li key={tournament_name.id}>{tournament_name.tournament_name}</li>
          ))}
        </ul>
      )}
    </>
  );
}
