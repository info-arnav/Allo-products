import { NextResponse } from "next/server";

const DATABASE_URI = (process.env.DATABASE_URI || "").replace(/\/+$/, "");
const SERVICE_KEY = process.env.SERVICE_KEY || "";

function stripApiPrefix(pathname) {
  return pathname.replace(/^\/proxy(?=\/|$)/, "") || "/";
}

function joinUrl(base, path) {
  const p = path.startsWith("/") ? path.slice(1) : path;
  return `${base}/${p}`;
}

function sanitizeHeaders(rawHeaders) {
  const forbidden = new Set([
    "connection",
    "keep-alive",
    "proxy-authenticate",
    "proxy-authorization",
    "te",
    "trailer",
    "transfer-encoding",
    "upgrade",
    "host",
  ]);
  const out = {};
  for (const [k, v] of Object.entries(rawHeaders)) {
    if (!forbidden.has(k.toLowerCase())) out[k] = v;
  }
  return out;
}

async function proxyHandler(request) {
  try {
    const method = (request.method || "GET").toUpperCase();
    const { pathname, search } = request.nextUrl;

    const pathAfterApi = stripApiPrefix(pathname);
    const targetUrl = joinUrl(DATABASE_URI, pathAfterApi + (search || ""));

    const forwarded = {};
    for (const [k, v] of request.headers.entries()) forwarded[k] = v;

    const incomingXFF = (
      forwarded["x-forwarded-for"] ||
      forwarded["x-real-ip"] ||
      forwarded["x-vercel-forwarded-for"] ||
      ""
    ).toString();
    const clientIp = incomingXFF || "127.0.0.1";
    if (incomingXFF) {
      forwarded["x-forwarded-for"] = `${incomingXFF}, ${clientIp}`;
    } else {
      forwarded["x-forwarded-for"] = clientIp;
    }

    forwarded["x-forwarded-proto"] =
      forwarded["x-forwarded-proto"] ||
      request.headers.get("x-forwarded-proto") ||
      request.nextUrl.protocol.replace(":", "");
    forwarded["x-forwarded-host"] =
      forwarded["x-forwarded-host"] ||
      request.headers.get("host") ||
      request.nextUrl.host;

    const headers = sanitizeHeaders(forwarded);

    if (SERVICE_KEY) headers["x-service-key"] = SERVICE_KEY;

    if (forwarded.cookie) headers["cookie"] = forwarded.cookie;

    let body;
    let rawBuf = null;
    if (!["GET", "HEAD", "OPTIONS"].includes(method)) {
      const arr = await request.arrayBuffer();
      rawBuf = Buffer.from(arr);

      if (rawBuf.byteLength > 0) body = rawBuf;
    }

    const proxyRes = await fetch(targetUrl, {
      method,
      headers,
      body,
    });

    const respHeaders = {};
    proxyRes.headers.forEach((v, k) => {
      const lk = k.toLowerCase();
      if (
        ![
          "connection",
          "keep-alive",
          "proxy-authenticate",
          "proxy-authorization",
          "te",
          "trailer",
          "transfer-encoding",
          "upgrade",
        ].includes(lk)
      ) {
        respHeaders[k] = v;
      }
    });

    const setCookie = proxyRes.headers.get("set-cookie");
    if (setCookie) {
      respHeaders["set-cookie"] = setCookie;
    }

    const rspBuf = await proxyRes.arrayBuffer();
    return new NextResponse(rspBuf, {
      status: proxyRes.status,
      headers: respHeaders,
    });
  } catch (err) {
    console.error("Proxy error:", err);
    return NextResponse.json(
      { error: true, message: "Proxy error" },
      { status: 502 }
    );
  }
}

export const GET = proxyHandler;
export const POST = proxyHandler;
export const PUT = proxyHandler;
export const PATCH = proxyHandler;
export const DELETE = proxyHandler;
export const OPTIONS = proxyHandler;
