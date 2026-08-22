import { SectionHeader } from "@/components/MusicCards";

export default function ProfilePage() {
  return (
    <section className="content-band page-pad">
      <SectionHeader eyebrow="Account" title="Profile" action="Frontend ready" />
      <div className="profile-hero">
        <div className="profile-dp">A</div>
        <div>
          <p className="eyebrow">Listener profile</p>
          <h2>Antares User</h2>
          <p>Name, DP, email, bio, library stats, and plan details are ready for Django auth API wiring.</p>
        </div>
      </div>

      <div className="profile-grid">
        <div className="profile-panel">
          <h3>Personal details</h3>
          <label>
            Display name
            <input defaultValue="Antares User" />
          </label>
          <label>
            Email
            <input defaultValue="Ashu@gmail.com" />
          </label>
          <label>
            Bio
            <textarea defaultValue="Music lover on Antares." />
          </label>
          <button type="button">Save profile</button>
        </div>

        <div className="profile-panel">
          <h3>Profile picture</h3>
          <div className="upload-box">Drop image or choose DP</div>
          <button type="button">Upload picture</button>
        </div>

        <div className="profile-panel">
          <h3>Membership</h3>
          <p>Premium plan</p>
          <strong>Active</strong>
        </div>

        
      </div>
    </section>
  );
}
