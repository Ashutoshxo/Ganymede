import { Hero, SectionHeader } from "@/components/MusicCards";
import { SongPlayerGrid } from "@/components/SongPlayer";
import { featuredCollections } from "@/lib/content";
import { djangoBaseUrl, getSongs } from "@/lib/api";

export default async function HomePage() {
  const songs = await getSongs();

  return (
    <>
      <Hero />

      <section className="content-band">
        <SectionHeader eyebrow="Featured" title="Made for the new Antares users" action="Live shell" />
        <div className="collection-row">
          {featuredCollections.map((item) => (
            <article className="collection" key={item.title}>
              <div
                className="collection-image"
                style={{ backgroundImage: `url("${djangoBaseUrl}${item.image}")` }}
              />
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-band">
        <SectionHeader eyebrow="Catalog" title="Songs from Django API" action={`${songs.length || 4} tracks`} />
        <SongPlayerGrid songs={songs} />
      </section>
    </>
  );
}
