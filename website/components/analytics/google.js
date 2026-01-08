"use client";

import { sendGAEvent, sendGTMEvent } from "@next/third-parties/google";

function AddEvent(name, obj) {
  sendGAEvent("event", name, obj);
  sendGTMEvent({ event: name, ...obj });
}

export { AddEvent };
