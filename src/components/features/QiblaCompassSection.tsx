'use client';

import { useEffect, useMemo, useState } from 'react';
import { Compass, MapPin, Navigation, RotateCw } from 'lucide-react';
import { CITY_PRESETS } from '../../lib/prayerTimes';
import { useLanguage } from '../../context/LanguageContext';

export type CompassTargetId = 'kabah' | 'makkah' | 'madinah';

interface CompassTarget {
  id: CompassTargetId;
  labelId: string;
  labelEn: string;
  subId: string;
  subEn: string;
  lat: number;
  lon: number;
}

const COMPASS_TARGETS: CompassTarget[] = [
  {
    id: 'kabah',
    labelId: 'Ka’bah (Kiblat)',
    labelEn: 'Kaaba (Qibla)',
    subId: 'Masjidil Haram · Arah Sholat',
    subEn: 'Al-Masjid al-Haram · Prayer Qibla',
    lat: 21.422487,
    lon: 39.826206,
  },
  {
    id: 'makkah',
    labelId: 'Kota Makkah',
    labelEn: 'Makkah City',
    subId: 'Kawasan Mina / Arafah Makkah',
    subEn: 'Makkah Region Landmark',
    lat: 21.389082,
    lon: 39.857912,
  },
  {
    id: 'madinah',
    labelId: 'Kota Madinah',
    labelEn: 'Madinah City',
    subId: 'Masjid Nabawi · Kota Nabi ﷺ',
    subEn: 'Al-Masjid an-Nabawi · Madinah',
    lat: 24.46721,
    lon: 39.611149,
  },
];

const DEG2RAD = Math.PI / 180;
const RAD2DEG = 180 / Math.PI;

function computeBearing(fromLat: number, fromLon: number, toLat: number, toLon: number): number {
  const phi1 = fromLat * DEG2RAD;
  const phi2 = toLat * DEG2RAD;
  const deltaLambda = (toLon - fromLon) * DEG2RAD;
  const y = Math.sin(deltaLambda) * Math.cos(phi2);
  const x =
    Math.cos(phi1) * Math.sin(phi2) - Math.sin(phi1) * Math.cos(phi2) * Math.cos(deltaLambda);
  const theta = Math.atan2(y, x) * RAD2DEG;
  return (theta + 360) % 360;
}

