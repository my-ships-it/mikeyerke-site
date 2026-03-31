import { referenceProfiles } from "@/lib/references";

export function SocialProofPanel() {
  const approved = referenceProfiles.filter((reference) => reference.status === "approved" && reference.quote);
  const pending = referenceProfiles.filter((reference) => reference.status === "pending");

  return (
    <section className="social-proof-panel">
      <div className="section-header">
        <h2>Leadership References</h2>
      </div>
      <p className="page-intro">
        Quote publishing is intentionally approval-based. Add verified endorsements once each reference explicitly
        signs off on attribution.
      </p>

      {approved.length > 0 ? (
        <div className="social-proof-grid">
          {approved.map((reference) => (
            <article className="social-proof-card" key={`${reference.role}-${reference.companyType}`}>
              <p className="meta">{reference.role}</p>
              <h3>{reference.companyType}</h3>
              <p>&ldquo;{reference.quote}&rdquo;</p>
            </article>
          ))}
        </div>
      ) : null}

      {pending.length > 0 ? (
        <div className="social-proof-grid">
          {pending.map((reference) => (
            <article className="social-proof-card social-proof-pending" key={`${reference.role}-${reference.companyType}`}>
              <p className="meta">Reference Slot</p>
              <h3>{reference.role}</h3>
              <p>{reference.companyType}</p>
              <p className="meta">Pending approval for public quote.</p>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}
