import { SectionHeader } from "@/components/MusicCards";
import { SongPlayerGrid } from "@/components/SongPlayer";
import { assetUrl, getAlbums, getArtists, getPlaylists, getSongs } from "@/lib/api";

export default async function LibraryPage() {
  const [playlists, songs, albums, artists] = await Promise.all([
    getPlaylists(),
    getSongs(),
    getAlbums(),
    getArtists()
  ]);
  const recentSongs = songs.slice(0, 6);

  return (
    <section className="content-band page-pad">
      <SectionHeader eyebrow="Your music" title="Library" action={`${songs.length} songs`} />

      <div className="stats-grid">
        <div className="stat">
          <strong>{songs.length}</strong>
          <span>Songs</span>
        </div>
        <div className="stat">
          <strong>{albums.length}</strong>
          <span>Albums</span>
        </div>
        <div className="stat">
          <strong>{artists.length}</strong>
          <span>Artists</span>
        </div>
        <div className="stat">
          <strong>{playlists.length}</strong>
          <span>Playlists</span>
        </div>
      </div>

      <section className="detail-section">
        <SectionHeader eyebrow="Recently added" title="Songs ready to play" />
        <SongPlayerGrid songs={recentSongs} />
      </section>

      <section className="detail-section">
        <SectionHeader eyebrow="Playlists" title="Your playlists" action={`${playlists.length}`} />
        <div className="grid-cards">
          {playlists.slice(0, 6).map((playlist) => (
            <article className="music-card wide" key={playlist.id}>
              <div
                className="cover abstract-cover"
                style={{
                  backgroundImage: playlist.cover_image_url ? `url("${assetUrl(playlist.cover_image_url)}")` : undefined
                }}
              />
              <div>
                <h3>{playlist.name}</h3>
                <p>{playlist.songs?.length || 0} songs</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="split-panel detail-section">
        <div>
          <h3>Favorites</h3>
          <p>Favorite songs and albums can plug into the existing Django favorite models next.</p>
        </div>
        <div>
          <h3>Following</h3>
          <p>Followed artists will sit here once the auth-specific API is connected.</p>
        </div>
      </div>
    </section>
  );
}
