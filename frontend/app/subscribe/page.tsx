import { SectionHeader } from "@/components/MusicCards";

export default function SubscribePage() {
  return (
    <section className="content-band page-pad">
      <SectionHeader eyebrow="Checkout" title="Subscribe" />
      <div className="split-panel">
        <div>
          <h3>Payment handoff</h3>
          <p>This page will connect to the existing Django and PayPal payment flow.</p>
        </div>
        <div>
          <h3>Selected plan</h3>
          <p>Premium membership with clean confirmation and failure states.</p>
        </div>
      </div>
    </section>
  );
}
