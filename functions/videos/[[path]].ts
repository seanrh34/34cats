type Env = {
  ASSETS: {
    fetch: (input: Request | string) => Promise<Response>;
  };
};

export const onRequest = async (context: {
  request: Request;
  env: Env;
}): Promise<Response> => {
  const { request, env } = context;
  const method = request.method.toUpperCase();

  if (method !== "GET" && method !== "HEAD") {
    return new Response("Method Not Allowed", {
      status: 405,
      headers: { Allow: "GET, HEAD" },
    });
  }

  const assetResponse = await env.ASSETS.fetch(
    new Request(new URL(request.url).toString(), { method: "GET" }),
  );

  if (assetResponse.status !== 200) {
    return assetResponse;
  }

  const rangeHeader = request.headers.get("Range");

  if (rangeHeader === null) {
    const headers = new Headers(assetResponse.headers);
    headers.set("Accept-Ranges", "bytes");
    return new Response(method === "HEAD" ? null : assetResponse.body, {
      status: 200,
      statusText: assetResponse.statusText,
      headers,
    });
  }

  const buffer = await assetResponse.arrayBuffer();
  const total = buffer.byteLength;
  const contentType =
    assetResponse.headers.get("Content-Type") ?? "application/octet-stream";

  const range = parseRange(rangeHeader, total);

  if (range === null) {
    return new Response(null, {
      status: 416,
      headers: {
        "Content-Range": `bytes */${total}`,
        "Accept-Ranges": "bytes",
      },
    });
  }

  const { start, end } = range;
  const headers = new Headers({
    "Content-Range": `bytes ${start}-${end}/${total}`,
    "Content-Length": String(end - start + 1),
    "Accept-Ranges": "bytes",
    "Content-Type": contentType,
    "Cache-Control": "public, max-age=31536000, immutable",
  });

  return new Response(method === "HEAD" ? null : buffer.slice(start, end + 1), {
    status: 206,
    statusText: "Partial Content",
    headers,
  });
};

function parseRange(
  header: string,
  total: number,
): { start: number; end: number } | null {
  const match = /^bytes=(\d*)-(\d*)$/.exec(header.trim());
  if (match === null) {
    return null;
  }

  const [, startRaw, endRaw] = match;
  if (startRaw === "" && endRaw === "") {
    return null;
  }

  let start: number;
  let end: number;

  if (startRaw === "") {
    const suffix = Number(endRaw);
    if (suffix === 0) {
      return null;
    }
    start = Math.max(total - suffix, 0);
    end = total - 1;
  } else {
    start = Number(startRaw);
    end = endRaw === "" ? total - 1 : Math.min(Number(endRaw), total - 1);
  }

  if (!Number.isFinite(start) || !Number.isFinite(end)) {
    return null;
  }
  if (start >= total || start > end) {
    return null;
  }

  return { start, end };
}
