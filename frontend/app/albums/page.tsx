import { SectionHeader } from "@/components/MusicCards";
import { assetUrl, getAlbums } from "@/lib/api";
import Link from "next/link";

export default async function AlbumsPage() {
  const albums = await getAlbums();

  return (
    <section className="content-band page-pad">
      <SectionHeader eyebrow="Browse" title="Albums" action={`${albums.length} from API`} />
      <div className="grid-cards">
        {albums.map((album) => (
          <Link href={`/albums/${album.id}`} className="music-card wide" key={album.id}>
            <div
              className="cover abstract-cover"
              style={{
                backgroundImage: album.cover_image_url ? `url("${assetUrl(album.cover_image_url)}")` : undefined
              }}
            />
            <div>
              <h3>{album.title}</h3>
              <p>{album.artist_name || "Unknown artist"} · {album.song_count || 0} songs</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
