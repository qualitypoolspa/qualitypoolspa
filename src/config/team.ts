// Team shown on the About page. Photos live in public/team/ and share one
// backdrop and framing (eyes on the same line, same face size), so new photos
// should be prepared the same way. Leave `photo` out to show a monogram instead.
export type TeamRole = "storeManager" | "sales" | "technician";

export type TeamMember = {
  name: string;
  role: TeamRole;
  location?: string;
  photo?: string;
  /** International format, e.g. "+34 648 448 875". */
  phone?: string;
};

export const team: TeamMember[] = [
  { name: "Maria", role: "storeManager", location: "Mallorca", photo: "/team/maria.webp", phone: "+34 648 448 875" },
  { name: "Ana", role: "storeManager", location: "Estepona", photo: "/team/ana.webp", phone: "+34 638 95 91 11" },
  { name: "Christian", role: "sales" },
  { name: "Oleg", role: "technician", photo: "/team/oleg.webp" },
];
