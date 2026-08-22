import { SectionHeader } from "@/components/MusicCards";

const stats = ["Saved songs", "Albums", "Following", "Playlists"];

export default function DashboardPage() {
  return (
    <section className="content-band page-pad">
      <SectionHeader eyebrow="Overview" title="Dashboard" />
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div className="stat" key={stat}>
            <strong>{index === 0 ? "24" : index === 1 ? "8" : index === 2 ? "12" : "5"}</strong>
            <span>{stat}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
