import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Check,
  FileSpreadsheet,
  GitBranch,
  Loader2,
  Plus,
  ShieldCheck,
  UploadCloud,
} from 'lucide-react';
import { Button } from '../components/Button';
import { FlowBar } from '../components/FlowBar';
import { SAMPLE_FILE } from '../data/content';

const ANALYSIS_MESSAGES = [
  'Распознаём модели станков…',
  'Подбираем профили датчиков…',
];

const UPLOAD_FEATURES = [
  {
    title: 'Модели и годы',
    note: 'Сверяем справочник и определяем эпоху оборудования',
  },
  {
    title: 'Профили датчиков',
    note: 'Подбираем ток, температуру, вибрацию и загрузку',
  },
  {
    title: 'Маршрут деталей',
    note: 'Предлагаем последовательность операций участка',
  },
];

export function UploadScreen({ onImported, onManual }) {
  const [dragOver, setDragOver] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const fileInputRef = useRef(null);
  const timersRef = useRef([]);
  const busyRef = useRef(false);
  const importedRef = useRef(onImported);
  importedRef.current = onImported;

  useEffect(
    () => () => {
      timersRef.current.forEach((timer) => window.clearTimeout(timer));
    },
    [],
  );

  function startAnalysis(fileName) {
    if (busyRef.current) return;
    busyRef.current = true;
    setAnalysis({ fileName, step: 0 });

    timersRef.current = [
      window.setTimeout(() => {
        setAnalysis((previous) => (previous ? { ...previous, step: 1 } : previous));
      }, 720),
      window.setTimeout(() => {
        importedRef.current(SAMPLE_FILE.modelIds, fileName);
      }, 1600),
    ];
  }

  function handleFiles(files) {
    const file = files?.[0];
    if (!file) return;
    startAnalysis(file.name);
  }

  function openFileDialog() {
    if (busyRef.current) return;
    fileInputRef.current?.click();
  }

  return (
    <div>
      <FlowBar current={1} note="Данные не покидают браузер" />

      <div className="container-page py-12 lg:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <div className="eyebrow">Шаг 1 · импорт оборудования</div>
            <h1 className="mt-4 text-balance text-[32px] font-semibold leading-tight tracking-[-0.035em] text-steel-100 sm:text-[42px]">
              Перенесите парк станков в цифровой двойник
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-steel-400">
              Загрузите ведомость оборудования — мы распознаем модели и предложим профили
              датчиков. Или соберите цех вручную.
            </p>
          </div>

          <div
            className={`dropzone relative mt-10 min-h-[336px] overflow-hidden p-6 sm:p-8 ${
              dragOver ? 'is-drag' : ''
            }`}
          >
            {analysis ? (
              <AnalysisPanel fileName={analysis.fileName} step={analysis.step} />
            ) : (
              <div
                role="button"
                tabIndex={0}
                aria-label="Загрузить файл ведомости оборудования"
                onClick={openFileDialog}
                onKeyDown={(event) => {
                  if (event.target !== event.currentTarget) return;
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openFileDialog();
                  }
                }}
                onDragOver={(event) => {
                  event.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(event) => {
                  event.preventDefault();
                  setDragOver(false);
                  handleFiles(event.dataTransfer.files);
                }}
                className="flex min-h-[280px] cursor-pointer flex-col items-center justify-center text-center outline-none"
              >
                <div className="relative grid h-16 w-16 place-items-center rounded-2xl border border-white/[0.08] bg-white/[0.02] text-steel-300">
                  <FileSpreadsheet className="h-7 w-7" strokeWidth={1.4} />
                  <span className="absolute -bottom-2 -right-2 grid h-7 w-7 place-items-center rounded-lg border border-amber-400/25 bg-graphite-900 text-amber-300">
                    <UploadCloud className="h-3.5 w-3.5" strokeWidth={1.7} />
                  </span>
                </div>

                <h2 className="mt-6 text-lg font-medium text-steel-100 sm:text-xl">
                  Перетащите сюда файл ведомости оборудования
                </h2>
                <p className="mt-2 max-w-md text-sm text-steel-500">
                  <span className="text-steel-300">.xlsx</span> или{' '}
                  <span className="text-steel-300">.csv</span>, до 5 МБ. Или нажмите, чтобы
                  выбрать файл.
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <span className="h-px w-8 bg-white/10" />
                  <span className="text-[10px] uppercase tracking-[0.18em] text-steel-600">или</span>
                  <span className="h-px w-8 bg-white/10" />
                </div>

                <Button
                  variant="secondary"
                  size="sm"
                  className="mt-4"
                  onClick={(event) => {
                    event.stopPropagation();
                    startAnalysis(SAMPLE_FILE.name);
                  }}
                >
                  <FileSpreadsheet className="h-3.5 w-3.5 text-amber-300" strokeWidth={1.7} />
                  Загрузить пример ведомости.xlsx
                </Button>

                <p className="mt-4 inline-flex items-center gap-1.5 text-[10px] text-steel-600">
                  <ShieldCheck className="h-3 w-3" strokeWidth={1.7} />
                  Демо: файл не читается и не отправляется на сервер
                </p>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx,.csv"
                  className="hidden"
                  onClick={(event) => event.stopPropagation()}
                  onChange={(event) => {
                    handleFiles(event.target.files);
                    event.target.value = '';
                  }}
                />
              </div>
            )}
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {UPLOAD_FEATURES.map((feature, index) => (
              <div
                key={feature.title}
                className="rounded-xl border border-white/[0.05] bg-white/[0.012] px-3.5 py-3"
              >
                <div className="flex items-center gap-2">
                  <span className="mono text-[9px] text-amber-400/70">0{index + 1}</span>
                  <span className="text-[11px] font-medium text-steel-300">{feature.title}</span>
                </div>
                <p className="mt-1 pl-6 text-[10px] leading-relaxed text-steel-600">
                  {feature.note}
                </p>
              </div>
            ))}
          </div>

          <div className="panel-soft mt-6 flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-steel-400">
                <GitBranch className="h-4 w-4" strokeWidth={1.6} />
              </span>
              <div>
                <h3 className="text-sm font-medium text-steel-100">
                  Нет схемы? Ничего страшного — выбери станки сам!
                </h3>
                <p className="mt-1 text-[11px] leading-relaxed text-steel-500">
                  В каталоге есть шесть типовых станков: от Haas ST-20 до 16К20 с навесными
                  датчиками.
                </p>
              </div>
            </div>
            <Button onClick={onManual} className="shrink-0">
              Выбрать
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.8} />
            </Button>
          </div>

          <p className="mt-5 text-center text-[10px] text-steel-600">
            Это демонстрационный импорт: структура и данные подставляются из встроенного набора.
          </p>
        </div>
      </div>
    </div>
  );
}

