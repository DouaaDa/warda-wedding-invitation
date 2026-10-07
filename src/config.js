// ============================================================
// Central configuration — edit here, changes appear everywhere
// ============================================================
export const wedding = {
  // Names
  groom: "Yasser",
  groomFullName: "Yasser Beladghame",
  bride: "Warda",
  brideFullName: "Warda Azeri",

  // Date & Time  (ISO format for countdown; display is formatted in components)
  year: 2027,
  date: "2027-01-30",          // ISO — used for countdown
  dateDisplay: "30 January 2027",  // Human-readable
  time: "19:00",
  timeDisplay: "19H00",

  // Venue
  venue: "Salle des Fêtes Palmeraie",
  city: "Tlemcen, Algérie",
  address: "Salle des Fêtes Palmeraie, Tlemcen, Algérie",
  // Google Maps directions link for Salle des Fêtes Palmeraie, Tlemcen
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Salle+des+Fetes+Palmeraie+Tlemcen+Algerie",

  // Arabic Quranic verse — used as hero quote
  arabicQuote: "وَجَعَلْنَاكُمْ أَزْوَاجًا",

  // Invitation texts
  invitationText: "Vous êtes cordialement invités à célébrer avec nous ce jour si particulier.",
  closingText: "Nous avons hâte de partager ce moment avec vous.",

  // Photos — managed via Admin / Supabase Storage
  couplePhoto1: "/couple_photo_1.png",   // Large portrait
  couplePhoto2: "/couple_photo_2.jpg",   // Smaller overlapping portrait

  // Music — optional. Leave empty string if no file.
  musicUrl: "/music/wedding-song.mp3",

  // Gallery (Supabase managed)
  gallery: [],
};
