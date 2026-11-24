// Live open / closed status for the hero booking bar.
// The visitor's device supplies the current moment; it is read in Port Carling time
// (America/Toronto) so someone checking from another time zone still sees the truth.

export const TIME_ZONE = 'America/Toronto';

// Minutes after midnight, Sunday = 0 ... Saturday = 6. null = closed all day.
// Currently Tuesday to Sunday, Noon - 10pm.
export const SCHEDULE: ReadonlyArray<readonly [number, number] | null> = [
  [12 * 60, 22 * 60], // Sunday
  null, // Monday
  [12 * 60, 22 * 60], // Tuesday
  [12 * 60, 22 * 60], // Wednesday
  [12 * 60, 22 * 60], // Thursday
  [12 * 60, 22 * 60], // Friday
  [12 * 60, 22 * 60], // Saturday
];

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const SHORT: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

export type OpenStatus = { open: boolean; label: string };

function localNow(now: Date): { day: number; minutes: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TIME_ZONE,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '0';
  return { day: SHORT[get('weekday')] ?? 0, minutes: (Number(get('hour')) % 24) * 60 + Number(get('minute')) };
}

export function timeLabel(minutes: number): string {
  if (minutes === 12 * 60) return 'noon';
  if (minutes === 0) return 'midnight';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}${m ? `:${String(m).padStart(2, '0')}` : ''}${h < 12 ? 'am' : 'pm'}`;
}

export function getOpenStatus(now: Date = new Date()): OpenStatus {
  const { day, minutes } = localNow(now);
  const today = SCHEDULE[day];
  if (today && minutes >= today[0] && minutes < today[1]) return { open: true, label: 'Now open' };
  if (today && minutes < today[0]) return { open: false, label: `Closed - Opens at ${timeLabel(today[0])}` };
  for (let offset = 1; offset <= 7; offset++) {
    const d = (day + offset) % 7;
    const hours = SCHEDULE[d];
    if (!hours) continue;
    const when = offset === 1 ? 'tomorrow' : DAYS[d];
    return { open: false, label: `Closed - Opens ${when} at ${timeLabel(hours[0])}` };
  }
  return { open: false, label: 'Closed' };
}
