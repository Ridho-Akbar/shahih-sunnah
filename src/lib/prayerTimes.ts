export interface CityPreset {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  timezoneOffsetHours: number; // relative to UTC
}

export const CITY_PRESETS: CityPreset[] = [
  { id: 'jakarta', name: 'Jakarta (WIB)', latitude: -6.2088, longitude: 106.8456, timezoneOffsetHours: 7 },
  { id: 'bandung', name: 'Bandung (WIB)', latitude: -6.9175, longitude: 107.6191, timezoneOffsetHours: 7 },
  { id: 'yogyakarta', name: 'Yogyakarta (WIB)', latitude: -7.7956, longitude: 110.3695, timezoneOffsetHours: 7 },
  { id: 'surabaya', name: 'Surabaya (WIB)', latitude: -7.2575, longitude: 112.7521, timezoneOffsetHours: 7 },
  { id: 'medan', name: 'Medan (WIB)', latitude: 3.5952, longitude: 98.6722, timezoneOffsetHours: 7 },
  { id: 'makassar', name: 'Makassar (WITA)', latitude: -5.1477, longitude: 119.4327, timezoneOffsetHours: 8 },
  { id: 'jayapura', name: 'Jayapura (WIT)', latitude: -2.5916, longitude: 140.669, timezoneOffsetHours: 9 },
  { id: 'makkah', name: 'Makkah (AST)', latitude: 21.4225, longitude: 39.8262, timezoneOffsetHours: 3 },
];

export interface PrayerEntry {
  key: 'tahajud' | 'subuh' | 'dzuhur' | 'ashar' | 'maghrib' | 'isya';
  label: string;
  note?: string;
  minutesFromMidnight: number;
  formattedTime: string;
}

export interface PrayerScheduleSummary {
  cityLabel: string;
  hijriDate: string;
  gregorianDate: string;
  currentTimeFormatted: string;
  prayers: PrayerEntry[];
  nextPrayer: PrayerEntry;
  countdownFormatted: string;
  countdownSeconds: number;
}

const DEG2RAD = Math.PI / 180;
const RAD2DEG = 180 / Math.PI;

function fixAngle(angle: number): number {
  const a = angle - 360 * Math.floor(angle / 360);
  return a < 0 ? a + 360 : a;
}

function fixHour(hour: number): number {
  const h = hour - 24 * Math.floor(hour / 24);
  return h < 0 ? h + 24 : h;
}

function julianDay(year: number, month: number, day: number): number {
  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + B - 1524.5;
}

function sunPosition(jd: number): { declination: number; equationOfTime: number } {
  const D = jd - 2451545.0;
  const g = fixAngle(357.529 + 0.98560028 * D);
  const q = fixAngle(280.459 + 0.98564736 * D);
  const L = fixAngle(q + 1.915 * Math.sin(g * DEG2RAD) + 0.02 * Math.sin(2 * g * DEG2RAD));
  const e = 23.439 - 0.00000036 * D;
  const RA = Math.atan2(Math.cos(e * DEG2RAD) * Math.sin(L * DEG2RAD), Math.cos(L * DEG2RAD)) * RAD2DEG;
  const raHours = fixHour(RA / 15);
  const declination = Math.asin(Math.sin(e * DEG2RAD) * Math.sin(L * DEG2RAD)) * RAD2DEG;
  const equationOfTime = q / 15 - raHours;
  return { declination, equationOfTime };
}

function computeHourAngle(angleDeg: number, latitude: number, declination: number): number {
  const latRad = latitude * DEG2RAD;
  const declRad = declination * DEG2RAD;
  const num = -Math.sin(angleDeg * DEG2RAD) - Math.sin(latRad) * Math.sin(declRad);
  const den = Math.cos(latRad) * Math.cos(declRad);
  const cosVal = Math.max(-1, Math.min(1, num / den));
  return Math.acos(cosVal) * RAD2DEG / 15;
}

function computeAsrOffset(factor: number, latitude: number, declination: number): number {
  const angle = -Math.atan(1 / (factor + Math.tan(Math.abs(latitude - declination) * DEG2RAD))) * RAD2DEG;
  return computeHourAngle(angle, latitude, declination);
}

function hoursToMinutes(hours: number): number {
  const normalized = fixHour(hours);
  return Math.round(normalized * 60) % 1440;
}

export function formatMinutesToHHMM(totalMinutes: number): string {
  const normalized = ((totalMinutes % 1440) + 1440) % 1440;
  const hh = Math.floor(normalized / 60);
  const mm = normalized % 60;
  return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
}

