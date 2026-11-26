'use client';

import { useEffect, useMemo, useState } from 'react';
import { Clock, MapPin, Navigation } from 'lucide-react';
import { CITY_PRESETS, computePrayerSchedule } from '../../lib/prayerTimes';
import { useLanguage } from '../../context/LanguageContext';

interface CustomCoords {
  cityLabel: string;
  latitude: number;
  longitude: number;
  timezoneOffsetHours: number;
}

const INITIAL_DATE = new Date(2025, 0, 1, 0, 0, 0);

export function LivePrayerWidget() {
  const { lang } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState<Date>(INITIAL_DATE);
  const [selectedCityId, setSelectedCityId] = useState<string>('jakarta');
  const [customCoords, setCustomCoords] = useState<CustomCoords | null>(null);
  const [geoStatus, setGeoStatus] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    setNow(new Date());
    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const activeCoords = useMemo(() => {
    if (customCoords && selectedCityId === 'custom') {
      return customCoords;
    }
    const preset = CITY_PRESETS.find((c) => c.id === selectedCityId) || CITY_PRESETS[0];
    return {
      cityLabel: preset.name,
      latitude: preset.latitude,
      longitude: preset.longitude,
      timezoneOffsetHours: preset.timezoneOffsetHours,
    };
  }, [customCoords, selectedCityId]);

  const schedule = useMemo(
    () => computePrayerSchedule(now, activeCoords, lang),
    [now, activeCoords, lang]
  );

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setGeoStatus(
        lang === 'en' ? 'Geolocation is not supported by your browser.' : 'Geolokasi tidak didukung peramban.'
      );
      return;
    }
    setGeoStatus(lang === 'en' ? 'Locating...' : 'Mencari lokasi...');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const tzOffsetHours = -new Date().getTimezoneOffset() / 60;
        setCustomCoords({
          cityLabel: lang === 'en' ? 'Current Location' : 'Lokasi Saat Ini',
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          timezoneOffsetHours: tzOffsetHours,
        });
        setSelectedCityId('custom');
        setGeoStatus(null);
      },
      () => {
        setGeoStatus(
          lang === 'en'
            ? 'Location permission denied; using selected city.'
            : 'Izin lokasi ditolak; menggunakan kota terpilih.'
        );
      },
      { timeout: 8000 }
    );
  };

  const localizedPrayerNote = (key: string, note?: string) => {
    if (!note) return undefined;
    if (lang === 'en' && key === 'tahajud') {
      return 'Last 1/3 Night';
    }
    return note;
  };

  const localizedPrayerLabel = (key: string, label: string) => {
    if (lang !== 'en') return label;
    switch (key) {
      case 'subuh':
        return 'Fajr';
      case 'dzuhur':
        return 'Dhuhr';
      case 'ashar':
        return 'Asr';
      case 'maghrib':
        return 'Maghrib';
      case 'isya':
        return 'Isha';
      default:
        return label;
    }
  };

  return (
    <div
      className="mt-8 neu-outset p-5 sm:p-6 space-y-5"
      aria-label={
        lang === 'en'
          ? 'Live prayer times and Hijri calendar'
          : 'Jadwal waktu sholat dan kalender Hijriah'
      }
    >
      {/* Top Bar: Hijri Date, Live Clock, City Selector */}
      <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-[var(--color-border)]/60">
        <div>
          <p className="text-xs font-semibold text-primary-600 dark:text-primary-400">
            {schedule.hijriDate}
          </p>
          <p className="mt-0.5 text-xs text-[var(--color-text-secondary)]">
            {schedule.gregorianDate}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)]">
            <MapPin className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" aria-hidden="true" />
            <select
              aria-label={lang === 'en' ? 'Select prayer times city' : 'Pilih kota jadwal sholat'}
              value={selectedCityId}
              onChange={(e) => setSelectedCityId(e.target.value)}
              className="neu-inset-sm px-2.5 py-1.5 text-xs font-medium text-[var(--color-text-primary)] focus:outline-none cursor-pointer"
            >
              {CITY_PRESETS.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
              {customCoords && <option value="custom">{customCoords.cityLabel}</option>}
            </select>
          </div>

          <button
            type="button"
            onClick={handleUseLocation}
            title={lang === 'en' ? 'Use current GPS location' : 'Gunakan lokasi GPS saat ini'}
            aria-label={lang === 'en' ? 'Use current GPS location' : 'Gunakan lokasi GPS saat ini'}
            className="neu-outset-sm p-2 text-[var(--color-text-secondary)] hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer"
          >
            <Navigation className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Live Clock & Countdown to Next Prayer */}
      <div className="neu-inset-sm px-4 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <Clock className="w-4 h-4 text-primary-600 dark:text-primary-400 shrink-0" aria-hidden="true" />
          <div>
            <p className="text-[11px] font-medium text-[var(--color-text-secondary)]">
              {lang === 'en' ? 'Current Time' : 'Waktu Sekarang'}
            </p>
            <p className="text-lg font-bold tracking-tight text-[var(--color-text-primary)] font-mono tabular-nums">
              {mounted ? schedule.currentTimeFormatted : '--:--:--'}
            </p>
          </div>
        </div>

        <div className="text-left sm:text-right">
          <p className="text-[11px] font-medium text-[var(--color-text-secondary)]">
            {lang === 'en' ? 'Next:' : 'Menuju'}{' '}
            <span className="font-semibold text-primary-600 dark:text-primary-400">
              {localizedPrayerLabel(schedule.nextPrayer.key, schedule.nextPrayer.label)}
            </span>{' '}
            ({schedule.nextPrayer.formattedTime})
          </p>
          <p className="text-lg font-bold tracking-tight text-primary-600 dark:text-primary-400 font-mono tabular-nums">
            {mounted
              ? lang === 'en'
                ? `in ${schedule.countdownFormatted}`
                : `${schedule.countdownFormatted} lagi`
              : '--:--:--'}
          </p>
        </div>
      </div>

      {geoStatus && <p className="text-xs text-[var(--color-text-secondary)]">{geoStatus}</p>}

      {/* 6-Prayer Schedule Grid (including Tahajud) */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
        {schedule.prayers.map((prayer) => {
          const isNext = prayer.key === schedule.nextPrayer.key;
          const note = localizedPrayerNote(prayer.key, prayer.note);
          return (
            <div
              key={prayer.key}
              className={`px-2.5 py-2.5 rounded-xl text-center transition-all ${
                isNext ? 'neu-inset-sm ring-1 ring-primary-500/40' : 'neu-outset-sm'
              }`}
            >
              <p
                className={`text-[11px] font-semibold truncate ${
                  isNext
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-[var(--color-text-secondary)]'
                }`}
              >
                {localizedPrayerLabel(prayer.key, prayer.label)}
              </p>
              <p className="mt-0.5 text-sm font-bold text-[var(--color-text-primary)] font-mono tabular-nums">
                {prayer.formattedTime}
              </p>
              {note && (
                <p className="mt-0.5 text-[10px] text-[var(--color-text-secondary)] truncate">
                  {note}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
