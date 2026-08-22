import { SectionHeader } from "@/components/MusicCards";
import { SongPlayerGrid } from "@/components/SongPlayer";
import { getSongs } from "@/lib/api";

export default async function SongsPage() {
  const songs = await getSongs();

  return (
    <section className="content-band page-pad">
      <SectionHeader eyebrow="Browse" title="Songs" action={`${songs.length || 0} from API`} />
      <SongPlayerGrid songs={songs} />
    </section>
  );
}
