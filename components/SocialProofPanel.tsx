import { referenceProfiles } from "@/lib/references";

export function SocialProofPanel() {
  const approved = referenceProfiles.filter((reference) => reference.status === "approved" && reference.quote);

  if (approved.length === 0) {
    return null;
  }

  return (
    <section className="social-proof-panel">
      <div className="section-header">
        <h2>Leadership References</h2>
      </div>
      <div className="social-proof-grid">
        {approved.map((reference) => (
          <article className="social-proof-card" key={`${reference.role}-${reference.companyType}`}>
            <p className="meta">{reference.role}</p>
            <h3>{reference.companyType}</h3>
            <p>&ldquo;{reference.quote}&rdquo;</p>
          </article>
        ))}
      </div>
    </section>
  );
}
