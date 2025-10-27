import crypto from "node:crypto";

const reservedUsernames = new Set<string>([
  "stargazer",
  "wanderlust",
  "chatmaster",
  "pixelpilot",
  "moonlight",
  "aurora",
  "skycoder",
  "lumen",
  "pulsewave",
  "zenith",
]);

const sessionReservations = new Map<string, number>();

const ADJECTIVES = [
  "velvet",
  "electric",
  "lunar",
  "stellar",
  "midnight",
  "radiant",
  "aurora",
  "sonic",
  "crimson",
  "vivid",
  "mystic",
  "cobalt",
  "ember",
  "neon",
  "roaming",
  "swift",
  "quantum",
  "sapphire",
];

const NOUNS = [
  "traveler",
  "dreamer",
  "pulse",
  "haze",
  "wave",
  "echo",
  "pixels",
  "drifter",
  "comet",
  "atlas",
  "compass",
  "spark",
  "signal",
  "voyager",
  "rider",
  "whisper",
  "solace",
  "horizon",
];

function normalizeUsername(username: string) {
  return username.trim().toLowerCase();
}

function cleanupExpiredReservations(ttlMinutes = 30) {
  const now = Date.now();
  const ttlMs = ttlMinutes * 60 * 1000;

  for (const [name, timestamp] of sessionReservations.entries()) {
    if (now - timestamp > ttlMs) {
      sessionReservations.delete(name);
    }
  }
}

function isUsernameAvailable(username: string) {
  cleanupExpiredReservations();
  const normalized = normalizeUsername(username);
  return (
    !reservedUsernames.has(normalized) && !sessionReservations.has(normalized)
  );
}

function reserveUsername(username: string) {
  const normalized = normalizeUsername(username);
  sessionReservations.set(normalized, Date.now());
}

function generateToken(size = 3) {
  return crypto
    .randomBytes(size)
    .toString("hex")
    .slice(0, size + 1);
}

function generateSuggestions(base: string, count = 5) {
  const normalized = normalizeUsername(base).replace(/[^a-z0-9_]/g, "");
  const suggestions = new Set<string>();

  if (normalized.length >= 3) {
    suggestions.add(`${normalized}_${generateToken(2)}`);
    suggestions.add(`${normalized}${generateToken(1)}`);
  }

  while (suggestions.size < count) {
    const adjective = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
    const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
    suggestions.add(`${adjective}_${noun}`.slice(0, 18));
  }

  return Array.from(suggestions).slice(0, count);
}

export const usernameService = {
  normalizeUsername,
  isUsernameAvailable,
  reserveUsername,
  generateSuggestions,
};
