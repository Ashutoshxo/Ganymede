"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Album, Artist, Song } from "@/lib/api";

type SearchData = {
  songs: Song[];
  artists: Artist[];
  albums: Album[];
};

export function NavbarSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [data, setData] = useState<SearchData>({ songs: [], artists: [], albums: [] });
  const [focused, setFocused] = useState(false);

  function openResult(href: string) {
    setFocused(false);
    setQuery("");
    router.push(href);
  }

  useEffect(() => {
    let active = true;

    fetch("/api/search-data")
      .then((response) => response.json())
      .then((payload: SearchData) => {
        if (active) setData(payload);
      })
      .catch(() => {
        if (active) setData({ songs: [], artists: [], albums: [] });
      });

    return () => {
      active = false;
    };
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 1) return { songs: [], artists: [], albums: [] };

    return {
      songs: data.songs
        .filter((song) =>
          [song.title, song.artist_name, song.album_name, song.genre_name]
            .filter(Boolean)
            .some((value) => value?.toLowerCase().includes(q))
        )
        .slice(0, 4),
      artists: data.artists.filter((artist) => artist.name.toLowerCase().includes(q)).slice(0, 3),
      albums: data.albums
        .filter((album) =>
          [album.title, album.artist_name].filter(Boolean).some((value) => value?.toLowerCase().includes(q))
        )
        .slice(0, 3)
    };
  }, [data, query]);

  const hasResults = results.songs.length || results.artists.length || results.albums.length;

  return (
    <div className="navbar-search" onBlur={() => window.setTimeout(() => setFocused(false), 120)}>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onFocus={() => setFocused(true)}
        placeholder="Search music, artists, albums"
      />
      {focused && query.trim().length >= 1 ? (
        <div className="search-popover">
          {hasResults ? (
            <>
              {results.songs.map((song) => (
                <button
                  key={`song-${song.id}`}
                  type="button"
                  onMouseDown={(event) => {
                    event.preventDefault();
                    openResult(`/songs/${song.id}`);
                  }}
                >
                  <strong>{song.title}</strong>
                  <span>{song.artist_name || "Song"}</span>
                </button>
              ))}
              {results.artists.map((artist) => (
                <button
                  key={`artist-${artist.id}`}
                  type="button"
                  onMouseDown={(event) => {
                    event.preventDefault();
                    openResult(`/artists/${artist.id}`);
                  }}
                >
                  <strong>{artist.name}</strong>
                  <span>Artist</span>
                </button>
              ))}
              {results.albums.map((album) => (
                <button
                  key={`album-${album.id}`}
                  type="button"
                  onMouseDown={(event) => {
                    event.preventDefault();
                    openResult(`/albums/${album.id}`);
                  }}
                >
                  <strong>{album.title}</strong>
                  <span>{album.artist_name || "Album"}</span>
                </button>
              ))}
            </>
          ) : (
            <div className="empty-search">No results found</div>
          )}
        </div>
      ) : null}
    </div>
  );
}
