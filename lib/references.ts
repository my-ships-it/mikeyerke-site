export type ReferenceProfile = {
  role: string;
  companyType: string;
  quote?: string;
  status: "approved" | "pending";
};

export const referenceProfiles: ReferenceProfile[] = [
  {
    role: "VP Revenue Operations",
    companyType: "Enterprise B2B SaaS",
    status: "pending"
  },
  {
    role: "Head of Sales",
    companyType: "Growth-stage GTM org",
    status: "pending"
  },
  {
    role: "Director of Customer Success Operations",
    companyType: "Multi-segment SaaS",
    status: "pending"
  }
];
