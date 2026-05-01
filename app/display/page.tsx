"use client";

import { useEffect, useState } from "react";
import { initQueue, listenQueue } from "@/lib/queue";

export default function Display() {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    initQueue();
    const unsub = listenQueue(setData);
    return () => unsub();
  }, []);

  useEffect(() => {
    if (data.current) {
      const audio = new Audio("/beep.mp3");
      audio.play().catch(() => {});
    }
  }, [data.current]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-3xl mb-6">NOW SERVING</h1>

      <div className="text-9xl font-bold">
        {data.current || 0}
      </div>

      <p className="mt-6 text-xl">
        Ticket: A{String(data.latestTicket || 0).padStart(3, "0")}
      </p>

      <p className="mt-2 text-gray-400 text-sm">
        Last update: {data.lastCalled || "Waiting..."}
      </p>
    </div>
  );
}