"use client";

import { useEffect, useState } from "react";
import { callNext, resetQueue, listenQueue, initQueue } from "@/lib/queue";

export default function Counter() {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    initQueue();
    const unsub = listenQueue(setData);
    return () => unsub();
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow w-96 text-center">
        <h1 className="text-2xl font-bold mb-4">QFlow Admin</h1>

        <div className="text-6xl font-bold mb-6">
          {data.current || 0}
        </div>

        <button
          onClick={callNext}
          className="w-full bg-blue-500 text-white p-3 rounded mb-3"
        >
          CALL NEXT
        </button>

        <button
          onClick={resetQueue}
          className="w-full bg-red-500 text-white p-3 rounded"
        >
          RESET SYSTEM
        </button>

        <p className="mt-4 text-sm text-gray-500">
          Latest Ticket: A{String(data.latestTicket || 0).padStart(3, "0")}
        </p>
      </div>
    </div>
  );
}