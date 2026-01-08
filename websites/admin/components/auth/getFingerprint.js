"use client";

import { v4 as uuidv4 } from "uuid";
import { getCookie, setCookie } from "../cookies/manageCookies";

export function getFingerPrint() {
  let uuid = getCookie("UUID_V4");

  if (!uuid) {
    uuid = uuidv4();
    setCookie("UUID_V4", uuid);
  }

  const dict = {
    uuid: uuid,
    cookieEnabled: navigator.cookieEnabled,
    language: navigator.language,
  };

  let fingerprint = btoa(JSON.stringify(dict));
  fingerprint =
    fingerprint.length > 255 ? fingerprint.slice(0, 255) : fingerprint;

  return fingerprint;
}

export function generateFingerPrint() {
  let uuid = uuidv4();

  const dict = {
    uuid: uuid,
    cookieEnabled: navigator.cookieEnabled,
    language: navigator.language,
  };

  let fingerprint = btoa(JSON.stringify(dict));
  fingerprint =
    fingerprint.length > 255 ? fingerprint.slice(0, 255) : fingerprint;

  return [fingerprint, uuid];
}
