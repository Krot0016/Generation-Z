import { Fragment, useState } from 'react';
import {
  Activity,
  ArrowLeft,
  Clock,
  Cpu,
  Factory,
  GitBranch,
  Radio,
  Send,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '../components/Button';
import { ChainArrow } from '../components/ChainArrow';
import { FlowBar } from '../components/FlowBar';
import { RequestModal } from '../components/RequestModal';
import { TwinMark } from '../components/TwinMark';
import { TypeIcon } from '../components/TypeIcon';
import { useLiveMetrics } from '../hooks/useLiveMetrics';
import {
  formatNumber,
  formatTime,
  getStationStatus,
  plural,
  pluralStations,
} from '../lib/utils';

const PRODUCT_STATUS = {
  ok: {
    label: 'норма',
    dot: 'bg-product-green',
    text: 'text-product-green',
    pill: 'border-product-green-line bg-product-green-soft',
  },
  warn: {
    label: 'внимание',
    dot: 'bg-product-amber',
    text: 'text-product-amber',
    pill: 'border-product-amber-line bg-product-amber-soft',
  },
  alert: {
    label: 'отклонение',
    dot: 'bg-product-red',
    text: 'text-product-red',
    pill: 'border-product-red-line bg-product-red-soft',
  },
};

const TYPE_ACCENTS = {
  turning: (station) => (station.requiresSensors ? 'border-t-teal-400' : 'border-t-sky-400'),
  milling: (station) => (station.requiresSensors ? 'border-t-amber-400' : 'border-t-violet-400'),
  grinding: () => 'border-t-amber-400',
  cutting: () => 'border-t-teal-400',
};

function stationAccent(station) {
  const resolver = TYPE_ACCENTS[station.typeKey];
  return resolver ? resolver(station) : 'border-t-sky-400';
}

export function ResultScreen({ stations, onBackToBuilder }) {
  const [requestOpen, setRequestOpen] = useState(false);
  const { metrics, lastUpdated } = useLiveMetrics(stations);

  if (!stations.length) {
    return (
      <div className="pb-16">
        <FlowBar current={3} note="Демо-режим · TwinBoost" />
        <div className="container-page pt-6">
          <div className="rounded-2xl border border-product-line bg-product-surface p-8 text-center shadow-[0_36px_90px_-50px_rgba(11,27,51,0.3)]">
            <TwinMark className="mx-auto h-10 w-10" />
            <h1 className="mt-4 text-xl font-semibold text-product-ink">Конфигурация пуста</h1>
            <p className="mx-auto mt-2 max-w-md text-sm text-product-dim">
              Вернитесь в конструктор и добавьте хотя бы один станок.
            </p>
            <Button variant="product-secondary" className="mt-6" onClick={onBackToBuilder}>
              <ArrowLeft className="h-4 w-4" strokeWidth={1.8} />
              Вернуться в конструктор
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const totalChannels = stations.length * 4;
  const stationsGenitive = `${stations.length} ${plural(stations.length, [
    'станка',
    'станков',
    'станков',
  ])}`;

  return (
    <div className="pb-16">
      <FlowBar current={3} note="Демо-режим · TwinBoost" />

      <div className="container-page pt-6">
        <div className="overflow-hidden rounded-[22px] border border-ink/[0.09] bg-product-bg shadow-[0_45px_110px_-55px_rgba(11,27,51,0.35)]">
          <div className="border-b border-product-line bg-product-surface">
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
              <div className="flex items-center gap-2.5">
                <TwinMark className="h-9 w-9" />
                <div>
                  <div className="text-[14px] font-semibold leading-none text-product-ink">
                    TwinBoost
                  </div>
                  <div className="mt-1 text-[9px] uppercase tracking-[0.16em] text-product-mute">
                    цифровой двойник участка
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-product-green-line bg-product-green-soft px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-product-green">
                  <span className="live-dot h-1.5 w-1.5 rounded-full bg-product-green" />
                  live
                </span>
                <span className="mono text-[9px] text-product-mute">
                  обновлено {formatTime(lastUpdated)}
                </span>
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto px-4 pb-2.5 sm:px-6">
              <span className="rounded-md bg-product-accent px-2.5 py-1 text-[9px] font-semibold text-white">
                Мониторинг
              </span>
              <span className="px-1 py-1 text-[9px] text-product-mute">Аналитика</span>
              <span className="px-1 py-1 text-[9px] text-product-mute">Симуляция</span>
            </div>
          </div>

          <div className="border-b border-product-amber-line bg-product-amber-soft px-4 py-3.5 sm:px-6">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-3">
                <span className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border border-product-amber-line bg-product-bg/70 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-product-amber">
                  <span className="h-1.5 w-1.5 rounded-full bg-product-amber" />
                  демо-режим
                </span>
                <div>
                  <p className="text-[13px] font-medium leading-relaxed text-product-ink">
                    Сгенерировано на основе вашей конфигурации (
                    {pluralStations(stations.length)}).
                  </p>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-product-dim">
                    Показатели обновляются в браузере каждые 2,4 секунды. Это не подключение к
                    реальному оборудованию.
                  </p>
                </div>
              </div>
              <Button
                variant="product"
                onClick={() => setRequestOpen(true)}
                className="shrink-0"
              >
                <Send className="h-4 w-4" strokeWidth={1.8} />
                Оставить заявку на подключение в цеху
              </Button>
            </div>
          </div>

          <div className="px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-product-mute">
                  Результат генерации
                </div>
                <h1 className="mt-2 text-[28px] font-semibold leading-tight tracking-[-0.035em] text-product-ink sm:text-[34px]">
                  Цифровой двойник вашего участка
                </h1>
                <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-product-dim">
                  Маршрут из {stationsGenitive} с виртуальными датчиками. Нажмите на заявку,
                  чтобы обсудить пилотное подключение.
                </p>
              </div>
              <Button variant="product-secondary" onClick={onBackToBuilder} className="shrink-0">
                <ArrowLeft className="h-4 w-4" strokeWidth={1.8} />
                Вернуться в конструктор
              </Button>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
              <SummaryStat icon={Factory} label="Станков" value={formatNumber(stations.length)} />
              <SummaryStat icon={GitBranch} label="Этапов" value={formatNumber(stations.length)} />
              <SummaryStat icon={Activity} label="Каналов" value={formatNumber(totalChannels)} />
              <SummaryStat icon={Clock} label="Обновление" value="2,4 с" />
            </div>

            <section className="mt-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-product-mute">
                    Сгенерированная цепочка
                  </div>
                  <h2 className="mt-2 text-xl font-medium tracking-[-0.02em] text-product-ink">
                    Маршрут и живые показатели
                  </h2>
                </div>
                <span className="text-[10px] text-product-mute">
                  {pluralStations(stations.length)} · {totalChannels} каналов
                </span>
              </div>

              <div className="thin-scroll mt-4 flex flex-col gap-0 pb-2 lg:flex-row lg:flex-nowrap lg:overflow-x-auto">
                {stations.map((station, index) => (
                  <Fragment key={station.instanceId}>
                    <StationCard
                      station={station}
                      index={index}
                      metrics={metrics[station.instanceId] || station.baseline}
                    />
                    {index < stations.length - 1 && <ChainArrow />}
                  </Fragment>
                ))}
              </div>

              <p className="mt-4 flex items-start gap-1.5 text-[10px] leading-relaxed text-product-mute">
                <ShieldCheck className="mt-0.5 h-3 w-3 shrink-0" strokeWidth={1.7} />
                Демонстрационные данные: значения имитируются на клиенте и не являются
                заключением о состоянии оборудования.
              </p>
            </section>
          </div>

          <div className="flex flex-col gap-1 border-t border-product-line bg-product-soft px-4 py-3 text-[9px] text-product-mute sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <span>TwinBoost · демонстрационный двойник</span>
            <span>Обновление каждые 2,4 с · данные не покидают браузер</span>
          </div>
        </div>
      </div>

      <RequestModal
        open={requestOpen}
        onClose={() => setRequestOpen(false)}
        stationCount={stations.length}
      />
    </div>
  );
}

function SummaryStat({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-product-line bg-product-surface px-3.5 py-3">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-product-line bg-product-bg text-product-accent">
        <Icon className="h-3.5 w-3.5" strokeWidth={1.7} />
      </span>
      <div>
        <div className="text-[9px] uppercase tracking-[0.12em] text-product-mute">{label}</div>
        <div className="mono mt-0.5 text-sm text-product-ink">{value}</div>
      </div>
    </div>
  );
}

function StationCard({ station, index, metrics }) {
  const status = getStationStatus(metrics, station.limits);
  const statusMeta = PRODUCT_STATUS[status];

  return (
    <article
      className={`flex w-full shrink-0 flex-col rounded-xl border border-product-line border-t-2 bg-product-surface p-4 lg:w-[240px] ${stationAccent(
        station,
      )}`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-product-accent">
          Этап {index + 1}
        </span>
        <span
          className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[8px] uppercase tracking-[0.1em] ${statusMeta.pill} ${statusMeta.text}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${statusMeta.dot}`} />
          {statusMeta.label}
        </span>
      </div>

      <div className="mt-3 flex items-start gap-2.5">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-product-line bg-product-bg text-product-dim">
          <TypeIcon typeKey={station.typeKey} className="h-4 w-4" />
        </span>
        <div className="min-w-0">
          <h3 className="truncate text-sm font-medium text-product-ink">{station.model}</h3>
          <p className="mt-0.5 text-[10px] text-product-mute">
            #{station.number} · {station.typeLabel} · {station.year}
          </p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[9px] text-product-mute">
        <span className="mono">{station.inventory}</span>
        <span className="h-2.5 w-px bg-product-line" />
        {station.requiresSensors ? (
          <Radio className="h-2.5 w-2.5" strokeWidth={1.8} />
        ) : (
          <Cpu className="h-2.5 w-2.5" strokeWidth={1.8} />
        )}
        {station.sensorsLabel}
      </div>

      <div className="mt-3.5 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-product-line bg-product-line">
        <ProductMetric label="Ток фазы" value={metrics.current} unit="А" digits={1} />
        <ProductMetric label="Температура" value={metrics.temp} unit="°C" digits={1} />
        <ProductMetric label="Вибрация" value={metrics.vibration} unit="мм/с" digits={2} />
        <ProductMetric label="Загрузка" value={metrics.load} unit="%" digits={0} bar />
      </div>

      <div className="mt-3 flex items-center justify-between text-[9px] text-product-mute">
        <span>4 канала</span>
        <span className="mono">#{station.number}</span>
      </div>
    </article>
  );
}

function ProductMetric({ label, value, unit, digits, bar }) {
  return (
    <div className="bg-product-surface px-2.5 py-2">
      <div className="text-[8px] uppercase tracking-[0.1em] text-product-mute">{label}</div>
      <div className="mono mt-0.5 text-[15px] leading-none text-product-ink">
        {formatNumber(value, digits)}{' '}
        <span className="text-[9px] font-normal text-product-mute">{unit}</span>
      </div>
      {bar && (
        <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-product-line">
          <div
            className="h-full rounded-full bg-product-accent/80 transition-[width] duration-700"
            style={{ width: `${Math.max(2, Math.min(100, value))}%` }}
          />
        </div>
      )}
    </div>
  );
}