export function formatHijriDate(date: Date, lang: 'id' | 'en' = 'id'): string {
  const localeBase = lang === 'en' ? 'en-US' : 'id-ID';
  const suffix = lang === 'en' ? 'AH' : 'H';
  try {
    const formatted = new Intl.DateTimeFormat(`${localeBase}-u-ca-islamic-umalqura`, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
    return /AH|H$/i.test(formatted) ? formatted : `${formatted} ${suffix}`;
  } catch {
    try {
      const fallback = new Intl.DateTimeFormat(`${localeBase}-u-ca-islamic`, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(date);
      return /AH|H$/i.test(fallback) ? fallback : `${fallback} ${suffix}`;
    } catch {
      return lang === 'en' ? 'Hijri Calendar' : 'Kalender Hijriah';
    }
  }
}

export function computePrayerSchedule(
  now: Date,
  coords: { cityLabel: string; latitude: number; longitude: number; timezoneOffsetHours: number },
  lang: 'id' | 'en' = 'id'
): PrayerScheduleSummary {
  const { latitude, longitude, timezoneOffsetHours } = coords;

  // Use local wall clock converted to target timezone when preset differs, or browser local time
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  const targetNow = new Date(utcMs + timezoneOffsetHours * 3600000);

  const year = targetNow.getFullYear();
  const month = targetNow.getMonth() + 1;
  const day = targetNow.getDate();

  const jd = julianDay(year, month, day) - longitude / 360;
  const { declination, equationOfTime } = sunPosition(jd);

  // Kemenag RI standard angles: Fajr 20°, Isha 18°, Maghrib 0.833°
  const noon = 12 + timezoneOffsetHours - longitude / 15 - equationOfTime;
  const fajrHours = noon - computeHourAngle(20, latitude, declination);
  const asrHours = noon + computeAsrOffset(1, latitude, declination);
  const maghribHours = noon + computeHourAngle(0.833, latitude, declination);
  const ishaHours = noon + computeHourAngle(18, latitude, declination);

  // Kemenag ihtiyat (+2 menit) for safety margin
  const subuhMin = hoursToMinutes(fajrHours) + 2;
  const dzuhurMin = hoursToMinutes(noon) + 2;
  const asharMin = hoursToMinutes(asrHours) + 2;
  const maghribMin = hoursToMinutes(maghribHours) + 2;
  const isyaMin = hoursToMinutes(ishaHours) + 2;

  // Last third of the night (Sepertiga Malam Terakhir / Tahajud):
  // Night duration = from Maghrib to Subuh (+ 1440 mins)
  const nightDuration = subuhMin + 1440 - maghribMin;
  const tahajudMin = (maghribMin + Math.round((nightDuration * 2) / 3)) % 1440;

  const prayers: PrayerEntry[] = [
    {
      key: 'tahajud',
      label: 'Tahajud',
      note: '1/3 Malam Akhir',
      minutesFromMidnight: tahajudMin,
      formattedTime: formatMinutesToHHMM(tahajudMin),
    },
    {
      key: 'subuh',
      label: 'Subuh',
      minutesFromMidnight: subuhMin,
      formattedTime: formatMinutesToHHMM(subuhMin),
    },
    {
      key: 'dzuhur',
      label: 'Dzuhur',
      minutesFromMidnight: dzuhurMin,
      formattedTime: formatMinutesToHHMM(dzuhurMin),
    },
    {
      key: 'ashar',
      label: 'Ashar',
      minutesFromMidnight: asharMin,
      formattedTime: formatMinutesToHHMM(asharMin),
    },
    {
      key: 'maghrib',
      label: 'Maghrib',
      minutesFromMidnight: maghribMin,
      formattedTime: formatMinutesToHHMM(maghribMin),
    },
    {
      key: 'isya',
      label: 'Isya',
      minutesFromMidnight: isyaMin,
      formattedTime: formatMinutesToHHMM(isyaMin),
    },
  ];

  // Sort prayers chronologically from 00:00 to determine next prayer accurately
  const sorted = [...prayers].sort((a, b) => a.minutesFromMidnight - b.minutesFromMidnight);
  const currentSecondsOfDay =
    targetNow.getHours() * 3600 + targetNow.getMinutes() * 60 + targetNow.getSeconds();

  let nextPrayer = sorted[0];
  let diffSeconds = sorted[0].minutesFromMidnight * 60 + 86400 - currentSecondsOfDay;

  for (const entry of sorted) {
    const entrySec = entry.minutesFromMidnight * 60;
    if (entrySec > currentSecondsOfDay) {
      nextPrayer = entry;
      diffSeconds = entrySec - currentSecondsOfDay;
      break;
    }
  }

  const cdHours = Math.floor(diffSeconds / 3600);
  const cdMins = Math.floor((diffSeconds % 3600) / 60);
  const cdSecs = diffSeconds % 60;
  const countdownFormatted = `${String(cdHours).padStart(2, '0')}:${String(cdMins).padStart(
    2,
    '0'
  )}:${String(cdSecs).padStart(2, '0')}`;

  const currentTimeFormatted = `${String(targetNow.getHours()).padStart(2, '0')}:${String(
    targetNow.getMinutes()
  ).padStart(2, '0')}:${String(targetNow.getSeconds()).padStart(2, '0')}`;

  const gregorianDate = new Intl.DateTimeFormat(lang === 'en' ? 'en-US' : 'id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(targetNow);

  return {
    cityLabel: coords.cityLabel,
    hijriDate: formatHijriDate(targetNow, lang),
    gregorianDate,
    currentTimeFormatted,
    prayers,
    nextPrayer,
    countdownFormatted,
    countdownSeconds: diffSeconds,
  };
}
