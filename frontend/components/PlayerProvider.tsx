"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { assetUrl, djangoBaseUrl, Song } from "@/lib/api";

type PlayerSong = Song & {
  resolvedCover?: string;
  resolvedAudio?: string;
};

type PlayerContextValue = {
  activeSong: PlayerSong | null;
  setActiveSong: (song: Song, index?: number) => void;
};

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function resolveAudio(song: Song) {
  return song.music_url || song.audio_file || song.music_file || "";
}

export function resolveCover(song: Song, index = 0) {
  return (
    song.image_url ||
    song.cover_image ||
    song.image ||
    `${djangoBaseUrl}/static/image/${index % 2 === 0 ? "moon.png" : "gany.jpeg"}`
  );
}

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [activeSong, updateActiveSong] = useState<PlayerSong | null>(null);

  const value = useMemo<PlayerContextValue>(
    () => ({
      activeSong,
      setActiveSong: (song, index = 0) => {
        updateActiveSong({
          ...song,
          resolvedCover: assetUrl(resolveCover(song, index)),
          resolvedAudio: assetUrl(resolveAudio(song))
        });
      }
    }),
    [activeSong]
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used inside PlayerProvider");
  }
  return context;
}

export function GlobalPlayer() {
  const { activeSong } = usePlayer();

  return (
    <div className={`global-player ${activeSong ? "visible" : ""}`}>
      {activeSong ? (
        <>
          <div
            className="mini-cover"
            style={{ backgroundImage: `url("${activeSong.resolvedCover}")` }}
          />
          <div className="mini-copy">
            <strong>{activeSong.title}</strong>
            <span>{activeSong.artist_name || activeSong.album_name || "Antares Music"}</span>
          </div>
          {activeSong.resolvedAudio ? (
            <audio key={activeSong.id} controls autoPlay src={activeSong.resolvedAudio} />
          ) : (
            <span className="mini-missing">No audio file</span>
          )}
        </>
      ) : (
        <span>Select a song to play</span>
      )}
    </div>
  );
}
