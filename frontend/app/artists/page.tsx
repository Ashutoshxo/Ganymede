import { SectionHeader } from "@/components/MusicCards";
import { assetUrl, getArtists } from "@/lib/api";
import Link from "next/link";

export default async function ArtistsPage() {
  const artists = await getArtists();

  return (
    <section className="content-band page-pad">
      <SectionHeader eyebrow="Browse" title="Artists" action={`${artists.length} from API`} />
      <div className="list-panel">
        {artists.map((artist, index) => (
          <Link href={`/artists/${artist.id}`} className="list-row artist-row" key={artist.id}>
            <span className="rank">{String(index + 1).padStart(2, "0")}</span>
            <span
              className="avatar"
              style={{ backgroundImage: artist.image_url ? `url("${assetUrl(artist.image_url)}")` : undefined }}
            />
            <strong>{artist.name}</strong>
            <span>{artist.song_count || 0} songs</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
