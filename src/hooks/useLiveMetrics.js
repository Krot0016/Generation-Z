import { useEffect, useRef, useState } from 'react';
import { clamp } from '../lib/utils';

const UPDATE_MS = 2400;

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function seedMetrics(stations) {
  const result = {};
  stations.forEach((station) => {
    const base = station.baseline;
    result[station.instanceId] = {
      current: Number((base.current + randomBetween(-0.2, 0.2)).toFixed(1)),
      temp: Number((base.temp + randomBetween(-0.6, 0.6)).toFixed(1)),
      vibration: Number(
        clamp(base.vibration + randomBetween(-0.06, 0.06), 0.05, 9).toFixed(2),
      ),
      load: Math.round(clamp(base.load + randomBetween(-2, 2), 5, 96)),
    };
  });
  return result;
}

export function useLiveMetrics(stations) {
  const key = stations.map((station) => station.instanceId).join('|');
  const stationsRef = useRef(stations);
  stationsRef.current = stations;

  const [metrics, setMetrics] = useState(() => seedMetrics(stations));
  const [lastUpdated, setLastUpdated] = useState(() => new Date());

  useEffect(() => {
    setMetrics(seedMetrics(stationsRef.current));
    setLastUpdated(new Date());

    if (!stationsRef.current.length) return undefined;

    const interval = window.setInterval(() => {
      const currentStations = stationsRef.current;
      setMetrics((previous) => {
        const next = {};
        currentStations.forEach((station) => {
          const base = station.baseline;
          const current = previous[station.instanceId] || base;
          next[station.instanceId] = {
            current: Number(
              clamp(
                current.current + (base.current - current.current) * 0.18 + randomBetween(-0.25, 0.25),
                0.4,
                26,
              ).toFixed(1),
            ),
            temp: Number(
              clamp(
                current.temp + (base.temp - current.temp) * 0.18 + randomBetween(-0.45, 0.45),
                18,
                98,
              ).toFixed(1),
            ),
            vibration: Number(
              clamp(
                current.vibration +
                  (base.vibration - current.vibration) * 0.18 +
                  randomBetween(-0.06, 0.06),
                0.05,
                9,
              ).toFixed(2),
            ),
            load: Math.round(
              clamp(
                current.load + (base.load - current.load) * 0.16 + randomBetween(-1.4, 1.4),
                5,
                96,
              ),
            ),
          };
        });
        return next;
      });
      setLastUpdated(new Date());
    }, UPDATE_MS);

    return () => window.clearInterval(interval);
  }, [key]);

  return { metrics, lastUpdated };
}
