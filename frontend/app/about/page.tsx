import { SectionHeader } from "@/components/MusicCards";

export default function AboutPage() {
  return (
    <section className="content-band page-pad">
      <SectionHeader eyebrow="About" title="Antares Music" />
      <p className="prose">
        Antares is being moved into a modern Next.js frontend while the current Django template
        experience remains available.
      </p>
    </section>
  );
}
