import { Fragment, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Cpu,
  GitBranch,
  Info,
  Plus,
  Radio,
  RotateCcw,
  SearchX,
  SlidersHorizontal,
  Trash2,
  X,
} from 'lucide-react';
import { Button } from '../components/Button';
import { ChainArrow } from '../components/ChainArrow';
import { FlowBar } from '../components/FlowBar';
import { TypeIcon } from '../components/TypeIcon';
import { machines, MODEL_FILTERS, TYPE_FILTERS, YEAR_FILTERS } from '../data/content';
import { cn, pluralStations } from '../lib/utils';

const INITIAL_FILTERS = { type: 'all', model: 'all', era: 'all' };

export function BuilderScreen({
  added,
  route,
  onAdd,
  onRemove,
  onAppend,
  onResetRoute,
  onRemoveStage,
  onGenerate,
  onBack,
}) {
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const filteredMachines = useMemo(
    () =>
      machines.filter((machine) => {
        if (filters.type !== 'all' && machine.typeKey !== filters.type) return false;
        if (filters.model !== 'all' && machine.id !== filters.model) return false;
        if (filters.era !== 'all' && machine.era !== filters.era) return false;
        return true;
      }),
    [filters],
  );

  const addedCounts = useMemo(() => {
    return added.reduce((counts, station) => {
      counts[station.id] = (counts[station.id] || 0) + 1;
      return counts;
    }, {});
  }, [added]);

  const addedById = useMemo(() => {
    const map = new Map();
    added.forEach((station) => map.set(station.instanceId, station));
    return map;
  }, [added]);

  const routeStations = route.map((id) => addedById.get(id)).filter(Boolean);
  const activeFilters =
    filters.type !== 'all' || filters.model !== 'all' || filters.era !== 'all';
  const generationCount = routeStations.length || added.length;

  function updateFilter(key, value) {
    setFilters((previous) => ({ ...previous, [key]: value }));
  }

  function resetFilters() {
    setFilters(INITIAL_FILTERS);
  }

  return (
    <div className="pb-16">
      <FlowBar current={2} note="Соберите маршрут деталей" />

      <div className="container-page pt-10">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs text-steel-500 transition-colors hover:text-steel-200"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.8} />
          К импорту
        </button>

        <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="eyebrow">Шаг 2 · ручная сборка</div>
            <h1 className="mt-3 text-balance text-[30px] font-semibold leading-tight tracking-[-0.035em] text-steel-100 sm:text-[38px]">
              Соберите цех и маршрут деталей
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-steel-400">
              Добавьте станки из каталога, затем нажмите на них в том порядке, в котором по ним
              движется деталь. Мы автоматически построим этапы и связи.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <span className="rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-2 font-mono text-[10px] text-steel-400">
              В цеху: <span className="text-steel-100">{added.length}</span>
            </span>
            <span className="rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-2 font-mono text-[10px] text-steel-400">
              В маршруте: <span className="text-amber-300">{routeStations.length}</span>
            </span>
          </div>
        </div>

        <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-amber-400/15 bg-amber-400/[0.035] px-4 py-3 text-[11px] leading-relaxed text-amber-100/80">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-300/80" strokeWidth={1.7} />
          <p>
            Сначала добавьте станки в цех. Затем кликните по добавленным карточкам в нужной
            последовательности — между ними появятся анимированные стрелки этапов.
          </p>
        </div>

        <div className="panel mt-8 p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-steel-500">
              <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={1.6} />
              Фильтры каталога
            </div>
            <div className="flex items-center gap-3">
              <span className="mono text-[10px] text-steel-600">
                {filteredMachines.length} из {machines.length}
              </span>
              {activeFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-[10px] text-steel-400 underline decoration-white/20 underline-offset-4 transition-colors hover:text-steel-100"
                >
                  Сбросить
                </button>
              )}
            </div>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <FilterSelect
              label="По виду станка"
              value={filters.type}
              options={TYPE_FILTERS}
              onChange={(value) => updateFilter('type', value)}
            />
            <FilterSelect
              label="По модели"
              value={filters.model}
              options={MODEL_FILTERS}
              onChange={(value) => updateFilter('model', value)}
            />
            <FilterSelect
              label="По году выпуска"
              value={filters.era}
              options={YEAR_FILTERS}
              onChange={(value) => updateFilter('era', value)}
            />
          </div>
        </div>

        <div className="mt-8 flex items-end justify-between gap-4">
          <div>
            <div className="eyebrow">Каталог оборудования</div>
            <h2 className="mt-2 text-xl font-medium tracking-[-0.02em] text-steel-100">
              Типовые станки
            </h2>
          </div>
          <span className="hidden text-[10px] text-steel-600 sm:block">
            Один тип можно добавить несколько раз
          </span>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredMachines.length ? (
            filteredMachines.map((machine) => (
              <MachineCard
                key={machine.id}
                machine={machine}
                addedCount={addedCounts[machine.id] || 0}
                onAdd={() => onAdd(machine)}
              />
            ))
          ) : (
            <div className="panel-soft col-span-full flex flex-col items-center justify-center px-6 py-14 text-center">
              <SearchX className="h-7 w-7 text-steel-600" strokeWidth={1.4} />
              <h3 className="mt-4 text-sm font-medium text-steel-200">
                Под эти фильтры ничего не подошло
              </h3>
              <p className="mt-2 max-w-md text-xs leading-relaxed text-steel-500">
                В демо-каталоге нет станков 2000–2015 годов. Сбросьте фильтр по году или измените
                вид и модель.
              </p>
              <Button variant="secondary" size="sm" className="mt-5" onClick={resetFilters}>
                Сбросить фильтры
              </Button>
            </div>
          )}
        </div>

        <section id="builder" className="mt-12 scroll-mt-24">
          <div className="panel overflow-hidden">
            <div className="flex flex-col gap-5 border-b border-white/[0.06] p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="eyebrow">Сборка цеха</div>
                <h2 className="mt-2 text-xl font-medium tracking-[-0.02em] text-steel-100">
                  Ваш участок и последовательность операций
                </h2>
                <p className="mt-1.5 text-[11px] leading-relaxed text-steel-500">
                  {routeStations.length
                    ? 'Маршрут собран. Можно изменить порядок или добавить ещё станки.'
                    : added.length
                      ? 'Станки добавлены. Теперь выстройте их в маршрут деталей.'
                      : 'Начните с добавления станков из каталога выше.'}
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-2">
                <span className="rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-2 font-mono text-[10px] text-steel-400">
                  {pluralStations(added.length)} в цеху
                </span>
                <span className="rounded-lg border border-amber-400/15 bg-amber-400/[0.045] px-3 py-2 font-mono text-[10px] text-amber-200/80">
                  {routeStations.length} из {added.length || 0} в маршруте
                </span>
              </div>
            </div>

            <div className="p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="mono text-[10px] text-steel-600">01</span>
                  <h3 className="text-sm font-medium text-steel-100">Добавленные станки</h3>
                  <span className="text-[10px] text-steel-600">клик — добавить в маршрут</span>
                </div>
                {added.length > 0 && (
                  <span className="text-[10px] text-steel-600">
                    Один тип может встречаться несколько раз
                  </span>
                )}
              </div>

              {added.length ? (
                <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                  {added.map((station) => (
                    <AddedMachineCard
                      key={station.instanceId}
                      station={station}
                      inRoute={route.includes(station.instanceId)}
                      onAppend={() => onAppend(station.instanceId)}
                      onRemove={() => onRemove(station.instanceId)}
                    />
                  ))}
                </div>
              ) : (
                <div className="mt-4 flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/[0.01] px-5 py-9 text-center">
                  <Plus className="h-5 w-5 text-steel-600" strokeWidth={1.5} />
                  <p className="mt-3 text-xs text-steel-400">
                    Пока пусто. Добавьте станки из каталога выше.
                  </p>
                </div>
              )}

              <div className="my-7 h-px w-full bg-white/[0.06]" />

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="mono text-[10px] text-steel-600">02</span>
                  <h3 className="text-sm font-medium text-steel-100">Маршрут деталей</h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onResetRoute}
                  disabled={!routeStations.length}
                >
                  <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.7} />
                  Сбросить порядок
                </Button>
              </div>

              <div className="mt-4">
                {routeStations.length ? (
                  <div className="thin-scroll flex flex-col gap-0 pb-1 lg:flex-row lg:flex-nowrap lg:overflow-x-auto">
                    {routeStations.map((station, index) => (
                      <Fragment key={station.instanceId}>
                        <RouteStage
                          station={station}
                          index={index}
                          onRemove={() => onRemoveStage(station.instanceId)}
                        />
                        {index < routeStations.length - 1 && <ChainArrow />}
                      </Fragment>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/[0.01] px-5 py-10 text-center">
                    <GitBranch className="h-5 w-5 text-steel-600" strokeWidth={1.5} />
                    <p className="mt-3 max-w-sm text-xs leading-relaxed text-steel-400">
                      Кликните по добавленным станкам в том порядке, в котором по ним движется
                      деталь. Здесь появятся этапы и связи.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4 border-t border-white/[0.06] bg-graphite-900/40 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <p className="text-xs text-steel-300">
                  {generationCount
                    ? `К генерации: ${pluralStations(generationCount)}${routeStations.length ? '' : ' · в порядке добавления'}`
                    : 'Добавьте хотя бы один станок, чтобы продолжить.'}
                </p>
                <p className="mt-1 text-[10px] text-steel-600">
                  Демо-режим · данные генерируются в браузере, без отправки на сервер
                </p>
              </div>
              <Button
                size="lg"
                onClick={onGenerate}
                disabled={!added.length}
                className="shrink-0"
              >
                Сгенерировать цифровой двойник
                <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function FilterSelect({ label, value, options, onChange }) {
  return (
    <label className="block">
      <span className="label mb-2 block">{label}</span>
      <span className="relative block">
        <select
          className="select-field"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-steel-600"
          strokeWidth={1.6}
        />
      </span>
    </label>
  );
}

function MachineCard({ machine, addedCount, onAdd }) {
  return (
    <article className="panel group flex h-full flex-col p-5 transition-colors duration-200 hover:border-white/[0.12]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-steel-300">
            <TypeIcon typeKey={machine.typeKey} className="h-4 w-4" />
          </span>
          <div>
            <div className="text-[10px] uppercase tracking-[0.13em] text-steel-500">
              {machine.typeLabel} · {machine.year}
            </div>
            <div className="mono mt-0.5 text-[9px] text-steel-600">{machine.inventory}</div>
          </div>
        </div>
        <span className="rounded-md border border-white/[0.08] bg-white/[0.02] px-2 py-1 font-mono text-[9px] text-steel-400">
          {machine.cnc ? 'ЧПУ' : 'Ручной'}
        </span>
      </div>

      <h3 className="mt-4 text-[17px] font-medium leading-snug text-steel-100">{machine.model}</h3>
      <p className="mt-1 text-[11px] text-steel-500">
        {machine.subtype} · {machine.manufacturer}
      </p>
      <p className="mt-3 text-xs leading-relaxed text-steel-500">{machine.description}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {machine.specs.map((spec) => (
          <span
            key={spec}
            className="rounded-md border border-white/[0.06] bg-white/[0.015] px-2 py-1 font-mono text-[9px] text-steel-500"
          >
            {spec}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-4">
        <div
          className={cn(
            'flex items-center gap-1.5 text-[10px]',
            machine.requiresSensors ? 'text-amber-300/80' : 'text-steel-500',
          )}
        >
          {machine.requiresSensors ? (
            <Radio className="h-3 w-3" strokeWidth={1.7} />
          ) : (
            <Cpu className="h-3 w-3" strokeWidth={1.7} />
          )}
          {machine.sensorsLabel}
          {addedCount > 0 && (
            <span className="ml-auto rounded-md border border-white/[0.07] bg-white/[0.02] px-1.5 py-0.5 font-mono text-[9px] text-steel-400">
              в цеху: {addedCount}
            </span>
          )}
        </div>

        <Button variant="secondary" size="md" className="mt-3 w-full" onClick={onAdd}>
          <Plus className="h-4 w-4" strokeWidth={1.8} />
          {addedCount ? 'Добавить ещё' : 'Добавить в цех'}
        </Button>
      </div>
    </article>
  );
}

function AddedMachineCard({ station, inRoute, onAppend, onRemove }) {
  return (
    <div
      className={cn(
        'group flex items-stretch overflow-hidden rounded-xl border bg-white/[0.015] transition-colors',
        inRoute
          ? 'border-success-500/25 bg-success-500/[0.035]'
          : 'border-white/[0.07] hover:border-white/[0.14]',
      )}
    >
      <button
        type="button"
        onClick={onAppend}
        disabled={inRoute}
        className="flex min-w-0 flex-1 items-center gap-3 px-3.5 py-3 text-left disabled:cursor-default"
        aria-label={
          inRoute
            ? `${station.model} #${station.number} уже в маршруте`
            : `Добавить ${station.model} #${station.number} в маршрут`
        }
      >
        <span className="mono grid h-6 w-6 shrink-0 place-items-center rounded-md border border-white/[0.08] bg-graphite-900/80 text-[9px] text-steel-400">
          {station.number}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-xs font-medium text-steel-200">
            {station.model}
          </span>
          <span className="mt-0.5 block text-[10px] text-steel-500">
            {station.typeLabel} · {station.year}
          </span>
        </span>
        {inRoute ? (
          <span className="inline-flex shrink-0 items-center gap-1 text-[9px] uppercase tracking-[0.12em] text-success-400">
            <Check className="h-3 w-3" strokeWidth={2.2} />
            в цепочке
          </span>
        ) : (
          <ArrowRight
            className="h-3.5 w-3.5 shrink-0 text-steel-600 transition-colors group-hover:text-amber-300"
            strokeWidth={1.7}
          />
        )}
      </button>
      <button
        type="button"
        onClick={onRemove}
        className="grid w-9 shrink-0 place-items-center border-l border-white/[0.06] text-steel-600 transition-colors hover:bg-danger-500/[0.06] hover:text-danger-300"
        aria-label={`Удалить ${station.model} #${station.number} из цеха`}
        title="Удалить станок"
      >
        <Trash2 className="h-3.5 w-3.5" strokeWidth={1.7} />
      </button>
    </div>
  );
}

function RouteStage({ station, index, onRemove }) {
  return (
    <div className="relative flex w-full shrink-0 flex-col rounded-xl border border-white/[0.08] bg-graphite-900/70 p-3 lg:w-[178px]">
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-amber-300/85">
          Этап {index + 1}
        </span>
        <button
          type="button"
          onClick={onRemove}
          className="grid h-5 w-5 place-items-center rounded text-steel-600 transition-colors hover:bg-danger-500/[0.08] hover:text-danger-300"
          aria-label={`Убрать этап ${index + 1} из маршрута`}
          title="Убрать из маршрута"
        >
          <X className="h-3 w-3" strokeWidth={1.8} />
        </button>
      </div>
      <div className="mt-2 truncate text-sm font-medium text-steel-100">{station.model}</div>
      <div className="mt-0.5 text-[10px] text-steel-500">
        #{station.number} · {station.typeLabel}
      </div>
      <div className="mt-2.5 h-px w-full bg-white/[0.06]" />
      <div className="mt-2 flex items-center gap-1.5 text-[9px] text-steel-600">
        {station.requiresSensors ? (
          <Radio className="h-2.5 w-2.5" strokeWidth={1.8} />
        ) : (
          <Cpu className="h-2.5 w-2.5" strokeWidth={1.8} />
        )}
        {station.sensorsLabel}
      </div>
    </div>
  );
}
