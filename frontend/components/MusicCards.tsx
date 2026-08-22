import { assetUrl, djangoBaseUrl, Song } from "@/lib/api";

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">Antares Music</p>
        <h1>Welcome to Antares Music</h1>
        <p>
         the best music streaming platform for discovering and enjoying your favorite tunes. Explore our vast library of songs, albums, and playlists curated to suit every mood and occasion.
        </p>
        <div className="hero-actions">
          <a href="/songs" className="button-light">
            Browse Songs
          </a>
          <a href="/subscription-plans" className="button-ghost">
            View Plans
          </a>
        </div>
      </div>
      <div
        className="hero-art"
        style={{ backgroundImage: `url("${djangoBaseUrl}/static/image/hero_bg.png")` }}
        aria-hidden="true"
      />
    </section>
  );
}

export function SongGrid({ songs }: { songs: Song[] }) {
  const visibleSongs = songs.length
    ? songs.slice(0, 12)
    : [
        { id: 1, title: "Night Drive", artist_name: "Antares Radio" },
        { id: 2, title: "White Noise", artist_name: "Ganymede" },
        { id: 3, title: "Moon Signal", artist_name: "The Orbit" },
        { id: 4, title: "After Hours", artist_name: "Studio One" }
      ];

  return (
    <div className="grid-cards">
      {visibleSongs.map((song, index) => (
        <article className="music-card" key={song.id}>
          <div
            className="cover"
            style={{
              backgroundImage: song.cover_image
                ? `url("${assetUrl(song.cover_image)}")`
                : `url("${djangoBaseUrl}/static/image/${index % 2 === 0 ? "moon.png" : "gany.jpeg"}")`
            }}
          />
          <div>
            <h3>{song.title}</h3>
            <p>{song.artist_name || song.album_name || "Antares"}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  action
}: {
  eyebrow?: string;
  title: string;
  action?: string;
}) {
  return (
    <div className="section-header">
      <div>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2>{title}</h2>
      </div>
      {action ? <span>{action}</span> : null}
    </div>
  );
}
