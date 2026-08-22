import { notFound } from "next/navigation";
import { SectionHeader } from "@/components/MusicCards";
import { SongPlayerGrid } from "@/components/SongPlayer";
import { assetUrl, getAlbums, getSongs } from "@/lib/api";

export default async function AlbumDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const albumId = Number(id);
  const [albums, songs] = await Promise.all([getAlbums(), getSongs()]);
  const album = albums.find((item) => item.id === albumId);

  if (!album) notFound();

  const albumSongs = songs.filter((song) => song.album === albumId || song.album_name === album.title);

  return (
    <section className="content-band page-pad">
      <div className="artist-hero">
        <div
          className="artist-hero-image"
          style={{ backgroundImage: album.cover_image_url ? `url("${assetUrl(album.cover_image_url)}")` : undefined }}
        />
        <div>
          <p className="eyebrow">Album</p>
          <h1>{album.title}</h1>
          <p>{album.artist_name || "Unknown artist"} · {albumSongs.length} songs</p>
        </div>
      </div>

      <section className="detail-section">
        <SectionHeader eyebrow="Track list" title="Songs" action={`${albumSongs.length}`} />
        <SongPlayerGrid songs={albumSongs} />
      </section>
    </section>
  );
}
