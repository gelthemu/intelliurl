import { LinkPreview } from "@/types";

const URL = `${import.meta.env.VITE_API_URL}/v1/intelliurl`;

export async function shortenURL(url: string): Promise<string | null> {
  try {
    const response = await fetch(`${URL}/adffda`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) return null;

    const data = await response.text();

    return `https://tinyurl.com/${data}`;
  } catch (error) {
    return null;
  }
}

export const fetchLinkPreview = async (
  url: string,
): Promise<LinkPreview | null> => {
  try {
    const response = await fetch(`${URL}/aeppea`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error);
    }

    return await response.json();
  } catch {
    // fail silently and return null
    return null;
  }
};
