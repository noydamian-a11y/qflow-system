import { db } from "./firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

const ref = doc(db, "qflow", "queue");

/* INIT SYSTEM */
export const initQueue = async () => {
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      current: 0,
      latestTicket: 0,
      lastCalled: "",
      updatedAt: serverTimestamp(),
    });
  }
};

/* CALL NEXT NUMBER */
export const callNext = async () => {
  const snap = await getDoc(ref);
  const data = snap.data();

  const next = (data?.current || 0) + 1;

  await updateDoc(ref, {
    current: next,
    lastCalled: new Date().toISOString(),
    updatedAt: serverTimestamp(),
  });
};

/* TAKE TICKET */
export const takeTicket = async () => {
  const snap = await getDoc(ref);
  const data = snap.data();

  const nextTicket = (data?.latestTicket || 0) + 1;

  await updateDoc(ref, {
    latestTicket: nextTicket,
    updatedAt: serverTimestamp(),
  });

  return `A${String(nextTicket).padStart(3, "0")}`;
};

/* RESET */
export const resetQueue = async () => {
  await setDoc(ref, {
    current: 0,
    latestTicket: 0,
    lastCalled: "",
    updatedAt: serverTimestamp(),
  });
};

/* REALTIME LISTENER */
export const listenQueue = (cb: (data: any) => void) => {
  return onSnapshot(ref, (snap) => {
    cb(snap.data());
  });
};