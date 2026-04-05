const MAX_FREE_ANONYMOUS = 2;
const MAX_FREE_REGISTERED = 5;

interface UsageRecord {
  count: number;
  registered: boolean;
  email?: string;
  month: string;
}

// In-memory store keyed by IP. Persists across requests in Fluid Compute.
// For a production app, replace with Redis/Upstash.
const store = new Map<string, UsageRecord>();

function getCurrentMonth(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

export function getUsage(ip: string): UsageRecord {
  const month = getCurrentMonth();
  const record = store.get(ip);
  if (!record || record.month !== month) {
    return { count: 0, registered: false, month };
  }
  return record;
}

export function incrementUsage(ip: string): UsageRecord {
  const record = getUsage(ip);
  record.count += 1;
  store.set(ip, record);
  return record;
}

export function registerUser(ip: string, email: string): UsageRecord {
  const record = getUsage(ip);
  record.registered = true;
  record.email = email;
  store.set(ip, record);
  return record;
}

export function getLimit(registered: boolean): number {
  return registered ? MAX_FREE_REGISTERED : MAX_FREE_ANONYMOUS;
}

export function getRemaining(ip: string): number {
  const record = getUsage(ip);
  const limit = getLimit(record.registered);
  return Math.max(0, limit - record.count);
}
