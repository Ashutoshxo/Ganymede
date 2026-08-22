import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionHeader } from "@/components/MusicCards";
import { SongPlayerGrid } from "@/components/SongPlayer";
import { assetUrl, getSongs } from "@/lib/api";

export default async function SongDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const songId = Number(id);
  const songs = await getSongs();
  const song = songs.find((item) => item.id === songId);

  if (!song) notFound();

  const relatedSongs = songs
    .filter((item) => item.id !== song.id && (item.artist === song.artist || item.genre === song.genre))
    .slice(0, 6);

  return (
    <section className="content-band page-pad">
      <div className="artist-hero">
        <div
          className="artist-hero-image"
          style={{ backgroundImage: song.image_url ? `url("${assetUrl(song.image_url)}")` : undefined }}
        />
        <div>
          <p className="eyebrow">Song</p>
          <h1>{song.title}</h1>
          <p>{song.artist_name || "Unknown artist"} · {song.album_name || "Single"} · {song.genre_name || "Music"}</p>
          <div className="hero-actions detail-actions">
            {song.artist ? (
              <Link className="button-dark" href={`/artists/${song.artist}`}>
                Open artist
              </Link>
            ) : null}
            {song.album ? (
              <Link className="button-light detail-light" href={`/albums/${song.album}`}>
                Open album
              </Link>
            ) : null}
          </div>
        </div>
      </div>

      <section className="detail-section">
        <SectionHeader eyebrow="Play" title="Selected song" />
        <SongPlayerGrid songs={[song]} />
      </section>

      {relatedSongs.length ? (
        <section className="detail-section">
          <SectionHeader eyebrow="More" title="Related songs" />
          <SongPlayerGrid songs={relatedSongs} />
        </section>
      ) : null}
    </section>
  );
}
