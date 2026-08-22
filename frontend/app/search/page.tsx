import { SectionHeader } from "@/components/MusicCards";
import { SongPlayerGrid } from "@/components/SongPlayer";
import { getAlbums, getArtists, getSongs } from "@/lib/api";

export default async function SearchPage({
  searchParams
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const query = q.trim().toLowerCase();
  const [songs, artists, albums] = await Promise.all([getSongs(), getArtists(), getAlbums()]);

  const songResults = query
    ? songs.filter((song) =>
        [song.title, song.artist_name, song.album_name, song.genre_name]
          .filter(Boolean)
          .some((value) => value?.toLowerCase().includes(query))
      )
    : [];
  const artistResults = query
    ? artists.filter((artist) => artist.name.toLowerCase().includes(query))
    : [];
  const albumResults = query
    ? albums.filter((album) =>
        [album.title, album.artist_name]
          .filter(Boolean)
          .some((value) => value?.toLowerCase().includes(query))
      )
    : [];

  return (
    <section className="content-band page-pad">
      <SectionHeader eyebrow="Find" title="Search" action={query ? `${songResults.length + artistResults.length + albumResults.length} results` : "Type and search"} />
      <form className="search-form" action="/search">
        <input name="q" defaultValue={q} placeholder="Search songs, artists, albums" />
        <button type="submit">Search</button>
      </form>

      {query ? (
        <div className="search-results">
          <SectionHeader eyebrow="Tracks" title="Matching songs" />
          <SongPlayerGrid songs={songResults} />

          <div className="split-panel">
            <div>
              <h3>Artists</h3>
              <div className="compact-list">
                {artistResults.length ? (
                  artistResults.map((artist) => <span key={artist.id}>{artist.name}</span>)
                ) : (
                  <p>No artist found.</p>
                )}
              </div>
            </div>
            <div>
              <h3>Albums</h3>
              <div className="compact-list">
                {albumResults.length ? (
                  albumResults.map((album) => <span key={album.id}>{album.title}</span>)
                ) : (
                  <p>No album found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
