"use client";

import { useState } from "react";
import { takeTicket } from "@/lib/queue";

export default function Ticket() {
  const [ticket, setTicket] = useState("");

  const getTicket = async () => {
    const t = await takeTicket();
    setTicket(t);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <button
        onClick={getTicket}
        className="bg-green-500 text-white px-8 py-4 rounded text-xl"
      >
        TAKE TICKET
      </button>

      {ticket && (
        <div className="mt-6 text-5xl font-bold">
          {ticket}
        </div>
      )}
    </div>
  );
}