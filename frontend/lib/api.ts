export type Song = {
  id: number;
  title: string;
  artist?: number;
  artist_name?: string;
  album?: number | null;
  album_name?: string;
  genre?: number;
  genre_name?: string;
  image?: string | null;
  image_url?: string | null;
  cover_image?: string;
  music_file?: string | null;
  music_url?: string | null;
  audio_file?: string | null;
  duration?: string;
  release_date?: string | null;
};

export type Playlist = {
  id: number;
  name: string;
  description?: string;
  cover_image?: string | null;
  cover_image_url?: string | null;
  songs?: Song[];
};

export type Artist = {
  id: number;
  name: string;
  biography?: string | null;
  image?: string | null;
  image_url?: string | null;
  song_count?: number;
};

export type Album = {
  id: number;
  title: string;
  artist?: number;
  artist_name?: string;
  cover_image?: string | null;
  cover_image_url?: string | null;
  release_date?: string | null;
  song_count?: number;
};

export type Genre = {
  id: number;
  name: string;
};

export const djangoBaseUrl =
  process.env.NEXT_PUBLIC_DJANGO_URL?.replace(/\/$/, "") || "http://127.0.0.1:8000";

async function getJson<T>(path: string, fallback: T): Promise<T> {
  try {
    const response = await fetch(`${djangoBaseUrl}${path}`, {
      next: { revalidate: 30 },
      headers: { Accept: "application/json" }
    });

    if (!response.ok) return fallback;
    return (await response.json()) as T;
  } catch {
    return fallback;
  }
}

export function assetUrl(path: string) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${djangoBaseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export async function getSongs() {
  return getJson<Song[]>("/api/songs/", []);
}

export async function getPlaylists() {
  return getJson<Playlist[]>("/api/playlists/", []);
}

export async function getArtists() {
  return getJson<Artist[]>("/api/artists/", []);
}

export async function getAlbums() {
  return getJson<Album[]>("/api/albums/", []);
}

export async function getGenres() {
  return getJson<Genre[]>("/api/genres/", []);
}