function computeDistanceKm(fromLat: number, fromLon: number, toLat: number, toLon: number): number {
  const R = 6371;
  const dLat = (toLat - fromLat) * DEG2RAD;
  const dLon = (toLon - fromLon) * DEG2RAD;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(fromLat * DEG2RAD) * Math.cos(toLat * DEG2RAD) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function formatCardinal(deg: number, lang: 'id' | 'en'): string {
  const dirsId = [
    'Utara',
    'Timur Laut',
    'Timur',
    'Tenggara',
    'Selatan',
    'Barat Daya',
    'Barat',
    'Barat Laut',
  ];
  const dirsEn = [
    'North',
    'Northeast',
    'East',
    'Southeast',
    'South',
    'Southwest',
    'West',
    'Northwest',
  ];
  const idx = Math.round((deg % 360) / 45) % 8;
  return lang === 'en' ? dirsEn[idx] : dirsId[idx];
}

interface DeviceOrientationEventWithWebkit extends DeviceOrientationEvent {
  webkitCompassHeading?: number;
}

interface DeviceOrientationConstructorWithPerm {
  requestPermission?: () => Promise<'granted' | 'denied'>;
}

export function QiblaCompassSection() {
  const { lang, t } = useLanguage();
  const [selectedCityId, setSelectedCityId] = useState('jakarta');
  const [targetMode, setTargetMode] = useState<CompassTargetId>('kabah');
  const [coords, setCoords] = useState<{ label: string; lat: number; lon: number }>({
    label: CITY_PRESETS[0].name,
    lat: CITY_PRESETS[0].latitude,
    lon: CITY_PRESETS[0].longitude,
  });

  const [sensorActive, setSensorActive] = useState(false);
  const [deviceHeading, setDeviceHeading] = useState<number>(0);
  const [sensorNote, setSensorNote] = useState<string | null>(null);

  const metricsByTarget = useMemo(() => {
    return COMPASS_TARGETS.map((target) => ({
      ...target,
      bearing: computeBearing(coords.lat, coords.lon, target.lat, target.lon),
      distanceKm: computeDistanceKm(coords.lat, coords.lon, target.lat, target.lon),
    }));
  }, [coords.lat, coords.lon]);

  const activeMetric =
    metricsByTarget.find((m) => m.id === targetMode) ?? metricsByTarget[0];

  const needleRotation = (activeMetric.bearing - deviceHeading + 360) % 360;
  const isAligned = Math.min(needleRotation, 360 - needleRotation) <= 4;

  useEffect(() => {
    if (!sensorActive) return;

    const handleOrientation = (event: Event) => {
      const e = event as DeviceOrientationEventWithWebkit;
      let heading: number | null = null;
      if (typeof e.webkitCompassHeading === 'number' && !Number.isNaN(e.webkitCompassHeading)) {
        heading = e.webkitCompassHeading;
      } else if (typeof e.alpha === 'number' && !Number.isNaN(e.alpha)) {
        heading = (360 - e.alpha) % 360;
      }
      if (heading !== null) {
        setDeviceHeading(Math.round(heading));
      }
    };

    window.addEventListener('deviceorientationabsolute', handleOrientation, true);
    window.addEventListener('deviceorientation', handleOrientation, true);
    return () => {
      window.removeEventListener('deviceorientationabsolute', handleOrientation, true);
      window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  }, [sensorActive]);

  const handleEnableSensor = async () => {
    setSensorNote(null);
    const OrientationCtor = window.DeviceOrientationEvent as unknown as
      | DeviceOrientationConstructorWithPerm
      | undefined;

    if (!OrientationCtor) {
      setSensorNote(
        lang === 'en'
          ? 'Compass sensor is unavailable on this browser. Use the manual rotation slider below.'
          : 'Sensor kompas tidak tersedia di peramban ini. Gunakan penggeser putar manual di bawah.'
      );
      return;
    }

    if (typeof OrientationCtor.requestPermission === 'function') {
      try {
        const perm = await OrientationCtor.requestPermission();
        if (perm !== 'granted') {
          setSensorNote(
            lang === 'en'
              ? 'Compass sensor permission was denied.'
              : 'Izin akses sensor kompas ditolak.'
          );
          return;
        }
      } catch {
        setSensorNote(
          lang === 'en'
            ? 'Could not activate iOS compass sensor.'
            : 'Gagal meminta izin sensor kompas.'
        );
        return;
      }
    }

    setSensorActive(true);
    setSensorNote(
      lang === 'en'
        ? 'Compass sensor active. Hold device flat and rotate gently to calibrate.'
        : 'Sensor kompas aktif. Pegang perangkat mendatar dan putar perlahan untuk kalibrasi.'
    );
  };

  const handleUseGps = () => {
    if (!navigator.geolocation) {
      setSensorNote(
        lang === 'en' ? 'Geolocation is unsupported.' : 'Geolokasi tidak didukung peramban.'
      );
      return;
    }
    setSensorNote(lang === 'en' ? 'Fetching GPS coordinates...' : 'Mengambil koordinat GPS...');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          label: lang === 'en' ? 'GPS Location' : 'Lokasi GPS Saat Ini',
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
        setSelectedCityId('custom');
        setSensorNote(null);
      },
      () => {
        setSensorNote(
          lang === 'en'
            ? 'Location permission denied; using preset city coordinates.'
            : 'Izin lokasi ditolak; menggunakan koordinat kota terpilih.'
        );
      },
      { timeout: 8000 }
    );
  };

  const handleCitySelect = (cityId: string) => {
    setSelectedCityId(cityId);
    const found = CITY_PRESETS.find((c) => c.id === cityId);
    if (found) {
      setCoords({ label: found.name, lat: found.latitude, lon: found.longitude });
    }
  };

  return (
    <section id="kompas" aria-labelledby="heading-kompas" className="scroll-mt-24 space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4 pb-6 border-b border-[var(--color-border)]/70">
        <div>
          <p className="text-xs font-semibold tracking-wide text-primary-600 dark:text-primary-400">
            {t.kompas.kicker}
          </p>
          <h2
            id="heading-kompas"
            className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text-primary)]"
          >
            {lang === 'en' ? 'Qibla, Makkah & Madinah Compass' : 'Kompas Kiblat, Makkah & Madinah'}
          </h2>
          <p className="mt-1.5 text-sm sm:text-base text-[var(--color-text-secondary)] max-w-prose">
            {lang === 'en'
              ? 'Switch target direction between Kaaba (Qibla), Makkah city, and Madinah city with exact bearing and geodesic distance in km.'
              : 'Arahkan kompas ke Ka’bah (arah kiblat sholat), Kota Makkah, ataupun Kota Madinah lengkap dengan derajat sudut dan jarak kilometer.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="inline-flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-primary-600 dark:text-primary-400" aria-hidden="true" />
            <select
              aria-label={lang === 'en' ? 'Select city for Qibla compass' : 'Pilih kota kompas kiblat'}
              value={selectedCityId}
              onChange={(e) => handleCitySelect(e.target.value)}
              className="neu-inset-sm px-3 py-2 text-xs sm:text-sm font-medium text-[var(--color-text-primary)] focus:outline-none min-h-[40px]"
            >
              {CITY_PRESETS.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
              {selectedCityId === 'custom' && <option value="custom">{coords.label}</option>}
            </select>
          </div>

          <button
            type="button"
            onClick={handleUseGps}
            className="neu-outset-sm inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-[var(--color-text-primary)] hover:text-primary-600 dark:hover:text-primary-400 cursor-pointer min-h-[40px]"
          >
            <Navigation className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t.kompas.useGps}</span>
          </button>

          <button
            type="button"
            onClick={() => void handleEnableSensor()}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-xs sm:text-sm font-semibold cursor-pointer min-h-[40px]"
          >
            <Compass className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t.kompas.activateSensor}</span>
          </button>
        </div>
      </div>

      {/* Mode Switcher: Ka'bah (Kiblat) vs Kota Makkah vs Kota Madinah */}
      <div
        role="tablist"
        aria-label={lang === 'en' ? 'Compass target mode' : 'Mode arah kompas'}
        className="neu-inset-sm p-1.5 inline-flex flex-wrap gap-1.5"
      >
        {COMPASS_TARGETS.map((target) => {
          const active = target.id === targetMode;
          return (
            <button
              key={target.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTargetMode(target.id)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer min-h-[40px] ${
                active
                  ? 'neu-outset-sm text-primary-600 dark:text-primary-400'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              {lang === 'en' ? target.labelEn : target.labelId}
            </button>
          );
        })}
      </div>

      {sensorNote && (
        <p className="text-xs font-medium text-[var(--color-text-secondary)]">{sensorNote}</p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 neu-outset p-6 sm:p-8 flex flex-col items-center justify-center gap-5">
          <div className="relative w-60 h-60 sm:w-68 sm:h-68 neu-inset rounded-full flex items-center justify-center p-4">
            <svg
              viewBox="0 0 240 240"
              className="w-full h-full transition-transform duration-150"
              style={{ transform: `rotate(${-deviceHeading}deg)` }}
              aria-hidden="true"
            >
              <circle
                cx="120"
                cy="120"
                r="108"
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.18"
                strokeWidth="2"
              />
              <circle
                cx="120"
                cy="120"
                r="86"
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.12"
                strokeDasharray="4 4"
                strokeWidth="1.5"
              />
              <text x="120" y="26" textAnchor="middle" fill="#0d9488" fontSize="14" fontWeight="700">
                U / N
              </text>
              <text
                x="216"
                y="125"
                textAnchor="middle"
                fill="currentColor"
                fillOpacity="0.65"
                fontSize="12"
                fontWeight="600"
              >
                T / E
              </text>
              <text
                x="120"
                y="224"
                textAnchor="middle"
                fill="currentColor"
                fillOpacity="0.65"
                fontSize="12"
                fontWeight="600"
              >
                S
              </text>
              <text
                x="24"
                y="125"
                textAnchor="middle"
                fill="currentColor"
                fillOpacity="0.65"
                fontSize="12"
                fontWeight="600"
              >
                B / W
              </text>
            </svg>

            <svg
              viewBox="0 0 240 240"
              className="w-full h-full absolute inset-0 p-4 transition-transform duration-150 pointer-events-none"
              style={{ transform: `rotate(${needleRotation}deg)` }}
              role="img"
              aria-label={
                lang === 'en'
                  ? `Direction needle toward ${activeMetric.labelEn} at ${Math.round(activeMetric.bearing)} degrees`
                  : `Jarum arah ${activeMetric.labelId} ${Math.round(activeMetric.bearing)} derajat`
              }
            >
              <polygon
                points="120,28 131,120 120,108 109,120"
                fill={targetMode === 'madinah' ? '#2563eb' : '#0d9488'}
              />
              <polygon points="120,206 128,120 120,130 112,120" fill="#9ca3af" fillOpacity="0.45" />
              {targetMode === 'kabah' ? (
                <>
                  <rect
                    x="112"
                    y="42"
                    width="16"
                    height="16"
                    rx="2"
                    fill="#1c2128"
                    stroke="#c59429"
                    strokeWidth="1.5"
                  />
                  <line x1="112" y1="47" x2="128" y2="47" stroke="#c59429" strokeWidth="1.5" />
                </>
              ) : (
                <circle
                  cx="120"
                  cy="50"
                  r="7"
                  fill={targetMode === 'madinah' ? '#10b981' : '#c59429'}
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />
              )}
              <circle cx="120" cy="120" r="8" fill="#c59429" />
            </svg>
          </div>

          <p
            className={`text-sm font-semibold text-center ${
              isAligned ? 'text-primary-600 dark:text-primary-400' : 'text-[var(--color-text-secondary)]'
            }`}
          >
            {isAligned
              ? lang === 'en'
                ? `Aligned directly toward ${activeMetric.labelEn}`
                : `Arah perangkat tepat menghadap ${activeMetric.labelId}`
              : lang === 'en'
              ? `Turn toward ${Math.round(activeMetric.bearing)}° (${formatCardinal(
                  activeMetric.bearing,
                  'en'
                )}) for ${activeMetric.labelEn}`
              : `Arahkan ke ${Math.round(activeMetric.bearing)}° (${formatCardinal(
                  activeMetric.bearing,
                  'id'
                )}) menuju ${activeMetric.labelId}`}
          </p>

          <div className="w-full max-w-xs space-y-2 pt-2 border-t border-[var(--color-border)]/60">
            <label
              htmlFor="home-manual-heading"
              className="flex items-center justify-between text-xs font-medium text-[var(--color-text-secondary)]"
            >
              <span className="inline-flex items-center gap-1.5">
                <RotateCw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{t.kompas.manualDial}</span>
              </span>
              <span className="font-mono tabular-nums font-semibold text-[var(--color-text-primary)]">
                {deviceHeading}°
              </span>
            </label>
            <input
              id="home-manual-heading"
              type="range"
              min={0}
              max={359}
              value={deviceHeading}
              onChange={(e) => {
                setSensorActive(false);
                setDeviceHeading(Number(e.target.value));
              }}
              className="w-full accent-primary-600 cursor-pointer"
            />
          </div>
        </div>

        <div className="lg:col-span-6 neu-outset p-6 sm:p-8 space-y-5">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg font-bold text-[var(--color-text-primary)]">{coords.label}</h3>
            <span className="text-xs font-semibold text-primary-600 dark:text-primary-400">
              {lang === 'en' ? activeMetric.labelEn : activeMetric.labelId}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="neu-inset-sm p-4">
              <p className="text-xs font-medium text-[var(--color-text-secondary)]">
                {lang === 'en'
                  ? `Bearing to ${activeMetric.labelEn}`
                  : `Sudut Arah ${activeMetric.labelId}`}
              </p>
              <p className="mt-1 text-2xl font-bold font-mono tabular-nums text-primary-600 dark:text-primary-400">
                {activeMetric.bearing.toFixed(2)}°
              </p>
              <p className="mt-0.5 text-xs text-[var(--color-text-secondary)]">
                {formatCardinal(activeMetric.bearing, lang)}
              </p>
            </div>

            <div className="neu-inset-sm p-4">
              <p className="text-xs font-medium text-[var(--color-text-secondary)]">
                {lang === 'en'
                  ? `Distance to ${activeMetric.labelEn}`
                  : `Jarak ke ${activeMetric.labelId}`}
              </p>
              <p className="mt-1 text-2xl font-bold font-mono tabular-nums text-[var(--color-text-primary)]">
                {Math.round(activeMetric.distanceKm).toLocaleString(lang === 'en' ? 'en-US' : 'id-ID')} km
              </p>
              <p className="mt-0.5 text-xs text-[var(--color-text-secondary)]">
                {lang === 'en' ? activeMetric.subEn : activeMetric.subId}
              </p>
            </div>
          </div>

          {/* All Three Distances Side-by-Side */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-[var(--color-text-secondary)]">
              {lang === 'en'
                ? 'Distance & Bearing Comparison from Your Location'
                : 'Ringkasan Jarak & Sudut ke Tiga Lokasi Mulia'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {metricsByTarget.map((m) => {
                const isSelected = m.id === targetMode;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setTargetMode(m.id)}
                    className={`p-3 rounded-xl text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'neu-inset-sm ring-1 ring-primary-500/60'
                        : 'neu-outset-sm hover:ring-1 hover:ring-[var(--color-border)]'
                    }`}
                  >
                    <p className="text-xs font-bold text-[var(--color-text-primary)] truncate">
                      {lang === 'en' ? m.labelEn : m.labelId}
                    </p>
                    <p className="mt-1 text-sm font-mono font-bold tabular-nums text-primary-600 dark:text-primary-400">
                      {Math.round(m.distanceKm).toLocaleString(lang === 'en' ? 'en-US' : 'id-ID')} km
                    </p>
                    <p className="text-[11px] font-mono tabular-nums text-[var(--color-text-secondary)]">
                      {m.bearing.toFixed(1)}°
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="neu-inset-sm p-4 text-xs leading-relaxed text-[var(--color-text-secondary)] space-y-1">
            <p className="font-semibold text-[var(--color-text-primary)]">
              {lang === 'en' ? 'Dalil & Accuracy Note' : 'Landasan & Catatan Akurasi'}
            </p>
            <p>
              {lang === 'en'
                ? 'Calculated via spherical great-circle trigonometry. Use Kaaba (Qibla) mode for prayer direction (QS. Al-Baqarah: 144), or switch to Makkah and Madinah to measure distance and bearing.'
                : 'Dihitung dengan rumus trigonometri bola (Great-Circle). Gunakan mode Ka’bah untuk arah kiblat sholat (QS. Al-Baqarah: 144), serta mode Makkah dan Madinah untuk melihat perbandingan sudut dan jarak masing-masing.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
