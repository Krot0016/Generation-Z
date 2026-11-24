import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Check } from 'lucide-react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { BuilderScreen } from './screens/BuilderScreen';
import { GeneratingScreen } from './screens/GeneratingScreen';
import { LandingScreen } from './screens/LandingScreen';
import { ResultScreen } from './screens/ResultScreen';
import { UploadScreen } from './screens/UploadScreen';
import { machines } from './data/content';
import { createInstance, pluralStations } from './lib/utils';

export default function App() {
  const [screen, setScreen] = useState('landing');
  const [added, setAdded] = useState([]);
  const [route, setRoute] = useState([]);
  const [resultStations, setResultStations] = useState([]);
  const [toast, setToast] = useState(null);
  const toastTimerRef = useRef(null);

  const showToast = useCallback((message, tone = 'default') => {
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    setToast({ id: Date.now(), message, tone });
    toastTimerRef.current = window.setTimeout(() => setToast(null), 2500);
  }, []);

  useEffect(
    () => () => {
      if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    },
    [],
  );

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [screen]);

  const goHome = useCallback(() => {
    setScreen('landing');
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  const startNew = useCallback(() => {
    setAdded([]);
    setRoute([]);
    setResultStations([]);
    setScreen('upload');
  }, []);

  const addMachine = useCallback(
    (machine) => {
      const number = added.filter((station) => station.id === machine.id).length + 1;
      const instance = createInstance(machine, number);
      setAdded((previous) => [...previous, instance]);
      showToast(`${machine.model} #${number} добавлен в цех`, 'success');
    },
    [added, showToast],
  );

  const removeMachine = useCallback((instanceId) => {
    setAdded((previous) => previous.filter((station) => station.instanceId !== instanceId));
    setRoute((previous) => previous.filter((id) => id !== instanceId));
  }, []);

  const appendToRoute = useCallback((instanceId) => {
    setRoute((previous) =>
      previous.includes(instanceId) ? previous : [...previous, instanceId],
    );
  }, []);

  const resetRoute = useCallback(() => {
    setRoute([]);
    showToast('Порядок маршрута сброшен');
  }, [showToast]);

  const removeStage = useCallback((instanceId) => {
    setRoute((previous) => previous.filter((id) => id !== instanceId));
  }, []);

  const handleImported = useCallback(
    (modelIds) => {
      const counts = {};
      const instances = [];

      modelIds.forEach((modelId) => {
        const machine = machines.find((item) => item.id === modelId);
        if (!machine) return;
        counts[modelId] = (counts[modelId] || 0) + 1;
        instances.push(createInstance(machine, counts[modelId]));
      });

      setAdded(instances);
      setRoute(instances.map((instance) => instance.instanceId));
      setResultStations(instances);
      setScreen('result');
      showToast(`Импорт завершён: ${pluralStations(instances.length)}`, 'success');
    },
    [showToast],
  );

  const handleGenerate = useCallback(() => {
    if (!added.length) return;
    const ordered = route.length
      ? route.map((id) => added.find((station) => station.instanceId === id)).filter(Boolean)
      : added;

    if (!ordered.length) return;
    if (!route.length) {
      setRoute(added.map((station) => station.instanceId));
    }
    setResultStations(ordered);
    setScreen('generating');
  }, [added, route]);

  return (
    <>
      <div className="blueprint-grid" aria-hidden="true" />

      <div className="relative z-10 flex min-h-screen flex-col">
        <Header
          landing={screen === 'landing'}
          onHome={goHome}
          onCreate={startNew}
        />

        <main className="flex-1">
          <div key={screen} className="animate-rise">
            {screen === 'landing' && <LandingScreen onCreate={startNew} />}

            {screen === 'upload' && (
              <UploadScreen onImported={handleImported} onManual={() => setScreen('builder')} />
            )}

            {screen === 'builder' && (
              <BuilderScreen
                added={added}
                route={route}
                onAdd={addMachine}
                onRemove={removeMachine}
                onAppend={appendToRoute}
                onResetRoute={resetRoute}
                onRemoveStage={removeStage}
                onGenerate={handleGenerate}
                onBack={() => setScreen('upload')}
              />
            )}

            {screen === 'generating' && (
              <GeneratingScreen
                stations={resultStations}
                onDone={() => setScreen('result')}
              />
            )}

            {screen === 'result' && (
              <ResultScreen
                stations={resultStations}
                onBackToBuilder={() => setScreen('builder')}
              />
            )}
          </div>
        </main>

        <Footer
          landing={screen === 'landing'}
          onHome={goHome}
          onOpenDemo={startNew}
        />
      </div>

      <Toast toast={toast} />
    </>
  );
}

function Toast({ toast }) {
  if (!toast) return null;

  const tone =
    toast.tone === 'success'
      ? 'border-success-500/25 bg-success-500/10 text-success-400'
      : 'border-white/10 bg-white/[0.04] text-steel-300';

  return createPortal(
    <div
      className="fixed inset-x-4 bottom-4 z-[90] sm:inset-x-auto sm:bottom-6 sm:right-6"
      role="status"
      aria-live="polite"
    >
      <div
        key={toast.id}
        className="animate-rise flex items-center gap-2.5 rounded-xl border border-white/10 bg-graphite-850/95 px-3.5 py-2.5 shadow-lift backdrop-blur-md"
      >
        <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border ${tone}`}>
          <Check className="h-3.5 w-3.5" strokeWidth={2.2} />
        </span>
        <span className="text-xs text-steel-200">{toast.message}</span>
      </div>
    </div>,
    document.body,
  );
}
