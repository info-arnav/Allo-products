"use client";

import { sendGAEvent } from "@next/third-parties/google";

function AddEvent(name, obj) {
  sendGAEvent("event", name, obj);
}

export { AddEvent };
