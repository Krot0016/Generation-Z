import { Fragment } from 'react';
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  FileSpreadsheet,
  Gauge,
  MapPin,
  ShieldCheck,
  Sparkles,
  Timer,
  Wrench,
} from 'lucide-react';
import { Button } from '../components/Button';
import { SectionHeading } from '../components/SectionHeading';
import { TwinMark } from '../components/TwinMark';
import { caseStudies, partners } from '../data/content';

const CASE_ICONS = {
  gauge: Gauge,
  wrench: Wrench,
  activity: Activity,
};

const HERO_STEPS = [
  { title: 'Загрузите ведомость', note: 'Excel или CSV — или пропустите шаг' },
  { title: 'Соберите маршрут', note: 'Выберите станки и порядок операций' },
  { title: 'Получите двойник', note: 'Загрузка, аномалии и износ в одном окне' },
];

export function LandingScreen({ onCreate }) {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <div className="pointer-events-none absolute inset-0 grid-fade opacity-60" />
        <div className="pointer-events-none absolute -right-40 top-0 h-[420px] w-[420px] rounded-full bg-amber-400/[0.03] blur-3xl" />

        <div className="container-page relative grid gap-14 py-16 xl:grid-cols-[1.03fr_0.97fr] xl:items-center xl:py-24">
          <div className="min-w-0 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-steel-400">
                Сервис для цехов металлообработки
              </span>
            </div>

            <h1 className="mt-6 max-w-2xl text-balance text-[27px] font-semibold leading-[1.06] tracking-[-0.045em] text-steel-100 sm:text-[42px] lg:text-[46px]">
              Цифровой двойник вашего металлообрабатывающего цеха{' '}
              <span className="text-amber-300">за 2 минуты</span>.
            </h1>

            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-steel-400">
              Загрузите ведомость оборудования или соберите участок вручную — получите готовую
              интерактивную модель контроля загрузки, аномалий и износа станков.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button size="lg" onClick={onCreate}>
                Создать цифровой двойник
                <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
              </Button>
              <a
                href="#cases"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl px-5 text-sm text-steel-300 transition-colors duration-200 hover:bg-white/[0.04] hover:text-steel-100"
              >
                Смотреть кейсы
                <ChevronRight className="h-4 w-4" strokeWidth={1.8} />
              </a>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-steel-500">
              <span className="inline-flex items-center gap-1.5">
                <FileSpreadsheet className="h-3.5 w-3.5 text-steel-500" strokeWidth={1.7} />
                Excel / CSV
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-steel-500" strokeWidth={1.7} />
                Данные остаются в браузере
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Timer className="h-3.5 w-3.5 text-steel-500" strokeWidth={1.7} />
                Без установки
              </span>
            </div>

            <div id="how" className="mt-10 scroll-mt-24">
              <div className="mb-3 flex items-center gap-3">
                <span className="h-px w-6 bg-amber-400/50" />
                <span className="eyebrow">Как это работает</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {HERO_STEPS.map((step, index) => (
                  <div
                    key={step.title}
                    className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-4"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="mono text-[13px] font-medium text-amber-300">
                        0{index + 1}
                      </span>
                      <ArrowRight
                        className="h-3.5 w-3.5 text-steel-600"
                        strokeWidth={1.7}
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-[15px] font-medium leading-snug text-steel-100">
                      {step.title}
                    </div>
                    <div className="mt-1.5 text-[12.5px] leading-relaxed text-steel-400">
                      {step.note}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <HeroPreview />
        </div>
      </section>

      <section id="cases" className="scroll-mt-24 border-b border-white/[0.06] py-20 lg:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Кейсы / примеры внедрений"
            title="Примеры внедрений"
            description="Три типовых сценария: от модернизации старого парка до серийного производства с контролем износа шпинделей."
            action={
              <span className="hidden items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-steel-600 sm:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-steel-600" />
                Демонстрационные данные
              </span>
            }
          />

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {caseStudies.map((item) => {
              const Icon = CASE_ICONS[item.icon] || Gauge;
              return (
                <article
                  key={item.id}
                  className="panel group flex h-full flex-col p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-400/20 hover:bg-graphite-850/90"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="mono text-[10px] text-steel-600">{item.index}</span>
                      <span className="h-px w-4 bg-white/10" />
                      <span className="text-[10px] uppercase tracking-[0.13em] text-steel-500">
                        {item.tag}
                      </span>
                    </div>
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-steel-400 transition-colors group-hover:text-amber-300">
                      <Icon className="h-4 w-4" strokeWidth={1.6} />
                    </span>
                  </div>

                  <h3 className="mt-5 text-[17px] font-medium leading-snug text-steel-100">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-steel-500">{item.description}</p>

                  <div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/[0.06] pt-4">
                    {item.stats.map((stat) => (
                      <div key={stat.label}>
                        <div className="text-[9px] uppercase tracking-[0.12em] text-steel-600">
                          {stat.label}
                        </div>
                        <div className="mono mt-1 text-sm text-steel-200">{stat.value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex items-end justify-between gap-3 border-t border-white/[0.06] pt-4">
                    <div>
                      <div className="text-[15px] font-medium text-amber-300">{item.effect}</div>
                      <div className="mt-0.5 text-[10px] text-steel-600">{item.effectNote}</div>
                    </div>
                    <ArrowUpRight
                      className="h-4 w-4 shrink-0 text-steel-600 transition-colors group-hover:text-amber-300"
                      strokeWidth={1.7}
                    />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="partners" className="scroll-mt-24 py-20 lg:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Производственные предприятия"
            title="С кем мы уже работаем"
            description="Типовые профили заказчиков: от небольших механических участков до серийных производств с парком более сотни станков."
            action={
              <span className="hidden items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-steel-600 sm:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-steel-600" />
                6 профилей
              </span>
            }
          />

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {partners.map((partner) => (
              <article
                key={partner.name}
                className="panel-soft flex items-start gap-4 p-4 transition-colors duration-200 hover:border-white/[0.12] hover:bg-white/[0.025]"
              >
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-white/[0.08] bg-graphite-900/80 font-mono text-[10px] tracking-[0.08em] text-steel-300">
                  {partner.monogram}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-[13px] font-medium text-steel-100">{partner.name}</h3>
                  <p className="mt-1 flex items-center gap-1.5 text-[10px] text-steel-500">
                    <MapPin className="h-3 w-3" strokeWidth={1.6} />
                    {partner.city} · {partner.industry}
                  </p>
                  <p className="mt-2 font-mono text-[10px] text-steel-600">{partner.fleet}</p>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-5 text-[10px] text-steel-600">
            Названия и профили предприятий вымышлены и используются для демонстрации интерфейса.
          </p>
        </div>
      </section>

      <section className="pb-20 lg:pb-24">
        <div className="container-page">
          <div className="panel relative overflow-hidden px-6 py-9 sm:px-10">
            <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-amber-400/[0.06] blur-3xl" />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="eyebrow">Следующий шаг</div>
                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-steel-100">
                  Готовы увидеть свой цех в цифре?
                </h2>
                <p className="mt-2 max-w-xl text-sm text-steel-500">
                  Загрузите ведомость или соберите участок вручную. Двойник с демо-показателями
                  будет готов через пару минут.
                </p>
              </div>
              <Button size="lg" onClick={onCreate} className="shrink-0">
                Создать цифровой двойник
                <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function HeroPreview() {
  const nodes = [
    { name: 'Haas ST-20', code: 'CNC-01', load: 68, vibration: '2,35', accent: 'bg-sky-400' },
    { name: '16К20', code: '16K20-07', load: 46, vibration: '1,45', accent: 'bg-teal-400' },
    { name: '3Г71', code: '3G71-04', load: 52, vibration: '2,90', accent: 'bg-amber-400' },
  ];

  return (
    <div className="relative mx-auto w-full min-w-0 max-w-2xl xl:mx-0 xl:max-w-none">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="eyebrow">Фрагмент двойника</span>
        <span className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.16em] text-steel-600">
          <span className="h-1 w-1 rounded-full bg-product-accent" />
          TwinBoost UI
        </span>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute -inset-5 rounded-[28px] bg-product-accent/[0.07] blur-2xl" />
        <div className="relative overflow-hidden rounded-2xl border border-product-line bg-product-surface shadow-[0_45px_100px_-40px_rgba(0,0,0,0.9)]">
          <div className="flex items-center justify-between gap-2 border-b border-product-line bg-product-soft px-4 py-3">
            <div className="flex items-center gap-2">
              <TwinMark className="h-7 w-7" />
              <div>
                <div className="text-[12px] font-semibold leading-none text-product-ink">TwinBoost</div>
                <div className="mt-1 text-[8px] uppercase tracking-[0.16em] text-product-mute">
                  мониторинг · линия №2
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-product-green-line bg-product-green-soft px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.1em] text-product-green">
                <span className="live-dot h-1 w-1 rounded-full bg-product-green" />
                live
              </span>
              <span className="hidden font-mono text-[8px] text-product-mute sm:inline">17:42</span>
            </div>
          </div>

          <div className="px-4 pb-4 pt-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-[9px] uppercase tracking-[0.14em] text-product-mute">
                  Участок токарной обработки
                </div>
                <div className="mt-1 text-[13px] font-semibold text-product-ink">
                  3 станка · 12 каналов · смена 2
                </div>
              </div>
              <span className="rounded-md border border-product-line bg-product-bg px-2 py-0.5 font-mono text-[8px] text-product-dim">
                CNC
              </span>
            </div>

            <div className="mt-4 flex items-stretch gap-1.5">
              {nodes.map((node, index) => (
                <Fragment key={node.name}>
                  <div className="min-w-0 flex-1 overflow-hidden rounded-lg border border-product-line bg-product-surface">
                    <div className={`h-0.5 w-full ${node.accent}`} />
                    <div className="p-2">
                      <div className="flex items-center justify-between gap-1">
                        <span className="truncate text-[9px] font-semibold text-product-ink">
                          {node.name}
                        </span>
                        <span className="h-1 w-1 shrink-0 rounded-full bg-product-green" />
                      </div>
                      <div className="mt-0.5 font-mono text-[7px] uppercase tracking-[0.08em] text-product-mute">
                        {node.code}
                      </div>
                      <div className="mt-2 flex items-center justify-between text-[8px] text-product-mute">
                        <span>загрузка</span>
                        <span className="mono text-product-accent">{node.load}%</span>
                      </div>
                      <div className="mt-1 h-1 overflow-hidden rounded-full bg-product-line">
                        <div
                          className="h-full rounded-full bg-product-accent/80"
                          style={{ width: `${node.load}%` }}
                        />
                      </div>
                      <div className="mt-2 flex items-center justify-between text-[7.5px] text-product-mute">
                        <span>вибрация</span>
                        <span className="mono text-product-dim">{node.vibration}</span>
                      </div>
                    </div>
                  </div>
                  {index < nodes.length - 1 && (
                    <ChevronRight
                      className="mt-9 h-3 w-3 shrink-0 text-product-accent/40"
                      strokeWidth={1.7}
                    />
                  )}
                </Fragment>
              ))}
            </div>

            <div className="mt-3 rounded-lg border border-product-line bg-product-soft p-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[8px] uppercase tracking-[0.12em] text-product-mute">
                  Вибрация и температура · 24 ч
                </span>
                <div className="flex items-center gap-2 text-[7.5px] text-product-mute">
                  <span className="inline-flex items-center gap-1">
                    <span className="h-0.5 w-2.5 rounded-full bg-product-accent" />
                    вибр.
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="h-0.5 w-2.5 rounded-full bg-product-amber" />
                    темп.
                  </span>
                </div>
              </div>
              <svg viewBox="0 0 360 52" className="mt-2 h-12 w-full" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="twin-hero-area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7ef0a2" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#7ef0a2" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <line x1="0" y1="14" x2="360" y2="14" stroke="rgba(232,238,246,0.10)" strokeWidth="1" strokeDasharray="2 3" />
                <line x1="0" y1="28" x2="360" y2="28" stroke="rgba(232,238,246,0.10)" strokeWidth="1" strokeDasharray="2 3" />
                <line x1="0" y1="42" x2="360" y2="42" stroke="rgba(232,238,246,0.10)" strokeWidth="1" strokeDasharray="2 3" />
                <path
                  d="M0 36 C20 32 38 38 58 33 S92 37 112 29 S150 33 172 27 S204 34 228 23 S262 29 286 21 S320 27 342 23 S354 25 360 24 L360 52 L0 52 Z"
                  fill="url(#twin-hero-area)"
                />
                <path
                  d="M0 36 C20 32 38 38 58 33 S92 37 112 29 S150 33 172 27 S204 34 228 23 S262 29 286 21 S320 27 342 23 S354 25 360 24"
                  fill="none"
                  stroke="#7ef0a2"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <path
                  d="M0 44 C24 42 40 46 60 42 S96 44 118 40 S150 43 174 39 S206 44 230 38 S264 41 288 36 S322 39 344 37 S354 38 360 37"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="1.2"
                  strokeDasharray="3 3"
                  opacity="0.7"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="mt-2 grid grid-cols-3 gap-1.5">
              {[
                { label: 'Ток фазы А', value: '12,4', unit: 'А' },
                { label: 'Температура', value: '52,6', unit: '°C' },
                { label: 'Загрузка', value: '68', unit: '%' },
              ].map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-lg border border-product-line bg-product-surface px-2.5 py-2"
                >
                  <div className="text-[7px] uppercase tracking-[0.1em] text-product-mute">
                    {metric.label}
                  </div>
                  <div className="mono mt-0.5 text-[12px] text-product-ink">
                    {metric.value}{' '}
                    <span className="text-[8px] font-normal text-product-mute">{metric.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-product-line bg-product-soft px-4 py-2 text-[8px] text-product-mute">
            <span>4 датчика · опрос 2,4 с</span>
            <span className="inline-flex items-center gap-1 text-product-green">
              <span className="h-1 w-1 rounded-full bg-product-green" />
              данные в норме
            </span>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-4 right-2 hidden items-center gap-2 rounded-lg border border-product-line bg-product-surface px-3 py-2 shadow-[0_20px_40px_-24px_rgba(0,0,0,0.7)] sm:flex">
        <Sparkles className="h-3.5 w-3.5 text-product-accent" strokeWidth={1.6} />
        <span className="text-[10px] text-product-dim">Собрано из ведомости</span>
        <span className="grid h-4 w-4 place-items-center rounded-full bg-product-green-soft text-product-green">
          <Check className="h-2.5 w-2.5" strokeWidth={2.2} />
        </span>
      </div>
    </div>
  );
}
