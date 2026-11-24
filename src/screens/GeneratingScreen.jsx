import { useEffect, useRef, useState } from 'react';
import { Check, Cpu, Loader2 } from 'lucide-react';
import { FlowBar } from '../components/FlowBar';
import { pluralStations } from '../lib/utils';

const STEPS = [
  'Формируем цифровые паспорта станков…',
  'Настраиваем виртуальные датчики…',
  'Собираем маршрут и профили износа…',
];

export function GeneratingScreen({ stations, onDone }) {
  const [step, setStep] = useState(0);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setStep(1), 620),
      window.setTimeout(() => setStep(2), 1240),
      window.setTimeout(() => onDoneRef.current(), 1850),
    ];
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, []);

  const progress = step === 0 ? 34 : step === 1 ? 68 : 94;

  return (
    <div className="pb-16">
      <FlowBar current={3} note="Генерация занимает 1–2 секунды" />

      <div className="container-page py-16 lg:py-20">
        <div className="panel mx-auto max-w-2xl overflow-hidden p-6 sm:p-9">
          <div className="flex flex-col items-center text-center">
            <div className="relative grid h-16 w-16 place-items-center rounded-full border border-ink/[0.08] bg-ink/[0.02]">
              <span className="absolute inset-0 animate-spin rounded-full border border-transparent border-t-amber-400/70" />
              <Cpu className="h-6 w-6 text-amber-300" strokeWidth={1.4} />
            </div>

            <h1 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-steel-100 sm:text-3xl">
              Собираем цифровой двойник
            </h1>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-steel-500">
              Подготавливаем демонстрационные паспорта и виртуальные датчики для выбранного
              участка.
            </p>

            <div className="mt-5 flex flex-wrap justify-center gap-1.5">
              {stations.slice(0, 4).map((station) => (
                <span
                  key={station.instanceId}
                  className="rounded-md border border-ink/[0.07] bg-ink/[0.02] px-2 py-1 font-mono text-[9px] text-steel-400"
                >
                  {station.model} #{station.number}
                </span>
              ))}
              {stations.length > 4 && (
                <span className="rounded-md border border-ink/[0.07] bg-ink/[0.02] px-2 py-1 font-mono text-[9px] text-steel-500">
                  +{stations.length - 4}
                </span>
              )}
            </div>

            <div className="mt-8 w-full max-w-md">
              <div className="flex items-center justify-between text-[10px] text-steel-500">
                <span>Генерация</span>
                <span className="mono text-steel-600">
                  {step + 1} / {STEPS.length}
                </span>
              </div>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-ink/[0.06]">
                <div
                  className="h-full rounded-full bg-amber-400/80 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <ol className="mt-6 grid w-full max-w-md gap-2 text-left">
              {STEPS.map((label, index) => {
                const done = index < step;
                const active = index === step;
                return (
                  <li
                    key={label}
                    className={`flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-[11px] ${
                      active
                        ? 'border-amber-400/20 bg-amber-400/[0.05] text-steel-100'
                        : done
                          ? 'border-ink/[0.06] bg-ink/[0.02] text-steel-300'
                          : 'border-ink/[0.04] text-steel-600'
                    }`}
                  >
                    {done ? (
                      <Check className="h-3.5 w-3.5 shrink-0 text-success-400" strokeWidth={2.2} />
                    ) : active ? (
                      <Loader2
                        className="h-3.5 w-3.5 shrink-0 animate-spin text-amber-300"
                        strokeWidth={1.8}
                      />
                    ) : (
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-steel-700" />
                    )}
                    {label}
                  </li>
                );
              })}
            </ol>

            <p className="mt-6 text-[10px] text-steel-600">
              {pluralStations(stations.length)} · демо-данные · без отправки на сервер
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
