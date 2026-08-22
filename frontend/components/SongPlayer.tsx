"use client";

import { useMemo } from "react";
import { assetUrl, Song } from "@/lib/api";
import { resolveAudio, resolveCover, usePlayer } from "@/components/PlayerProvider";

export function SongPlayerGrid({ songs }: { songs: Song[] }) {
  const visibleSongs = useMemo(
    () =>
      songs.length
        ? songs.slice(0, 18)
        : [
            { id: 1, title: "Night Drive", artist_name: "Antares Radio" },
            { id: 2, title: "White Noise", artist_name: "Ganymede" },
            { id: 3, title: "Moon Signal", artist_name: "The Orbit" },
            { id: 4, title: "After Hours", artist_name: "Studio One" }
          ],
    [songs]
  );
  const { activeSong, setActiveSong } = usePlayer();

  return (
    <div className="player-layout">
      <div className="grid-cards">
        {visibleSongs.map((song, index) => {
          const audio = resolveAudio(song);
          const isActive = activeSong?.id === song.id;

          return (
            <button
              className={`music-card song-button ${isActive ? "active" : ""}`}
              key={song.id}
              type="button"
              onClick={() => setActiveSong(song, index)}
            >
              <span
                className="cover"
                style={{ backgroundImage: `url("${assetUrl(resolveCover(song, index))}")` }}
              />
              <span className="song-copy">
                <strong>{song.title}</strong>
                <small>{song.artist_name || song.album_name || song.genre_name || "Antares"}</small>
                <small>{audio ? "Ready to play" : "Audio file missing"}</small>
              </span>
            </button>
          );
        })}
      </div>

      <aside className="now-playing">
        {activeSong ? (
          <>
            <div
              className="now-cover"
              style={{ backgroundImage: `url("${activeSong.resolvedCover || assetUrl(resolveCover(activeSong, 0))}")` }}
            />
            <p className="eyebrow">Now playing</p>
            <h3>{activeSong.title}</h3>
            <p>{activeSong.artist_name || activeSong.album_name || "Antares Music"}</p>
            {activeSong.resolvedAudio ? (
              <div className="audio-missing">Playing in the bottom mini player.</div>
            ) : (
              <div className="audio-missing">No music file uploaded for this song.</div>
            )}
          </>
        ) : null}
      </aside>
    </div>
  );
}
