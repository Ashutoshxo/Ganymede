import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionHeader } from "@/components/MusicCards";
import { SongPlayerGrid } from "@/components/SongPlayer";
import { assetUrl, getAlbums, getArtists, getSongs } from "@/lib/api";

export default async function ArtistDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const artistId = Number(id);
  const [artists, albums, songs] = await Promise.all([getArtists(), getAlbums(), getSongs()]);
  const artist = artists.find((item) => item.id === artistId);

  if (!artist) notFound();

  const artistAlbums = albums.filter((album) => album.artist === artistId || album.artist_name === artist.name);
  const artistSongs = songs.filter((song) => song.artist === artistId || song.artist_name === artist.name);

  return (
    <section className="content-band page-pad">
      <div className="artist-hero">
        <div
          className="artist-hero-image"
          style={{ backgroundImage: artist.image_url ? `url("${assetUrl(artist.image_url)}")` : undefined }}
        />
        <div>
          <p className="eyebrow">Artist</p>
          <h1>{artist.name}</h1>
          <p>{artist.biography || `${artistSongs.length} songs and ${artistAlbums.length} albums in Antares.`}</p>
        </div>
      </div>

      <section className="detail-section">
        <SectionHeader eyebrow="Albums" title={`${artist.name} albums`} action={`${artistAlbums.length}`} />
        <div className="grid-cards">
          {artistAlbums.map((album) => (
            <Link href={`/albums/${album.id}`} className="music-card wide" key={album.id}>
              <div
                className="cover abstract-cover"
                style={{
                  backgroundImage: album.cover_image_url ? `url("${assetUrl(album.cover_image_url)}")` : undefined
                }}
              />
              <div>
                <h3>{album.title}</h3>
                <p>{album.song_count || 0} songs</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="detail-section">
        <SectionHeader eyebrow="Songs" title={`${artist.name} songs`} action={`${artistSongs.length}`} />
        <SongPlayerGrid songs={artistSongs} />
      </section>
    </section>
  );
}
