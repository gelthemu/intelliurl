import type { VercelRequest, VercelResponse } from "@vercel/node";

function getTinyUrlToken(): string {
  return process.env.TINYURL_API_KEY || "";
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin || "*";
  const TINYURL_TOKEN = getTinyUrlToken();

  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "X-API-Key, Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = req.headers["x-api-key"] as string;

  if (!apiKey || !TINYURL_TOKEN || apiKey !== TINYURL_TOKEN) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { url } = req.body;

    if (!url || typeof url !== "string") {
      return res.status(400).json({ error: "URL is required" });
    }

    const apiUrl = `https://api.tinyurl.com/create?api_token=${TINYURL_TOKEN}`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: url,
        domain: "tinyurl.com",
      }),
    });

    if (!response.ok) {
      return res.status(500).json({ error: "Failed to shorten URL" });
    }

    const data = await response.json();
    console.log(data);
    if (!data.data || !data.data.tiny_url || !data.data.alias) {
      return res.status(500).json({ error: "Invalid response..." });
    }

    return res.status(200).json({
      path: data.data.alias,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
