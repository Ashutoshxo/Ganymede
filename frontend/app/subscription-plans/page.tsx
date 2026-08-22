import Link from "next/link";
import { SectionHeader } from "@/components/MusicCards";

const plans = [
  { name: "Free", price: "0", detail: "Basic streaming and public catalog" },
  { name: "Premium", price: "199", detail: "Unlimited music, library, favorites, and playlists" },
  { name: "Family", price: "399", detail: "Shared access for a wider listener group" }
];

export default function PlansPage() {
  return (
    <section className="content-band page-pad">
      <SectionHeader eyebrow="Plans" title="Subscription plans" />
      <div className="pricing-grid">
        {plans.map((plan) => (
          <article className="price-card" key={plan.name}>
            <h3>{plan.name}</h3>
            <strong>Rs {plan.price}</strong>
            <p>{plan.detail}</p>
            <Link href="/subscribe">Choose</Link>
          </article>
        ))}
      </div>
    </section>
  );
}
