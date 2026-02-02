/**
 * Edit these constants for event details.
 * Venue name is used in Calendar buttons and VenueMapEmbed.
 */

export const DEBUTANT_NAME = "Riyhana Marielle Velarde";
export const EVENT_TITLE = "Riyhana Marielle Velarde's Debut";
export const EVENT_SUBTITLE = "Debut · 18th Birthday Celebration";

/** Editable: Event date shown in hero */
export const EVENT_DATE_LINE = "February 7, 2026";
/** Editable: Event time shown in hero */
export const EVENT_TIME = "6:00 P.M";

/** Editable: Venue name for calendar and map section */
export const VENUE_NAME = "South Drive Baguio Manor";
/** Editable: Venue address (shown in hero and venue section) */
export const VENUE_ADDRESS = "34 South Dr, Baguio, 2600 Benguet";

/** Reception map location (center + marker) */
export const VENUE_LAT = 16.411345525978525;
export const VENUE_LNG = 120.6111849236983;

/** Google Maps embed URL – built from venue coordinates (center + marker at same point) */
export const VENUE_MAP_EMBED_URL = `https://www.google.com/maps?q=${VENUE_LAT},${VENUE_LNG}&z=16&output=embed`;

/** Editable: Start datetime for calendar (YYYY-MM-DD HH:MM, 24h) */
export const EVENT_START = "2026-02-07T18:00:00";
/** Editable: End datetime for calendar */
export const EVENT_END = "2026-02-07T23:00:00";

/** Parents of the Debutante */
export const PARENTS = ["Migs Velarde Jr", "Kerklyne Velarde"] as const;

/** 18 Roses */
export const ROSES = [
  "Jermaine C. Torno",
  "Embher Guillson P. Benlingan",
  "Kevin Christmarc C. Aquino",
  "Edgardo Dupo",
  "Ezequiel Baron Sereño",
  "Carl Borabo",
  "Juztin Kobie J. Solito",
  "Xandrix Manzano",
  "Lanz Andrei Casupanan",
  "Andrei Toledo",
  "Jay Ar Narcilla",
  "Manuelito D. Sortejas",
  "Richard S. Beltran",
  "Franz Ely P. Pimienta",
  "Adrian James L. Saysayan",
  "Aaron Gabrielle L. Velarde",
  "Miguel Marco L. Velarde",
  "Miguelito T. Velarde Jr.",
] as const;

/** 18 Candles */
export const CANDLES = [
  "Jamairie Loven M. Penchog",
  "Adrianne U. Gigan",
  "Kirsten Elise E. Rimorin",
  "Rianne Cassie S. Sagun",
  "Yvannah Roe L. Saysayan",
  "Kylie Rae S. Saysayan",
  "Zareen Joy A. Liwas",
  "Noelle N. Marrero",
  "Patricia Jermaine Z. Cardenas",
  "Niña Therese R. Tecson",
  "Francheska Maine P. Pimienta",
  "Christine Joyce B. Pasiliao",
  "Merily P. Pimienta",
  "Anne Marie B. Estepa",
  "Ann Sortejas",
  "Veronica Rae S. Beltran",
  "Justine Mae L. Saysayan",
  "Kerklyne L. Velarde",
] as const;

/** 18 Envelopes */
export const ENVELOPES = [
  "Majo A. Liwas",
  "Rose Liwas",
  "Juanito S. Pasiliao Jr.",
  "Levi S. Beltran",
  "Myca T. Velarde",
  "Mary Jane D. Sortejas",
  "Venus Molina",
  "Rio Manansala",
  "Roger Ternida",
  "David S. Beltran",
  "Francis Pimienta",
  "Arnel Olsim",
  "Lisa Beltran",
  "Dulcinea Espiritu",
  "Zards Gacad",
  "Reggie Cawis",
  "Rod Osis",
  "Doddie Solis",
] as const;
