import { NextResponse } from "next/server";
import { djangoBaseUrl } from "@/lib/api";

async function getData(path: string) {
  try {
    const response = await fetch(`${djangoBaseUrl}${path}`, {
      cache: "no-store",
      headers: { Accept: "application/json" }
    });

    if (!response.ok) return [];
    return response.json();
  } catch {
    return [];
  }
}

export async function GET() {
  const [songs, artists, albums] = await Promise.all([
    getData("/api/songs/"),
    getData("/api/artists/"),
    getData("/api/albums/")
  ]);

  return NextResponse.json({ songs, artists, albums });
}