function AnalysisPanel({ fileName, step }) {
  const progress = step === 0 ? 42 : 86;

  return (
    <div className="relative flex min-h-[280px] flex-col items-center justify-center text-center" role="status" aria-live="polite">
      <div className="scan-line" />
      <div className="grid h-14 w-14 place-items-center rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] text-amber-300">
        <Loader2 className="h-6 w-6 animate-spin" strokeWidth={1.6} />
      </div>

      <div className="mt-5 flex max-w-full items-center gap-2 rounded-lg border border-white/[0.07] bg-graphite-900/70 px-3 py-2">
        <FileSpreadsheet className="h-4 w-4 shrink-0 text-steel-400" strokeWidth={1.6} />
        <span className="truncate text-xs text-steel-200">{fileName}</span>
        <span className="shrink-0 font-mono text-[9px] text-steel-600">4 строки</span>
      </div>

      <div className="mt-6 w-full max-w-md">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.14em] text-steel-500">
          <span>{ANALYSIS_MESSAGES[step]}</span>
          <span className="mono text-steel-600">{step === 0 ? '1 / 2' : '2 / 2'}</span>
        </div>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className="h-full rounded-full bg-amber-400/80 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <ol className="mt-6 grid w-full max-w-md gap-2 text-left">
        {ANALYSIS_MESSAGES.map((message, index) => {
          const done = index < step;
          const active = index === step;
          return (
            <li
              key={message}
              className={`flex items-center gap-2.5 rounded-lg border px-3 py-2 text-[11px] ${
                active
                  ? 'border-amber-400/20 bg-amber-400/[0.05] text-steel-100'
                  : done
                    ? 'border-white/[0.06] bg-white/[0.02] text-steel-300'
                    : 'border-white/[0.04] text-steel-600'
              }`}
            >
              {done ? (
                <Check className="h-3.5 w-3.5 shrink-0 text-success-400" strokeWidth={2.2} />
              ) : active ? (
                <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin text-amber-300" strokeWidth={1.8} />
              ) : (
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-steel-700" />
              )}
              {message}
            </li>
          );
        })}
      </ol>

      <p className="mt-5 inline-flex items-center gap-1.5 text-[10px] text-steel-600">
        <Plus className="h-3 w-3" strokeWidth={1.7} />
        Найдено 4 станка · сейчас откроется демо-двойник
      </p>
    </div>
  );
}
