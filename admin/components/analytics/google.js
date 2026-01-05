"use client";

import { sendGAEvent } from "@next/third-parties/google";

export default function AddEvent(name, obj) {
  sendGAEvent("event", name, obj);
}
